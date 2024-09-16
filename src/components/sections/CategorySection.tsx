import React from 'react'
import CategoriesData from "@/components/layouts/CategoriesData";
import CategoryNew from "@/components/CategoryNew";

const CategorySection =()=>{
    return <div className='relative w-full m-0 flex flex-col justify-center gap-6'>
        <div className='relative w-full flex flex-row justify-between items-center'>
            <h2 className='text-2xl font-semibold'>Categories</h2>
            <CategoryNew/>
        </div>
        <CategoriesData/>
    </div>
}

export default CategorySection