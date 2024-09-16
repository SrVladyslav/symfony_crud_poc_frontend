'use client'

import React from 'react'
import { FiLoader } from "react-icons/fi";
import CategoryCard from '@/components/CategoryCard'

import { useServerUrl } from '@/hooks/useServerUrl'
import useCategoriesData from '@/hooks/useCategoriesData'

const CategoriesData =()=>{
    const { serverUrl } = useServerUrl()
    const { categories, isLoading, isError } = useCategoriesData(serverUrl)

    if (isLoading) {
        return <div className='relative w-full flex justify-center items-center'>
            <FiLoader className='animate-spin text-xl text-[var(--black)]'/>
        </div>
    }

    if( isError) {
        return <div className='relative w-full'>
            <p className='text-left text-[var(--foreground)] text-sm'>Error loading categories</p>
        </div>
    }

    if(categories?.data && categories?.data?.length === 0) {
        return <div className='relative w-full flex justify-center items-center'>
            <p className='text-center text-[var(--foreground)] text-sm'>No categories found</p>
        </div>
    }

    return <div className='relative w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {categories?.data && categories.data.map((item:any, key:number)=>{
            return <CategoryCard key={key} item={item}/>
        })}
    </div>
}

export default CategoriesData