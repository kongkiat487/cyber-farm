import { Gamecock, FertilizedEgg, SupplyEquipment, Order, AppNotification } from '../types';

export const INITIAL_GAMECOCKS: Gamecock[] = [
  {
    id: 'gc-01',
    code: 'CF-881',
    name: 'เจ้าพายุสายฟ้า',
    breed: 'พม่ารำวงลูกผสม',
    sex: 'MALE',
    ageMonths: 10,
    weightKg: 2.7,
    fightingStyle: 'ม้าล่อสปีด แข้งหน้าถี่จัด ชิ่งซ้ายขวาแล้วแทงเดือยลึก',
    winRecords: {
      wins: 3,
      draws: 0,
      losses: 0,
      details: ['ชนะสนามทองสุข ไฟต์ติดมัดจำ 22,000 บ.', 'ชนะชมรมกีฬาไก่ชนอันดามัน 110,000 บ.', 'ชนะสนามมาตรฐานภาคกลาง 330,000 บ. (ยก 2)'],
    },
    price: 35000,
    status: 'AVAILABLE',
    tags: ['ดาวรุ่ง', 'แชมป์เปี้ยน', 'ไก่หนุ่มคัดผ่าน'],
    imageUrl: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596733430284-f7437764b1a9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1612170153139-6f881ff067e0?auto=format&fit=crop&w=800&q=80'
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Demo sparring clip
    depositPercentage: 30,
    pedigree: {
      father: {
        id: 'ped-f1',
        name: 'เจ้านินจาดำ (ยอดม้าล่อเงินล้าน)',
        code: 'SIRE-009',
        role: 'FATHER',
        breed: 'พม่ารำวงแท้',
        wins: 6,
        earnings: '1,200,000 บาท',
        imageUrl: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=400&q=80',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        note: 'จ่ายลูกเก่ง เบอร์แข้งระดับแถวหน้าของประเทศ'
      },
      mother: {
        id: 'ped-m1',
        name: 'แม่เพชรชมพู',
        code: 'DAM-042',
        role: 'MOTHER',
        breed: 'สายเลือดกวนอู+เยียร์อยุธยา',
        imageUrl: 'https://images.unsplash.com/photo-1596733430284-f7437764b1a9?auto=format&fit=crop&w=400&q=80',
        note: 'แม่พันธุ์หลักโครงสร้างกระดูกใหญ่ ถ่ายทอดความเร็ว'
      },
      paternalGrandSire: {
        id: 'ped-pgs1',
        name: 'เจ้าสายฟ้าฟาด',
        code: 'PGS-001',
        role: 'PATERNAL_GRANDSIRE',
        breed: 'พม่าสายเลือดคลาสสิก',
        wins: 8,
        earnings: '2,500,000 บาท',
        imageUrl: 'https://images.unsplash.com/photo-1612170153139-6f881ff067e0?auto=format&fit=crop&w=400&q=80',
      },
      paternalGrandDam: {
        id: 'ped-pgd1',
        name: 'แม่พิกุลทอง',
        code: 'PGD-014',
        role: 'PATERNAL_GRANDDAM',
        breed: 'แม่พันธุ์พม่าหน้าหงอน',
        imageUrl: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=400&q=80',
      },
      maternalGrandSire: {
        id: 'ped-mgs1',
        name: 'เจ้ากวนอูแดง',
        code: 'MGS-003',
        role: 'MATERNAL_GRANDSIRE',
        breed: 'พม่าเยียร์',
        wins: 5,
        earnings: '800,000 บาท',
        imageUrl: 'https://images.unsplash.com/photo-1596733430284-f7437764b1a9?auto=format&fit=crop&w=400&q=80',
      },
      maternalGrandDam: {
        id: 'ped-mgd1',
        name: 'แม่กุหลาบดำ',
        code: 'MGD-088',
        role: 'MATERNAL_GRANDDAM',
        breed: 'ลูกเหล่าป่าก๋อยกวนอู',
        imageUrl: 'https://images.unsplash.com/photo-1612170153139-6f881ff067e0?auto=format&fit=crop&w=400&q=80',
      }
    }
  },
  {
    id: 'gc-02',
    code: 'CF-902',
    name: 'เจ้ารถถังเพชฌฆาต',
    breed: 'ป่าก๋อยพัฒนา',
    sex: 'MALE',
    ageMonths: 11,
    weightKg: 2.9,
    fightingStyle: 'เชิงเข้าปีก กัดหลัง ทุบข้อหัว เบอร์แข้งหนักหน่วงหักดิ้น',
    winRecords: {
      wins: 2,
      draws: 0,
      losses: 0,
      details: ['ชนะบ่อนชมรมสายเหนือ 44,000 บ.', 'ชนะไฟต์ใหญ่ชานเมือง 220,000 บ. (อัน 3 น็อคคู่ต่อสู้)'],
    },
    price: 45000,
    status: 'AVAILABLE',
    tags: ['แชมป์เปี้ยน', 'ไก่หนุ่มคัดผ่าน'],
    imageUrl: 'https://images.unsplash.com/photo-1596733430284-f7437764b1a9?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1596733430284-f7437764b1a9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=800&q=80'
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    depositPercentage: 30,
    pedigree: {
      father: {
        id: 'ped-f2',
        name: 'เจ้าแสนชัย (ป่าก๋อยร้อยเหลี่ยม)',
        code: 'SIRE-015',
        role: 'FATHER',
        breed: 'ป่าก๋อยสายตรงลำพูน',
        wins: 7,
        earnings: '3,000,000 บาท',
        imageUrl: 'https://images.unsplash.com/photo-1596733430284-f7437764b1a9?auto=format&fit=crop&w=400&q=80',
        note: 'สถิติตีคู่ต่อสู้หักทุกไฟต์ พ่อพันธุ์เงินล้าน'
      },
      mother: {
        id: 'ped-m2',
        name: 'แม่มังกรขาว',
        code: 'DAM-065',
        role: 'MOTHER',
        breed: 'ป่าก๋อยกัดจัด',
        imageUrl: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=400&q=80',
      },
      paternalGrandSire: {
        id: 'ped-pgs2',
        name: 'เจ้าแบล็คฮอว์ค',
        code: 'PGS-099',
        role: 'PATERNAL_GRANDSIRE',
        breed: 'ก๋อยโบราณแท้',
        wins: 5,
        earnings: '1,500,000 บาท',
        imageUrl: 'https://images.unsplash.com/photo-1612170153139-6f881ff067e0?auto=format&fit=crop&w=400&q=80',
      },
      paternalGrandDam: {
        id: 'ped-pgd2',
        name: 'แม่ดวงใจ',
        code: 'PGD-019',
        role: 'PATERNAL_GRANDDAM',
        breed: 'แม่ก๋อยร้อยสาย',
        imageUrl: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=400&q=80',
      },
      maternalGrandSire: {
        id: 'ped-mgs2',
        name: 'เจ้าพยัคฆ์คำราม',
        code: 'MGS-008',
        role: 'MATERNAL_GRANDSIRE',
        breed: 'ป่าก๋อยเชิงชน',
        wins: 4,
        earnings: '660,000 บาท',
        imageUrl: 'https://images.unsplash.com/photo-1596733430284-f7437764b1a9?auto=format&fit=crop&w=400&q=80',
      },
      maternalGrandDam: {
        id: 'ped-mgd2',
        name: 'แม่มุกดา',
        code: 'MGD-031',
        role: 'MATERNAL_GRANDDAM',
        breed: 'สายแม่พันธุ์กัดสปีด',
        imageUrl: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=400&q=80',
      }
    }
  },
  {
    id: 'gc-03',
    code: 'CF-944',
    name: 'เจ้ามังกรทอง',
    breed: 'เชิงไทยดั้งเดิม (ตราด+พนัส)',
    sex: 'MALE',
    ageMonths: 9,
    weightKg: 2.8,
    fightingStyle: 'กอดบน มัดคอ กัดบ่าตีตัว ล็อคแน่นไม่ปล่อย',
    winRecords: {
      wins: 1,
      draws: 0,
      losses: 0,
      details: ['ชนะไก่หนุ่มคัดซ้อมระดับจังหวัด 55,000 บ.'],
    },
    price: 18000,
    status: 'RESERVED',
    tags: ['ดาวรุ่ง', 'ไก่หนุ่มคัดผ่าน'],
    imageUrl: 'https://images.unsplash.com/photo-1612170153139-6f881ff067e0?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1612170153139-6f881ff067e0?auto=format&fit=crop&w=800&q=80'
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    depositPercentage: 30,
    pedigree: {
      father: {
        id: 'ped-f3',
        name: 'เจ้าพญาอินทรี',
        code: 'SIRE-022',
        role: 'FATHER',
        breed: 'ไก่ชนเชิงตราดแท้',
        wins: 4,
        earnings: '900,000 บาท',
        imageUrl: 'https://images.unsplash.com/photo-1612170153139-6f881ff067e0?auto=format&fit=crop&w=400&q=80',
      },
      mother: {
        id: 'ped-m3',
        name: 'แม่เกล็ดมณี',
        code: 'DAM-011',
        role: 'MOTHER',
        breed: 'สายพันธุ์พนัสนิคม',
        imageUrl: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=400&q=80',
      },
      paternalGrandSire: {
        id: 'ped-pgs3',
        name: 'เจ้าคมกริช',
        code: 'PGS-044',
        role: 'PATERNAL_GRANDSIRE',
        breed: 'ไก่เชิงสถิติไร้พ่าย',
        wins: 6,
        imageUrl: 'https://images.unsplash.com/photo-1596733430284-f7437764b1a9?auto=format&fit=crop&w=400&q=80',
      },
      paternalGrandDam: {
        id: 'ped-pgd3',
        name: 'แม่บังเกิดเกล้า',
        code: 'PGD-005',
        role: 'PATERNAL_GRANDDAM',
        breed: 'แม่เชิงลำหักลำโค่น',
        imageUrl: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=400&q=80',
      },
      maternalGrandSire: {
        id: 'ped-mgs3',
        name: 'เจ้าสิงห์โตทอง',
        code: 'MGS-017',
        role: 'MATERNAL_GRANDSIRE',
        breed: 'สายเชิงโบราณ',
        wins: 3,
        imageUrl: 'https://images.unsplash.com/photo-1612170153139-6f881ff067e0?auto=format&fit=crop&w=400&q=80',
      },
      maternalGrandDam: {
        id: 'ped-mgd3',
        name: 'แม่ประกายแก้ว',
        code: 'MGD-099',
        role: 'MATERNAL_GRANDDAM',
        breed: 'สายแม่พันธุ์ชั้นยอด',
        imageUrl: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=400&q=80',
      }
    }
  },
  {
    id: 'gc-04',
    code: 'CF-990',
    name: 'เจ้าจอมมารดำ',
    breed: 'พม่า+ก๋อยพัฒนา',
    sex: 'MALE',
    ageMonths: 12,
    weightKg: 2.85,
    fightingStyle: 'โยกลอด ถอยยิงแข้งเปล่า ออกแข้งรวดเร็วเดือยคม',
    winRecords: {
      wins: 4,
      draws: 0,
      losses: 0,
      details: ['ชนะสนามภาคเหนือ 110,000 บ.', 'ชนะสนามมาตรฐาน 550,000 บ.'],
    },
    price: 60000,
    status: 'SOLD',
    tags: ['แชมป์เปี้ยน', 'พ่อพันธุ์หลัก'],
    imageUrl: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=800&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=800&q=80'],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    depositPercentage: 30,
    pedigree: {
      father: {
        id: 'ped-f4',
        name: 'เจ้าเพชรดำ',
        code: 'SIRE-055',
        role: 'FATHER',
        breed: 'พม่าแข้งทอง',
        wins: 7,
        earnings: '2,800,000 บาท',
        imageUrl: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=400&q=80',
      },
      mother: {
        id: 'ped-m4',
        name: 'แม่มังกรหยก',
        code: 'DAM-080',
        role: 'MOTHER',
        breed: 'ป่าก๋อยสปีด',
        imageUrl: 'https://images.unsplash.com/photo-1596733430284-f7437764b1a9?auto=format&fit=crop&w=400&q=80',
      },
      paternalGrandSire: {
        id: 'ped-pgs4',
        name: 'เจ้าพญาอินทรี',
        code: 'PGS-022',
        role: 'PATERNAL_GRANDSIRE',
        breed: 'พม่ารำวงแท้',
        wins: 5,
        imageUrl: 'https://images.unsplash.com/photo-1612170153139-6f881ff067e0?auto=format&fit=crop&w=400&q=80',
      },
      paternalGrandDam: {
        id: 'ped-pgd4',
        name: 'แม่ทิพย์วัลย์',
        code: 'PGD-011',
        role: 'PATERNAL_GRANDDAM',
        breed: 'แม่พันธุ์พม่า',
        imageUrl: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=400&q=80',
      },
      maternalGrandSire: {
        id: 'ped-mgs4',
        name: 'เจ้าจอมโหด',
        code: 'MGS-002',
        role: 'MATERNAL_GRANDSIRE',
        breed: 'ป่าก๋อย',
        wins: 4,
        imageUrl: 'https://images.unsplash.com/photo-1596733430284-f7437764b1a9?auto=format&fit=crop&w=400&q=80',
      },
      maternalGrandDam: {
        id: 'ped-mgd4',
        name: 'แม่กาหลง',
        code: 'MGD-015',
        role: 'MATERNAL_GRANDDAM',
        breed: 'แม่ก๋อยกัดจัด',
        imageUrl: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=400&q=80',
      }
    }
  }
];

export const INITIAL_EGGS: FertilizedEgg[] = [
  {
    id: 'egg-01',
    code: 'EGG-NINJA-01',
    name: 'ไข่เชื้อคู่ผสม: เจ้านินจาดำ x แม่เพชรชมพู',
    sireName: 'เจ้านินจาดำ (ยอดม้าล่อเงินล้าน ชนะ 6 ไฟต์)',
    damName: 'แม่เพชรชมพู (สายเลือดกวนอู+เยียร์อยุธยา)',
    breedCombo: 'พม่ารำวงสปีด + เยียร์โครงสร้างใหญ่',
    weeklyQuota: 20,
    remainingQuota: 6,
    priceTiers: [
      { quantity: 1, price: 1500, label: 'แยก 1 ฟอง (1,500 บ.)' },
      { quantity: 3, price: 4000, label: 'เซ็ต 3 ฟอง (4,000 บ. - ประหยัด 500)' },
      { quantity: 5, price: 6000, label: 'เซ็ต 5 ฟอง (6,000 บ. - ประหยัด 1,500)' }
    ],
    warrantyTerms: 'รับประกันไข่เชื้อ 7 วัน เมื่อส่องไฟไม่พบเชื้อในวันที่ 7 นับจากวันจัดส่ง ยินดีส่งเคลมให้ฟรีในรอบถัดไปทันที (ผู้ซื้อต้องถ่ายคลิปส่องไฟต่อเนื่องแบบไม่ตัดต่อ)',
    imageUrl: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=800&q=80',
    sireImageUrl: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=400&q=80',
    damImageUrl: 'https://images.unsplash.com/photo-1596733430284-f7437764b1a9?auto=format&fit=crop&w=400&q=80',
    sireVideoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 'egg-02',
    code: 'EGG-SAENCHAI-02',
    name: 'ไข่เชื้อคู่ผสม: เจ้าแสนชัย x แม่มังกรขาว',
    sireName: 'เจ้าแสนชัย (ป่าก๋อยร้อยเหลี่ยม ชนะ 7 ไฟต์ 3.0M)',
    damName: 'แม่มังกรขาว (ป่าก๋อยกัดหลังจัด)',
    breedCombo: 'ป่าก๋อยสายตรงลำพูนแท้ 100%',
    weeklyQuota: 15,
    remainingQuota: 3,
    priceTiers: [
      { quantity: 1, price: 2000, label: 'แยก 1 ฟอง (2,000 บ.)' },
      { quantity: 3, price: 5500, label: 'เซ็ต 3 ฟอง (5,500 บ. - ประหยัด 500)' },
      { quantity: 5, price: 8500, label: 'เซ็ต 5 ฟอง (8,500 บ. - ยอดนิยม)' }
    ],
    warrantyTerms: 'รับประกันไข่มีเชื้อ 100% ส่องไฟวันที่ 7 ไม่พบเชื้อเคลมใหม่ฟรีรอบถัดไป พร้อมบัตรรับรองสายพันธุ์แท้จากฟาร์ม',
    imageUrl: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=800&q=80',
    sireImageUrl: 'https://images.unsplash.com/photo-1596733430284-f7437764b1a9?auto=format&fit=crop&w=400&q=80',
    damImageUrl: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=400&q=80',
    sireVideoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  }
];

export const INITIAL_EQUIPMENT: SupplyEquipment[] = [
  {
    id: 'eq-01',
    sku: 'MED-VAC-01',
    name: 'วัคซีนรวมนิวคาสเซิล + หลอดลมอักเสบ (สูตรฟาร์ม)',
    category: 'MEDICINE',
    categoryName: 'เวชภัณฑ์ยารักษา',
    price: 380,
    stock: 45,
    minStockAlert: 10,
    unit: 'ขวด',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
    description: 'ป้องกันโรคนิวคาสเซิลและหลอดลมอักเสบในไก่ชน ใช้หยอดตาหรือจมูก ละลายน้ำได้ ปลอดภัย 100%'
  },
  {
    id: 'eq-02',
    sku: 'MED-BOOST-02',
    name: 'ยาบำรุงกำลังกำลังบิน ซุปเปอร์พาวเวอร์ ไก่ชน',
    category: 'MEDICINE',
    categoryName: 'เวชภัณฑ์ยารักษา',
    price: 490,
    stock: 4, // Intentionally low for warning demo
    minStockAlert: 10,
    unit: 'กระปุก',
    imageUrl: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=600&q=80',
    description: 'เสริมแคลเซียม วิตามินรวม บำรุงกล้ามเนื้อ บินดีไม่มีหมดแรง ตีลำหนัก'
  },
  {
    id: 'eq-03',
    sku: 'TRN-GLV-01',
    name: 'นวมซ้อมไก่ชนหนังแท้ เกรดพรีเมียม (ชุด 4 ชิ้น)',
    category: 'TRAINING',
    categoryName: 'อุปกรณ์ซ้อม',
    price: 320,
    stock: 28,
    minStockAlert: 5,
    unit: 'ชุด',
    imageUrl: 'https://images.unsplash.com/photo-1517438322307-e67111335449?auto=format&fit=crop&w=600&q=80',
    description: 'ผลิตจากหนังแท้บุฟองน้ำหนานุ่ม ป้องกันเดือยหักและบาดเจ็บขณะเตะเป้าซ้อมปล้ำ'
  },
  {
    id: 'eq-04',
    sku: 'TRN-MASK-02',
    name: 'ที่ครอบปากไก่ชนซิลิโคน ป้องกันปากหักปากเบี้ยว',
    category: 'TRAINING',
    categoryName: 'อุปกรณ์ซ้อม',
    price: 150,
    stock: 35,
    minStockAlert: 5,
    unit: 'ชิ้น',
    imageUrl: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=600&q=80',
    description: 'ซิลิโคนเกรดการแพทย์ ยืดหยุ่นสูง ใส่ง่าย หายใจสะดวก ป้องกันปากบนล่างหลุด'
  },
  {
    id: 'eq-05',
    sku: 'FRM-COOP-01',
    name: 'สุ่มไก่ชนหวายแท้เคลือบกันมอด + มุ้งกันยุงครอบสุ่ม',
    category: 'FARM_TOOLS',
    categoryName: 'อุปกรณ์เลี้ยงดู',
    price: 850,
    stock: 12,
    minStockAlert: 3,
    unit: 'ชุด',
    imageUrl: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=600&q=80',
    description: 'สุ่มหวายโครงสร้างเหนียวแน่น แข็งแรงทนแดดทนฝน พร้อมผ้ามุ้งกันยุงตาถี่ป้องกันยุงรำคาญ'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-101',
    orderNumber: 'CF-ORD-202611-001',
    createdAt: '2026-11-10 14:30',
    customerName: 'สมชาย รักไก่ชน',
    phone: '081-234-5678',
    address: '99/4 หมู่ 3 ต.บางพระ อ.เมือง จ.ชลบุรี 20000',
    totalAmount: 18000,
    depositPaid: 5400,
    status: 'PENDING_SLIP',
    reservationExpiresAt: '2026-11-12 14:30',
    splitPackages: [
      {
        packageType: 'LIVE_ANIMAL',
        transportType: 'PET_VAN',
        items: [
          {
            id: 'cart-1',
            productId: 'gc-03',
            name: 'เจ้ามังกรทอง (CF-944)',
            code: 'CF-944',
            type: 'LIVE_GAMECOCK',
            price: 18000,
            quantity: 1,
            imageUrl: 'https://images.unsplash.com/photo-1612170153139-6f881ff067e0?auto=format&fit=crop&w=400&q=80',
            isDeposit: true,
            depositAmount: 5400
          }
        ],
        subtotal: 18000,
        shippingFee: 600,
        logistics: {
          meetingPoint: 'จุดพักรถมอเตอร์เวย์ ขาออก ชลบุรี',
          driverName: 'ช่างเด่น รถตู้สายตะวันออก',
          driverPhone: '089-999-8877',
          vehiclePlate: 'ฮฮ-4321 กทม.'
        }
      }
    ]
  },
  {
    id: 'ord-102',
    orderNumber: 'CF-ORD-202611-002',
    createdAt: '2026-11-09 10:15',
    customerName: 'วิชัย ฟาร์มสิงห์ทอง',
    phone: '089-876-5432',
    address: '12/8 ต.ช้างเผือก อ.เมือง จ.เชียงใหม่ 50300',
    totalAmount: 4870,
    status: 'PENDING_SHIPMENT',
    slipUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
    slipUploadedAt: '2026-11-09 10:20',
    splitPackages: [
      {
        packageType: 'PARCEL',
        transportType: 'EXPRESS_PARCEL',
        items: [
          {
            id: 'cart-2',
            productId: 'egg-01',
            name: 'ไข่เชื้อ: เจ้านินจาดำ x แม่เพชรชมพู (เซ็ต 3 ฟอง)',
            type: 'FERTILIZED_EGG',
            price: 4000,
            quantity: 1,
            imageUrl: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=400&q=80'
          },
          {
            id: 'cart-3',
            productId: 'eq-01',
            name: 'วัคซีนรวมนิวคาสเซิล + หลอดลมอักเสบ',
            type: 'EQUIPMENT',
            price: 380,
            quantity: 2,
            imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80'
          }
        ],
        subtotal: 4760,
        shippingFee: 110,
        logistics: {
          courierName: 'Flash Express (กล่องโฟมกันกระแทกพิเศษ)',
          trackingNumber: 'TH0129384756A'
        }
      }
    ]
  },
  {
    id: 'ord-103',
    orderNumber: 'CF-ORD-202611-003',
    createdAt: '2026-11-08 09:00',
    customerName: 'เสี่ยเอก นครสวรรค์',
    phone: '085-555-1212',
    address: '55/1 ต.ปากน้ำโพ อ.เมือง จ.นครสวรรค์ 60000',
    totalAmount: 60600,
    status: 'SHIPPED',
    slipUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
    slipUploadedAt: '2026-11-08 09:12',
    splitPackages: [
      {
        packageType: 'LIVE_ANIMAL',
        transportType: 'PET_VAN',
        items: [
          {
            id: 'cart-4',
            productId: 'gc-04',
            name: 'เจ้าจอมมารดำ (CF-990)',
            code: 'CF-990',
            type: 'LIVE_GAMECOCK',
            price: 60000,
            quantity: 1,
            imageUrl: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=400&q=80'
          }
        ],
        subtotal: 60000,
        shippingFee: 600,
        logistics: {
          meetingPoint: 'ปั๊ม ปตท. แยกสะพานเดชาติวงศ์',
          driverName: 'พี่หนุ่ม รถตู้สายเหนือ',
          driverPhone: '082-111-2233',
          vehiclePlate: '1นข-9876 นครสวรรค์'
        }
      }
    ]
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'มีคำสั่งซื้อใหม่เข้ามา',
    message: 'ออเดอร์ #CF-ORD-202611-001 มัดจำไก่ชน "เจ้ามังกรทอง" รอการตรวจสอบสลิป',
    time: '10 นาทีที่แล้ว',
    type: 'ORDER',
    read: false
  },
  {
    id: 'notif-2',
    title: 'แจ้งเตือนสต๊อกสินค้าใกล้หมด!',
    message: '"ยาบำรุงกำลังกำลังบิน ซุปเปอร์พาวเวอร์" เหลือเพียง 4 กระปุก (เกณฑ์ขั้นต่ำ 10)',
    time: '1 ชั่วโมงที่แล้ว',
    type: 'STOCK',
    read: false
  },
  {
    id: 'notif-3',
    title: 'อัปเดตสถานะจัดส่งเรียบร้อย',
    message: 'ออเดอร์ #CF-ORD-202611-003 รถตู้ขนส่งออกเดินทางแล้ว ปลายทางนครสวรรค์',
    time: '2 ชั่วโมงที่แล้ว',
    type: 'LOGISTICS',
    read: true
  }
];

