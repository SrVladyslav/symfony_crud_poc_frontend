import React from 'react'
import ProductsData from "@/components/layouts/ProductsData";
import ProductNew from "@/components/ProductNew";

const ProductSection =()=>{
    return <div className='relative w-full m-0 flex flex-col justify-center gap-6'>
        <div className='relative w-full flex flex-row justify-between items-center'>
            <h2 className='text-2xl font-semibold'>Products</h2>
            <ProductNew/>
        </div>
        <ProductsData/>
    </div>
}

export default ProductSection