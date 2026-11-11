'use client';

import React, { useState } from 'react';
import { SupplyEquipment } from '../types';
import { ShoppingCart, Check, AlertTriangle, Package } from 'lucide-react';
import { useFarm } from '../context/FarmContext';

interface SupplyCardProps {
  item: SupplyEquipment;
}

export const SupplyCard: React.FC<SupplyCardProps> = ({ item }) => {
  const { addToCart } = useFarm();
  const [added, setAdded] = useState(false);

  const isLowStock = item.stock <= item.minStockAlert && item.stock > 0;
  const isOutOfStock = item.stock <= 0;

  const handleAdd = () => {
    if (isOutOfStock) return;
    addToCart({
      productId: item.id,
      name: item.name,
      code: item.sku,
      type: 'EQUIPMENT',
      price: item.price,
      quantity: 1,
      imageUrl: item.imageUrl
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
      <div className="relative aspect-4/3 w-full bg-slate-100 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />

        {/* Category Badge */}
        <div className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-xs text-white text-[11px] font-semibold px-2 py-0.5 rounded-md">
          {item.categoryName}
        </div>

        {/* Stock status badge */}
        {isOutOfStock ? (
          <div className="absolute top-2.5 right-2.5 bg-rose-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
            สินค้าหมด
          </div>
        ) : isLowStock ? (
          <div className="absolute top-2.5 right-2.5 bg-amber-500 text-slate-950 text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs animate-pulse">
            <AlertTriangle className="w-3 h-3 text-slate-950" /> ใกล้หมด (เหลือ {item.stock})
          </div>
        ) : (
          <div className="absolute top-2.5 right-2.5 bg-slate-900/60 backdrop-blur-xs text-white text-[10px] px-2 py-0.5 rounded-md">
            คงเหลือ {item.stock} {item.unit}
          </div>
        )}
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[10px] font-mono text-slate-400 block mb-0.5">SKU: {item.sku}</span>
          <h3 className="text-sm font-bold text-slate-900 line-clamp-2 mb-1.5">{item.name}</h3>
          <p className="text-xs text-slate-500 line-clamp-2 mb-3 leading-relaxed">{item.description}</p>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-lg font-black text-amber-600">฿{item.price.toLocaleString()}</span>
            <span className="text-[11px] text-slate-400"> /{item.unit}</span>
          </div>

          <button
            onClick={handleAdd}
            disabled={isOutOfStock}
            className={`py-2 px-3 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-xs ${
              added
                ? 'bg-emerald-600 text-white'
                : isOutOfStock
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-amber-500 hover:bg-amber-600 text-slate-950'
            }`}
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5" /> เพิ่มแล้ว
              </>
            ) : isOutOfStock ? (
              'หมด'
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5" /> ซื้อสินค้า
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

