export type GamecockStatus = 'AVAILABLE' | 'RESERVED' | 'SOLD' | 'BREEDER';
export type ProductType = 'LIVE_GAMECOCK' | 'FERTILIZED_EGG' | 'EQUIPMENT';
export type SupplyCategory = 'MEDICINE' | 'TRAINING' | 'FARM_TOOLS';
export type OrderStatus = 'PENDING_SLIP' | 'PENDING_SHIPMENT' | 'SHIPPED' | 'COMPLETED' | 'CANCELLED';
export type TransportType = 'PET_VAN' | 'EXPRESS_PARCEL';

export interface PedigreeNode {
  id: string;
  name: string;
  code: string;
  role: 'FATHER' | 'MOTHER' | 'PATERNAL_GRANDSIRE' | 'PATERNAL_GRANDDAM' | 'MATERNAL_GRANDSIRE' | 'MATERNAL_GRANDDAM';
  breed: string;
  wins?: number;
  earnings?: string;
  videoUrl?: string;
  imageUrl: string;
  note?: string;
}

export interface Gamecock {
  id: string;
  code: string;
  name: string;
  breed: string;
  sex: 'MALE' | 'FEMALE';
  ageMonths: number;
  weightKg: number;
  fightingStyle: string;
  winRecords: {
    wins: number;
    draws: number;
    losses: number;
    details: string[];
  };
  price: number;
  status: GamecockStatus;
  tags: string[]; // e.g. "ดาวรุ่ง", "แชมป์เปี้ยน", "ไก่หนุ่มคัดผ่าน", "พ่อพันธุ์หลัก"
  imageUrl: string;
  galleryImages: string[];
  videoUrl?: string; // YouTube or TikTok embed ID/URL
  pedigree: {
    father: PedigreeNode;
    mother: PedigreeNode;
    paternalGrandSire: PedigreeNode;
    paternalGrandDam: PedigreeNode;
    maternalGrandSire: PedigreeNode;
    maternalGrandDam: PedigreeNode;
  };
  depositPercentage?: number; // default 30%
}

export interface EggPriceTier {
  quantity: number;
  price: number;
  label: string;
}

export interface FertilizedEgg {
  id: string;
  code: string;
  name: string;
  sireName: string; // ชื่อพ่อพันธุ์
  damName: string;  // ชื่อแม่พันธุ์
  breedCombo: string;
  weeklyQuota: number;
  remainingQuota: number;
  priceTiers: EggPriceTier[];
  warrantyTerms: string;
  imageUrl: string;
  sireVideoUrl?: string;
  sireImageUrl: string;
  damImageUrl: string;
}

export interface SupplyEquipment {
  id: string;
  sku: string;
  name: string;
  category: SupplyCategory;
  categoryName: string;
  price: number;
  stock: number;
  minStockAlert: number;
  unit: string;
  imageUrl: string;
  description: string;
}

export interface CartItem {
  id: string; // unique item id in cart
  productId: string;
  name: string;
  code?: string;
  type: ProductType;
  price: number;
  quantity: number;
  imageUrl: string;
  tierInfo?: EggPriceTier; // for eggs
  isDeposit?: boolean; // if customer chooses 30% deposit for live cock
  depositAmount?: number;
}

export interface LogisticsInfo {
  driverName?: string;
  driverPhone?: string;
  vehiclePlate?: string;
  meetingPoint?: string;
  trackingNumber?: string;
  courierName?: string;
}

export interface SplitPackage {
  packageType: 'LIVE_ANIMAL' | 'PARCEL';
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  transportType: TransportType;
  logistics: LogisticsInfo;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  customerName: string;
  phone: string;
  address: string;
  totalAmount: number;
  depositPaid?: number;
  status: OrderStatus;
  slipUrl?: string;
  slipUploadedAt?: string;
  reservationExpiresAt?: string; // Auto timeout date
  splitPackages: SplitPackage[];
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'ORDER' | 'STOCK' | 'LOGISTICS' | 'PAYMENT';
  read: boolean;
}

