import React from 'react'
import CategoriesData from "@/components/layouts/CategoriesData";
import CategoryNew from "@/components/CategoryNew";
import SimplePagination from "@/components/SimplePagination";

const CategorySection =()=>{
    return <div className='relative w-full m-0 flex flex-col justify-center gap-6'>
        <div className='relative w-full flex flex-row justify-between items-center'>
            <div className='flex flex-row gap-6 items-center'>
                <h2 className='text-2xl font-semibold'>Categories</h2>
                <SimplePagination type='category'/>
            </div>
            <CategoryNew/>
        </div>
        <CategoriesData/>
    </div>
}

export default CategorySection