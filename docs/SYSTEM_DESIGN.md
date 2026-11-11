# เอกสารการออกแบบระบบและฐานข้อมูล (System Design & Database Schema)
**โครงการ:** ระบบบริหารจัดการและซื้อ-ขายไก่ชนออนไลน์ (Gamecock Farm & E-Commerce Platform)  
**อ้างอิง:** ข้อกำหนดขอบเขตของงาน (TOR)

---

## 1. ภาพรวมสถาปัตยกรรมระบบ (System Architecture)

```
[ Front-end Storefront & Admin ]
       (Next.js App Router)
                │
         HTTPS / REST API
                ▼
      [ Back-end API Services ]
   (NestJS Architecture Pattern)
      ┌─────────┴─────────┐
      ▼                   ▼
 [ MySQL 8.0+ ]     [ Cloud Storage (S3) ]
- Recursive CTEs    - Gamecock Photos / Gallery
  for Pedigree Tree - Sparring Video Thumbnails
- Transactions &    - Payment Slips
  Split Cart Orders
```

---

## 2. โครงสร้างฐานข้อมูล (Database Schema & DDL)

### 2.1 ตารางไก่ชนและผังสายเลือด (`gamecocks`)
ตารางนี้ออกแบบให้มีฟิลด์ `sire_id` (พ่อ) และ `dam_id` (แม่) ชี้กลับมาที่ตารางตัวเอง (Self-referencing Relationship) เพื่อรองรับการสืบค้น **ผังสายเลือดแบบไม่จำกัดรุ่น**:

```sql
CREATE TABLE gamecocks (
    id VARCHAR(36) PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,       -- รหัสไก่ เช่น CF-881
    name VARCHAR(150) NOT NULL,              -- ชื่อไก่
    breed VARCHAR(100) NOT NULL,             -- สายพันธุ์ (พม่ารำวง, ป่าก๋อย ฯลฯ)
    sex ENUM('MALE', 'FEMALE') NOT NULL,
    age_months INT NOT NULL,
    weight_kg DECIMAL(4, 2) NOT NULL,
    fighting_style TEXT NOT NULL,            -- ลีลา/เชิงชน
    price DECIMAL(10, 2) NOT NULL,
    deposit_rate DECIMAL(3, 2) DEFAULT 0.30, -- อัตรามัดจำ 30%
    status ENUM('AVAILABLE', 'RESERVED', 'SOLD', 'BREEDER') DEFAULT 'AVAILABLE',
    tags JSON,                               -- ["ดาวรุ่ง", "แชมป์เปี้ยน"]
    primary_image_url VARCHAR(500) NOT NULL,
    video_url VARCHAR(500),                  -- ลิงก์คลิปเตะเป้า (YouTube/TikTok)
    sire_id VARCHAR(36),                     -- ชี้ไปที่ ID พ่อพันธุ์
    dam_id VARCHAR(36),                      -- ชี้ไปที่ ID แม่พันธุ์
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (sire_id) REFERENCES gamecocks(id) ON DELETE SET NULL,
    FOREIGN KEY (dam_id) REFERENCES gamecocks(id) ON DELETE SET NULL
);

-- ตารางสถิติไฟต์การชน (Win Records)
CREATE TABLE win_records (
    id VARCHAR(36) PRIMARY KEY,
    gamecock_id VARCHAR(36) NOT NULL,
    arena_name VARCHAR(200) NOT NULL,
    stake_amount DECIMAL(12, 2) NOT NULL,   -- เงินเดิมพัน/ไฟต์
    result ENUM('WIN', 'DRAW', 'LOSS') NOT NULL,
    rounds_fought INT,
    fight_date DATE,
    FOREIGN KEY (gamecock_id) REFERENCES gamecocks(id) ON DELETE CASCADE
);
```

### 2.2 ตารางไข่เชื้อและโควตา (`fertilized_eggs`)
```sql
CREATE TABLE fertilized_eggs (
    id VARCHAR(36) PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(200) NOT NULL,
    sire_id VARCHAR(36) NOT NULL,
    dam_id VARCHAR(36) NOT NULL,
    weekly_quota INT NOT NULL DEFAULT 20,
    remaining_quota INT NOT NULL DEFAULT 20,
    warranty_terms TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sire_id) REFERENCES gamecocks(id),
    FOREIGN KEY (dam_id) REFERENCES gamecocks(id)
);

-- ระดับราคาขายไข่เชื้อ (Tier Pricing 1, 3, 5 ฟอง)
CREATE TABLE egg_price_tiers (
    id VARCHAR(36) PRIMARY KEY,
    egg_id VARCHAR(36) NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (egg_id) REFERENCES fertilized_eggs(id) ON DELETE CASCADE
);
```

### 2.3 ตารางคำสั่งซื้อและการแยกพัสดุ (`orders` & `split_packages`)
รองรับ **Smart Split Cart** แยกบิลระหว่างรถตู้สัตว์เลี้ยงและพัสดุด่วน:
```sql
CREATE TABLE orders (
    id VARCHAR(36) PRIMARY KEY,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    customer_name VARCHAR(150) NOT NULL,
    phone VARCHAR(30) NOT NULL,
    shipping_address TEXT NOT NULL,
    total_amount DECIMAL(12, 2) NOT NULL,
    deposit_amount DECIMAL(12, 2) DEFAULT 0,
    status ENUM('PENDING_SLIP', 'PENDING_SHIPMENT', 'SHIPPED', 'COMPLETED', 'CANCELLED') DEFAULT 'PENDING_SLIP',
    slip_image_url VARCHAR(500),
    reservation_expires_at TIMESTAMP,        -- ตัวนับถอยหลัง 48 ชั่วโมง
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE split_packages (
    id VARCHAR(36) PRIMARY KEY,
    order_id VARCHAR(36) NOT NULL,
    package_type ENUM('LIVE_ANIMAL', 'PARCEL') NOT NULL,
    transport_method ENUM('PET_VAN', 'EXPRESS_PARCEL') NOT NULL,
    shipping_fee DECIMAL(10, 2) NOT NULL,
    driver_name VARCHAR(100),                -- ข้อมูลรถตู้สัตว์เลี้ยง
    driver_phone VARCHAR(30),
    vehicle_plate VARCHAR(30),
    meeting_point TEXT,
    tracking_number VARCHAR(100),            -- ข้อมูลเลขพัสดุ Flash/EMS
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);
```

---

## 3. การสืบค้นผังสายเลือดด้วย MySQL 8.0 Recursive CTE (Pedigree Tree Query)

ตามที่ TOR ข้อ 4 ระบุถึงการใช้ **Recursive CTEs** เพื่อดึงผังสายเลือดย้อนหลัง 3 รุ่น (หรือมากกว่า):

```sql
WITH RECURSIVE PedigreeTree AS (
    -- Anchor member: ไก่ตัวเริ่มต้น (รุ่นที่ 0)
    SELECT 
        id,
        code,
        name,
        breed,
        sire_id,
        dam_id,
        0 AS generation,
        CAST('PROBAND' AS CHAR(30)) AS relationship
    FROM gamecocks
    WHERE code = 'CF-881'

    UNION ALL

    -- Recursive member: สืบค้นหาพ่อและแม่ย้อนหลังไปเรื่อยๆ
    SELECT 
        parent.id,
        parent.code,
        parent.name,
        parent.breed,
        parent.sire_id,
        parent.dam_id,
        tree.generation + 1 AS generation,
        CASE 
            WHEN tree.generation = 0 AND parent.id = tree.sire_id THEN 'SIRE (พ่อ)'
            WHEN tree.generation = 0 AND parent.id = tree.dam_id THEN 'DAM (แม่)'
            WHEN tree.generation = 1 AND parent.id = tree.sire_id THEN 'GRANDSIRE (ปู่/ตา)'
            WHEN tree.generation = 1 AND parent.id = tree.dam_id THEN 'GRANDDAM (ย่า/ยาย)'
            ELSE 'ANCESTOR'
        END AS relationship
    FROM gamecocks parent
    INNER JOIN PedigreeTree tree 
        ON parent.id = tree.sire_id OR parent.id = tree.dam_id
    WHERE tree.generation < 3 -- จำกัด 3 รุ่นตาม TOR
)
SELECT * FROM PedigreeTree ORDER BY generation ASC;
```

---

## 4. ข้อกำหนด API Endpoints (RESTful API Specifications)

| Method | Endpoint | รายละเอียด |
|---|---|---|
| `GET` | `/api/gamecocks` | ดึงรายการไก่ชนทั้งหมด พร้อมตัวกรองสายพันธุ์, ราคา, ลีลาการชน |
| `GET` | `/api/gamecocks/:code` | ดึงข้อมูลไก่ชนรายตัว + ผังสายเลือด 3 รุ่น |
| `GET` | `/api/eggs` | ดึงรายการไข่เชื้อ โควตารายสัปดาห์ และ Tier ราคา |
| `GET` | `/api/equipment` | ดึงรายการอุปกรณ์ เวชภัณฑ์ และสถานะสต๊อก |
| `POST` | `/api/orders` | สร้างคำสั่งซื้อใหม่ พร้อมระบบแยกบิล Smart Split Package |
| `PUT` | `/api/orders/:id/status` | อัปเดตสถานะออเดอร์ในบอร์ด Kanban (Admin) |
| `PUT` | `/api/orders/:id/logistics` | อัปเดตข้อมูลรถตู้สัตว์เลี้ยง / เลขพัสดุ (Admin) |
| `POST` | `/api/orders/:id/upload-slip` | แนบสลิปการโอนเงิน |

