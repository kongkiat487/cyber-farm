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
  GamecockStatus,
  UserRole,
  MemberProfile,
  AuctionItem,
  AuctionBid
} from '../types';
import {
  INITIAL_GAMECOCKS,
  INITIAL_EGGS,
  INITIAL_EQUIPMENT,
  INITIAL_ORDERS,
  INITIAL_NOTIFICATIONS,
  INITIAL_AUCTIONS
} from '../data/mockData';

interface FarmContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  currentMember: MemberProfile | null;
  loginAsMember: (creds: { phone: string; email?: string }) => void;
  registerMember: (profile: Partial<MemberProfile>) => void;
  logoutMember: () => void;
  gamecocks: Gamecock[];
  eggs: FertilizedEgg[];
  equipment: SupplyEquipment[];
  orders: Order[];
  notifications: AppNotification[];
  auctions: AuctionItem[];
  placeBid: (auctionId: string, amount: number) => { success: boolean; message: string };
  buyoutAuction: (auctionId: string) => { success: boolean; message: string };
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
  const [role, setRole] = useState<UserRole>('GUEST');
  const [currentMember, setCurrentMember] = useState<MemberProfile | null>(null);
  const [gamecocks, setGamecocks] = useState<Gamecock[]>(INITIAL_GAMECOCKS);
  const [eggs, setEggs] = useState<FertilizedEgg[]>(INITIAL_EGGS);
  const [equipment, setEquipment] = useState<SupplyEquipment[]>(INITIAL_EQUIPMENT);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [auctions, setAuctions] = useState<AuctionItem[]>(INITIAL_AUCTIONS);
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

      const savedMember = localStorage.getItem('cyber_farm_member');
      if (savedMember) {
        setCurrentMember(JSON.parse(savedMember));
      }
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
      if (currentMember) {
        localStorage.setItem('cyber_farm_member', JSON.stringify(currentMember));
      } else {
        localStorage.removeItem('cyber_farm_member');
      }
    } catch {
      // ignore
    }
  }, [orders, gamecocks, equipment, cart, currentMember]);

  const loginAsMember = (creds: { phone: string; email?: string }) => {
    const existing: MemberProfile = currentMember || {
      id: 'MB-' + Math.floor(1000 + Math.random() * 9000),
      name: 'เสี่ยเบิร์ด ซุ้มเพชรนำโชค',
      phone: creds.phone || '089-123-4567',
      email: creds.email || 'member@cyberfarm.com',
      farmName: 'ซุ้มเพชรนำโชค (อยุธยา)',
      memberTier: 'VIP',
      discountPercent: 5,
      points: 250,
      joinedDate: '2025-01-15'
    };
    setCurrentMember(existing);
    setRole('MEMBER');
  };

  const registerMember = (profile: Partial<MemberProfile>) => {
    const newMember: MemberProfile = {
      id: 'MB-' + Math.floor(1000 + Math.random() * 9000),
      name: profile.name || 'สมาชิกใหม่',
      phone: profile.phone || '081-000-0000',
      email: profile.email || '',
      farmName: profile.farmName || 'ซุ้มไก่ชนชนบท',
      memberTier: 'SILVER',
      discountPercent: 5,
      points: 100,
      joinedDate: new Date().toISOString().split('T')[0]
    };
    setCurrentMember(newMember);
    setRole('MEMBER');
  };

  const logoutMember = () => {
    setCurrentMember(null);
    setRole('GUEST');
    try {
      localStorage.removeItem('cyber_farm_member');
    } catch {
      // ignore
    }
  };

  const placeBid = (auctionId: string, amount: number): { success: boolean; message: string } => {
    if (role !== 'MEMBER' || !currentMember) {
      return {
        success: false,
        message: 'สงวนสิทธิ์เฉพาะสมาชิก (Member) เท่านั้นที่สามารถเข้าร่วมการประมูลได้ กรุณาเข้าสู่ระบบหรือสมัครสมาชิกก่อน'
      };
    }

    const auction = auctions.find(a => a.id === auctionId);
    if (!auction) {
      return { success: false, message: 'ไม่พบรายการประมูลนี้' };
    }

    if (auction.status !== 'ACTIVE') {
      return { success: false, message: 'การประมูลนี้สิ้นสุดลงแล้ว' };
    }

    const minRequired = auction.currentBid + auction.minBidIncrement;
    if (amount < minRequired) {
      return {
        success: false,
        message: `ยอดประมูลต้องไม่ต่ำกว่า ฿${minRequired.toLocaleString()} (เพิ่มขึ้นขั้นต่ำครั้งละ ฿${auction.minBidIncrement.toLocaleString()})`
      };
    }

    const newBid: AuctionBid = {
      id: 'bid-' + Date.now(),
      bidderName: currentMember.name,
      bidderPhone: currentMember.phone,
      bidderFarm: currentMember.farmName,
      bidderTier: currentMember.memberTier,
      amount,
      time: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }) + ' น.'
    };

    setAuctions(prev =>
      prev.map(item => {
        if (item.id === auctionId) {
          return {
            ...item,
            currentBid: amount,
            highestBidder: {
              name: currentMember.name,
              phone: currentMember.phone,
              farm: currentMember.farmName
            },
            bids: [newBid, ...item.bids]
          };
        }
        return item;
      })
    );

    // Add in-app notification
    const newNotif: AppNotification = {
      id: 'notif-auc-' + Date.now(),
      title: 'เคาะประมูลสำเร็จ!',
      message: `คุณเสนอราคา ฿${amount.toLocaleString()} ในรายการ "${auction.title}" เป็นผู้เสนอราคาสูงสุดในขณะนี้`,
      time: 'เมื่อสักครู่',
      type: 'AUCTION',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);

    return {
      success: true,
      message: `เคาะประมูลสำเร็จที่ ฿${amount.toLocaleString()}!`
    };
  };

  const buyoutAuction = (auctionId: string): { success: boolean; message: string } => {
    if (role !== 'MEMBER' || !currentMember) {
      return {
        success: false,
        message: 'สงวนสิทธิ์เฉพาะสมาชิก (Member) เท่านั้นที่สามารถเคาะจบซื้อทันทีได้'
      };
    }

    const auction = auctions.find(a => a.id === auctionId);
    if (!auction || !auction.buyoutPrice) {
      return { success: false, message: 'ไม่พบรายการหรือไม่มีราคาเคาะจบ' };
    }

    setAuctions(prev =>
      prev.map(item => {
        if (item.id === auctionId) {
          return {
            ...item,
            currentBid: item.buyoutPrice!,
            status: 'ENDED',
            highestBidder: {
              name: currentMember.name,
              phone: currentMember.phone,
              farm: currentMember.farmName
            }
          };
        }
        return item;
      })
    );

    // Auto add to cart as Live Cock order
    addToCart({
      productId: auction.id,
      name: `[ประมูลชนะ] ${auction.title}`,
      code: auction.code,
      type: 'LIVE_GAMECOCK',
      price: auction.buyoutPrice,
      quantity: 1,
      imageUrl: auction.imageUrl,
      isDeposit: true,
      depositAmount: Math.round(auction.buyoutPrice * 0.3)
    });

    return {
      success: true,
      message: `ยินดีด้วย! คุณเคาะซื้อทันทีสำเร็จที่ ฿${auction.buyoutPrice.toLocaleString()} ระบบเพิ่มลงในตะกร้าสินค้าเรียบร้อยแล้ว`
    };
  };

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
    setAuctions(INITIAL_AUCTIONS);
    setCart([]);
    setCurrentMember(null);
    setRole('GUEST');
    localStorage.clear();
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <FarmContext.Provider
      value={{
        role,
        setRole,
        currentMember,
        loginAsMember,
        registerMember,
        logoutMember,
        gamecocks,
        eggs,
        equipment,
        orders,
        notifications,
        auctions,
        placeBid,
        buyoutAuction,
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

