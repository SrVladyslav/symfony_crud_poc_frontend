'use client'

import React from 'react'
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import useQueryStore from '@/store/useQueryStore'

const SimplePagination =({type}:{
    type: 'category' | 'product'
})=>{
    const { categoryPage, setCategoryPage, productPage, setPrductPage } = useQueryStore()

    const setter = type === 'category' ? setCategoryPage : setPrductPage
    const page = type === 'category' ? categoryPage : productPage

    const handleLeftClick = () => {
        if(page === null || page - 1 < 1) {
            return
        }
        setter(page - 1)
    }

    const handleRightClick = () => {
        if(page === null) {
            return
        }
        setter(page + 1)
    }

    return <div className='relative w-full flex justify-center items-center gap-1'>
        <FaChevronLeft onClick={handleLeftClick} className='text-md pointer-cursor'/>
        <div className='relative flex flex-col items-center justify-center select-none'>
            <span className='text-xs text-bold leading-4'>{page}</span>
            <span className='tracking-wider text-[0.5rem] leading-3'>PAGE</span>
        </div>
        <FaChevronRight onClick={handleRightClick} className='text-md pointer-cursor'/>
    </div>
}

export default SimplePagination