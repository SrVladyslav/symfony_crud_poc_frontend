import React from 'react'
import { TbCurrencyEuro } from "react-icons/tb";
import CategoryLabel from "@/components/ui/categoryLabel";

const ProductCard =({
    item
}:{
    item: any
})=>{
    return <div className='relative px-4 py-3 rounded-md 
        border-[1px] border-none hover:border-[var(--purple-2)] 
        drop-shadow-sm flex flex-col bg-[white] text-sm
    '>
        <div className='w-full grid grid-cols-[auto_40px]'>
            <span className='text-[var(--foreground)] text-sm font-bold'>{item?.name}</span>
            <span>X</span>
        </div>
        <p className='text-xs text-[var(--foreground)] tracking-wider mt-1.5'>{item?.description}</p>
        <div className='flex items-center justify-between gap-0 mt-5'>
            <CategoryLabel> 
                {item?.category?.name}
            </CategoryLabel>
            <div className='flex items-center font-semibold'> 
                <TbCurrencyEuro className='text-[1rem] mb-0.5 text-[var(--foreground)]'/>
                <span className='text-base text-[var(--foreground)]'>{item?.price}</span>
            </div>
        </div>
        {JSON.stringify(item)}
    </div>
}

export default ProductCard