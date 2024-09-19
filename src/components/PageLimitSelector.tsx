import React from 'react'
import { Input } from '@/components/ui/input'; 
import useQueryStore from '@/store/useQueryStore'

const PageLimitSelector =()=>{
    const { limit, setLimit } = useQueryStore()

    const handleLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newLimit = e.target.value ? Number(e.target.value) : null
        if (newLimit !== null && newLimit < 1) {
            newLimit = 1
        }
        setLimit(newLimit)
    }

    return (
        <div className="flex flex-row gap-2 items-center">
            <label htmlFor="limit" className="text-xs tracking-wide">Limit:</label>
            <Input
                id="limit"
                type="number"
                value={limit ?? ''}
                onChange={handleLimitChange}
                className="w-full h-[32px]"
            />
        </div>
    )
}

export default PageLimitSelector