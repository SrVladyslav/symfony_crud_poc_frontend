import React from 'react'
import { FaBoxes } from "react-icons/fa";
import CategoryDropdown from "@/components/CategoryDropdown";

interface Category {
    id: number;
    name: string;
    description: string;
    products: any[];
}

const CategoryCard =({
    item
}:{
    item:Category
})=>{
    return <div className='relative px-4 py-3 rounded-md 
        border-[1px] border-none hover:border-[var(--purple-2)] 
        drop-shadow-sm flex flex-col bg-[white] text-sm
    '>
        <div className='w-full grid grid-cols-[auto_40px]'>
            <span className='text-[var(--foreground)] font-bold'>{item?.name}</span>
            <CategoryDropdown 
                itemId={item?.id}
                itemName={item?.name}
                itemDescription={item?.description}
            />
        </div>
        <div className='flex items-center gap-1'>
            <FaBoxes className='text-[0.6rem] text-[gray]'/>
            <span className='text-xs text-[gray] font-semibold'>{item?.products?.length}</span>
        </div>
        <p className='text-xs text-[var(--foreground)] tracking-wider mt-1.5'>{item?.description}</p>
    </div>
}

export default CategoryCard