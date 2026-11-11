'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Gamecock,
  FertilizedEgg,
  SupplyEquipment,
  CartItem,
  Order,
  AppNotification,
  OrderStatus,
  LogisticsInfo,
  EggPriceTier,
  GamecockStatus
} from '../types';
import {
  INITIAL_GAMECOCKS,
  INITIAL_EGGS,
  INITIAL_EQUIPMENT,
  INITIAL_ORDERS,
  INITIAL_NOTIFICATIONS
} from '../data/mockData';

interface FarmContextType {
  role: 'CUSTOMER' | 'ADMIN';
  setRole: (role: 'CUSTOMER' | 'ADMIN') => void;
  gamecocks: Gamecock[];
  eggs: FertilizedEgg[];
  equipment: SupplyEquipment[];
  orders: Order[];
  notifications: AppNotification[];
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  createOrder: (orderData: {
    customerName: string;
    phone: string;
    address: string;
    slipUrl?: string;
    isDepositOnly?: boolean;
  }) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  updateOrderLogistics: (orderId: string, packageIndex: number, logistics: LogisticsInfo) => void;
  updateEquipmentStock: (equipmentId: string, newStock: number) => void;
  addNewGamecock: (cock: Gamecock) => void;
  addNewSupply: (supply: SupplyEquipment) => void;
  updateEggQuota: (eggId: string, addedQuota: number) => void;
  updateGamecockStatus: (cockId: string, status: GamecockStatus) => void;
  markNotificationAsRead: (notificationId: string) => void;
  unreadCount: number;
  resetAllData: () => void;
  selectedCockForModal: Gamecock | null;
  setSelectedCockForModal: (cock: Gamecock | null) => void;
}

const FarmContext = createContext<FarmContextType | undefined>(undefined);

export const FarmProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<'CUSTOMER' | 'ADMIN'>('CUSTOMER');
  const [gamecocks, setGamecocks] = useState<Gamecock[]>(INITIAL_GAMECOCKS);
  const [eggs, setEggs] = useState<FertilizedEgg[]>(INITIAL_EGGS);
  const [equipment, setEquipment] = useState<SupplyEquipment[]>(INITIAL_EQUIPMENT);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCockForModal, setSelectedCockForModal] = useState<Gamecock | null>(null);

  // Load from localStorage if present with version check to invalidate old hen/farm images
  useEffect(() => {
    try {
      const currentVersion = 'v3_real_gamecocks';
      const savedVersion = localStorage.getItem('cyber_farm_version');

      if (savedVersion !== currentVersion) {
        // Clear previous cache so new authentic gamecock & equipment images load
        localStorage.removeItem('cyber_farm_gamecocks');
        localStorage.removeItem('cyber_farm_equipment');
        localStorage.removeItem('cyber_farm_orders');
        localStorage.setItem('cyber_farm_version', currentVersion);
        setGamecocks(INITIAL_GAMECOCKS);
        setEquipment(INITIAL_EQUIPMENT);
        setOrders(INITIAL_ORDERS);
        return;
      }

      const savedOrders = localStorage.getItem('cyber_farm_orders');
      if (savedOrders) setOrders(JSON.parse(savedOrders));

      const savedGamecocks = localStorage.getItem('cyber_farm_gamecocks');
      if (savedGamecocks) setGamecocks(JSON.parse(savedGamecocks));

      const savedEquipment = localStorage.getItem('cyber_farm_equipment');
      if (savedEquipment) setEquipment(JSON.parse(savedEquipment));

      const savedCart = localStorage.getItem('cyber_farm_cart');
      if (savedCart) setCart(JSON.parse(savedCart));
    } catch {
      // ignore
    }
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('cyber_farm_orders', JSON.stringify(orders));
      localStorage.setItem('cyber_farm_gamecocks', JSON.stringify(gamecocks));
      localStorage.setItem('cyber_farm_equipment', JSON.stringify(equipment));
      localStorage.setItem('cyber_farm_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [orders, gamecocks, equipment, cart]);

  const addToCart = (item: Omit<CartItem, 'id'>) => {
    // If live cock, can only add 1 and must check if already in cart
    if (item.type === 'LIVE_GAMECOCK') {
      const exists = cart.find(c => c.productId === item.productId);
      if (exists) return;
    }

    const newItem: CartItem = {
      ...item,
      id: `${item.productId}_${Date.now()}`
    };

    setCart(prev => [...prev, newItem]);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(c => c.id !== cartItemId));
  };

  const updateCartQuantity = (cartItemId: string, delta: number) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.id === cartItemId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const createOrder = (orderData: {
    customerName: string;
    phone: string;
    address: string;
    slipUrl?: string;
    isDepositOnly?: boolean;
  }) => {
    // Split cart into Live Animal package and Parcel package
    const liveItems = cart.filter(c => c.type === 'LIVE_GAMECOCK');
    const parcelItems = cart.filter(c => c.type === 'FERTILIZED_EGG' || c.type === 'EQUIPMENT');

    const splitPackages = [];
    let grandTotal = 0;
    let depositSum = 0;

    if (liveItems.length > 0) {
      const liveSubtotal = liveItems.reduce((acc, curr) => {
        const itemPrice = curr.isDeposit && curr.depositAmount ? curr.depositAmount : curr.price;
        return acc + itemPrice * curr.quantity;
      }, 0);
      const liveShipping = 600; // Flat 600 THB for pet van
      grandTotal += liveSubtotal + liveShipping;

      if (orderData.isDepositOnly || liveItems.some(i => i.isDeposit)) {
        depositSum += liveSubtotal;
      }

      splitPackages.push({
        packageType: 'LIVE_ANIMAL' as const,
        transportType: 'PET_VAN' as const,
        items: liveItems,
        subtotal: liveSubtotal,
        shippingFee: liveShipping,
        logistics: {
          meetingPoint: 'รอแอดมินประสานงานจุดนัดรับรถตู้',
          driverName: 'รอจัดสรรคนขับรถตู้สัตว์เลี้ยง',
          driverPhone: '-',
          vehiclePlate: '-'
        }
      });

      // Update gamecocks status to RESERVED
      setGamecocks(prev =>
        prev.map(cock => {
          if (liveItems.some(item => item.productId === cock.id)) {
            return { ...cock, status: 'RESERVED' };
          }
          return cock;
        })
      );
    }

    if (parcelItems.length > 0) {
      const parcelSubtotal = parcelItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
      const parcelShipping = 80; // Standard insured shipping
      grandTotal += parcelSubtotal + parcelShipping;

      splitPackages.push({
        packageType: 'PARCEL' as const,
        transportType: 'EXPRESS_PARCEL' as const,
        items: parcelItems,
        subtotal: parcelSubtotal,
        shippingFee: parcelShipping,
        logistics: {
          courierName: 'Flash Express / EMS (กล่องกันกระแทก)',
          trackingNumber: 'รอแอดมินแจ้งเลขพัสดุ'
        }
      });

      // Decrement equipment inventory & egg quotas
      parcelItems.forEach(item => {
        if (item.type === 'EQUIPMENT') {
          setEquipment(prev =>
            prev.map(eq => (eq.id === item.productId ? { ...eq, stock: Math.max(0, eq.stock - item.quantity) } : eq))
          );
        } else if (item.type === 'FERTILIZED_EGG') {
          setEggs(prev =>
            prev.map(egg =>
              egg.id === item.productId
                ? { ...egg, remainingQuota: Math.max(0, egg.remainingQuota - (item.tierInfo?.quantity || 1)) }
                : egg
            )
          );
        }
      });
    }

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: `CF-ORD-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}-${Math.floor(
        1000 + Math.random() * 9000
      )}`,
      createdAt: new Date().toLocaleString('th-TH', { dateStyle: 'short', timeStyle: 'short' }),
      customerName: orderData.customerName,
      phone: orderData.phone,
      address: orderData.address,
      totalAmount: grandTotal,
      depositPaid: depositSum > 0 ? depositSum : undefined,
      status: orderData.slipUrl ? 'PENDING_SHIPMENT' : 'PENDING_SLIP',
      slipUrl: orderData.slipUrl,
      slipUploadedAt: orderData.slipUrl ? new Date().toLocaleTimeString('th-TH') : undefined,
      reservationExpiresAt: new Date(Date.now() + 48 * 3600 * 1000).toLocaleString('th-TH'),
      splitPackages
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();

    // Trigger Notification for Admin
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'มีคำสั่งซื้อใหม่!',
      message: `ออเดอร์ #${newOrder.orderNumber} จากคุณ ${orderData.customerName} ยอดรวม ฿${grandTotal.toLocaleString()}`,
      time: 'เมื่อสักครู่',
      type: 'ORDER',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev =>
      prev.map(o => {
        if (o.id === orderId) {
          return { ...o, status };
        }
        return o;
      })
    );

    // If marked COMPLETED and has live animal, change status to SOLD
    if (status === 'COMPLETED') {
      const order = orders.find(o => o.id === orderId);
      if (order) {
        order.splitPackages.forEach(pkg => {
          pkg.items.forEach(item => {
            if (item.type === 'LIVE_GAMECOCK') {
              setGamecocks(gcList =>
                gcList.map(gc => (gc.id === item.productId ? { ...gc, status: 'SOLD' } : gc))
              );
            }
          });
        });
      }
    }
  };

  const updateOrderLogistics = (orderId: string, packageIndex: number, logistics: LogisticsInfo) => {
    setOrders(prev =>
      prev.map(o => {
        if (o.id === orderId) {
          const updatedPackages = [...o.splitPackages];
          if (updatedPackages[packageIndex]) {
            updatedPackages[packageIndex] = {
              ...updatedPackages[packageIndex],
              logistics: {
                ...updatedPackages[packageIndex].logistics,
                ...logistics
              }
            };
          }
          return { ...o, splitPackages: updatedPackages };
        }
        return o;
      })
    );
  };

  const updateEquipmentStock = (equipmentId: string, newStock: number) => {
    setEquipment(prev =>
      prev.map(eq => (eq.id === equipmentId ? { ...eq, stock: newStock } : eq))
    );
  };

  const addNewGamecock = (newCock: Gamecock) => {
    setGamecocks(prev => [newCock, ...prev]);
    // Notification
    const notif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'เพิ่มไก่ชนเข้าฟาร์มสำเร็จ',
      message: `เพิ่ม "${newCock.name}" (${newCock.code}) เข้าสู่สต๊อกพร้อมขายแล้ว`,
      time: 'เมื่อสักครู่',
      type: 'STOCK',
      read: false
    };
    setNotifications(prev => [notif, ...prev]);
  };

  const addNewSupply = (newSupply: SupplyEquipment) => {
    setEquipment(prev => [newSupply, ...prev]);
    const notif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'เพิ่มสินค้า/เวชภัณฑ์ใหม่',
      message: `เพิ่ม "${newSupply.name}" (สต๊อก ${newSupply.stock} ${newSupply.unit}) เข้าสู่แคตตาล็อกแล้ว`,
      time: 'เมื่อสักครู่',
      type: 'STOCK',
      read: false
    };
    setNotifications(prev => [notif, ...prev]);
  };

  const updateEggQuota = (eggId: string, addedQuota: number) => {
    setEggs(prev =>
      prev.map(egg =>
        egg.id === eggId
          ? {
              ...egg,
              weeklyQuota: egg.weeklyQuota + addedQuota,
              remainingQuota: egg.remainingQuota + addedQuota
            }
          : egg
      )
    );
  };

  const updateGamecockStatus = (cockId: string, status: GamecockStatus) => {
    setGamecocks(prev =>
      prev.map(g => (g.id === cockId ? { ...g, status } : g))
    );
  };

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === notificationId ? { ...n, read: true } : n))
    );
  };

  const resetAllData = () => {
    setGamecocks(INITIAL_GAMECOCKS);
    setEggs(INITIAL_EGGS);
    setEquipment(INITIAL_EQUIPMENT);
    setOrders(INITIAL_ORDERS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setCart([]);
    localStorage.clear();
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <FarmContext.Provider
      value={{
        role,
        setRole,
        gamecocks,
        eggs,
        equipment,
        orders,
        notifications,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        createOrder,
        updateOrderStatus,
        updateOrderLogistics,
        updateEquipmentStock,
        addNewGamecock,
        addNewSupply,
        updateEggQuota,
        updateGamecockStatus,
        markNotificationAsRead,
        unreadCount,
        resetAllData,
        selectedCockForModal,
        setSelectedCockForModal
      }}
    >
      {children}
    </FarmContext.Provider>
  );
};

export const useFarm = () => {
  const context = useContext(FarmContext);
  if (!context) {
    throw new Error('useFarm must be used within a FarmProvider');
  }
  return context;
};

