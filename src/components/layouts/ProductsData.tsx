'use client'

import React from 'react'
import { FiLoader } from "react-icons/fi";
import ProductCard from '@/components/ProductCard'

import { useServerUrl } from '@/hooks/useServerUrl'
import useProductsData from '@/hooks/useProductsData'

const ProductsData =()=>{
    const { serverUrl } = useServerUrl()
    const { products, isLoading, isError } = useProductsData(serverUrl)

    if (isLoading) {
        return <div className='relative w-full flex justify-center items-center'>
            <FiLoader className='animate-spin text-xl text-[var(--black)]'/>
        </div>
    }

    if( isError) {
        return <div className='relative w-full'>
            <p className='text-left text-[var(--foreground)] text-sm'>Error loading products</p>
        </div>
    }

    if(products?.data && products?.data?.length === 0) {
        return <div className='relative w-full flex justify-center items-center'>
            <p className='text-center text-[var(--foreground)] text-sm'>No products found</p>
        </div>
    }

    return <div className='relative w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {products?.data && products.data.map((item:any, key:number)=>{
            return <ProductCard key={key} item={item}/>
        })}
    </div>
}

export default ProductsData