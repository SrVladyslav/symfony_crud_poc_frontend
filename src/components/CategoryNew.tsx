'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useSWRConfig } from 'swr'
import {createCategory} from '@/app/actions/categoryAction'
import { toast } from 'sonner';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle
} from "@/components/ui/sheet"

export default function CategoryNew() {

    const { mutate } = useSWRConfig()
    const [name, setName] = useState<any>('');
    const [desc, setDesc] = useState<any>('');
    const [openNew, setOpenNew] = useState(false);

    const handleCreate = async ()=>{
        if(!name || !desc) {
            toast.error("Please fill in all fields.")
            return
        }

        const res = await createCategory(name, desc)

        if(res) {
            setDesc('')
            setName('')
            toast.success('Category created successfully')
            mutate(`${process.env.NEXT_PUBLIC_API_URL}/api/categories/get`)
            mutate(`${process.env.NEXT_PUBLIC_API_URL}/api/products/get`)
            setOpenNew(false)
        } else {
            toast.error("Failed to create category.")
        }
    }

    return (
        <div>
            <Button variant="default" size='sm' 
                onClick={()=>{setOpenNew(true)}}
            >New category</Button>
            <Sheet open={openNew} onOpenChange={setOpenNew}>
                <SheetContent className='bg-[white] w-full xs:w-[400px] sm:w-[540px]'>
                    <SheetHeader>
                        <SheetTitle>Create New Category</SheetTitle>
                        <SheetDescription>
                            Fill the new category information here. Click create when you're done.
                        </SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input 
                                id="name" 
                                placeholder='Name'
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                className="col-span-3" 
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                                Description
                            </Label>
                            <Textarea 
                                id="description" 
                                placeholder='Description'
                                value={desc} 
                                onChange={(e) => setDesc(e.target.value)} 
                                className="col-span-3" 
                            />
                        </div>
                    </div>
                    <SheetFooter className='gap-y-2'>
                        <Button type="button" variant="default" onClick={handleCreate}>
                            Create category
                        </Button>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
    )
}
