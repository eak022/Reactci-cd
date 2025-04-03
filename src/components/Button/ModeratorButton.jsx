import React from 'react'
import { BiErrorCircle, BiShoppingBag, BiCategory } from "react-icons/bi";
const ModeratorButton = () => {
  return (
    <>
        <div className="flex items-center gap-4 whitespace-nowrap">
            <button className="flex items-center gap-2 px-4 py-2 text-black rounded-lg hover:bg-gray-200 transition">
            <BiErrorCircle size={15} />
            <span className="text-sm font-medium">รับเเจ้งรายงานปัญหา</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-black rounded-lg hover:bg-gray-200 transition">
            <BiShoppingBag size={15} />
            <span className="text-sm font-medium">อนุมัติโพสต์ซื่อขาย</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-black rounded-lg hover:bg-gray-200 transition">
            <BiCategory size={15} />
            <span className="text-sm font-medium">จัดการหมวดหมู่สินค้า</span>
            </button>
        </div>
    </>
  )
}

export default ModeratorButton