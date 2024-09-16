import React from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

const CategoryLabel =({
    children
}:{
    children?:React.ReactNode
})=>{
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild className="cursor-pointer">
                    <span className='relative truncate text-xs text-[var(--foreground)] 
                        font-semibold bg-[var(--gray)] py-1 px-2 rounded-md max-w-[120px]'>
                        {children}
                    </span>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{children}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default CategoryLabel