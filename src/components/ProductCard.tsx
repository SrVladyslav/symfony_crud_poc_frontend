import React from 'react'
import { TbCurrencyEuro } from "react-icons/tb";
import CategoryLabel from "@/components/ui/categoryLabel"
import ProductDropdown from '@/components/ProductDropdown';

const ProductCard =({
    item
}:{
    item: any
})=>{
    return <div className='relative px-4 py-3 rounded-md duration-300
        border-[1px] border-none hover:border-[var(--purple-2)] 
        drop-shadow-sm flex flex-col bg-[white] text-sm
    '>
        <div className='w-full grid grid-cols-[auto_40px]'>
            <span className='text-[var(--foreground)] text-sm font-bold'>{item?.name}</span>
            <ProductDropdown
                itemId={item?.id}
                itemName={item?.name}
                itemDescription={item?.description}
                itemCategory={item?.category?.id}
                itemPrice={item?.price}
            />
        </div>
        <p className='text-xs text-[var(--foreground)] tracking-wider mt-1.5'>{item?.description}</p>
        <div className='flex items-center justify-between gap-0 mt-5'>
            <CategoryLabel> 
                {item?.category?.name}
            </CategoryLabel>
            <div className='flex items-center font-semibold'> 
                <TbCurrencyEuro className='text-[1rem] mb-0.5 text-[var(--foreground)]'/>
                <span className='text-base text-[var(--foreground)]'>{item?.price?.toFixed(2)}</span>
            </div>
        </div>
    </div>
}

export default ProductCard