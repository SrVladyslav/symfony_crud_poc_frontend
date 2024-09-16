'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useSWRConfig } from 'swr'
import { createProduct } from '@/app/actions/productActions'
import { useServerUrl } from '@/hooks/useServerUrl'
import useCategoriesData from '@/hooks/useCategoriesData'
import { toast } from 'sonner';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle
} from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ProductNew() {
    const { serverUrl } = useServerUrl()
    const { categories, isLoading, isError } = useCategoriesData(serverUrl)
    const [selectedCategory, setSelectedCategory] = useState<any>(null)

    const { mutate } = useSWRConfig()
    const [name, setName] = useState<any>('');
    const [desc, setDesc] = useState<any>('');
    const [openNew, setOpenNew] = useState(false);

    const handleCreate = async () => {
        if (!name || !desc || !selectedCategory) {
            toast.error("Please fill in all fields.")
            return
        }
        
        const res = await createProduct(name, desc, selectedCategory)
        if (res) {
            setDesc('')
            setName('')
            setSelectedCategory(null)
            toast.success('Product created successfully')
            mutate(`${process.env.NEXT_PUBLIC_API_URL}/api/categories/get`)
            mutate(`${process.env.NEXT_PUBLIC_API_URL}/api/products/get`)
            setOpenNew(false)
        } else {
            toast.error("Failed to create product.")
        }
    }

    return (
        <div>
            <Button variant="default" size='sm' 
                onClick={()=>{setOpenNew(true)}}
            >New product</Button>
            <Sheet open={openNew} onOpenChange={setOpenNew}>
                <SheetContent className='bg-[white] w-full xs:w-[400px] sm:w-[540px]'>
                    <SheetHeader>
                        <SheetTitle>Create New Product</SheetTitle>
                        <SheetDescription>
                            Fill the new product information here. Click create when you're done.
                        </SheetDescription>
                    </SheetHeader>
                    <div className="grids gap-4 py-4 flex flex-col">
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
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="category" className="text-right">
                                Category
                            </Label>
                            <div className="col-span-3">
                                {isLoading ? (
                                    <p>Loading categories...</p>
                                ) : (
                                    <Select onValueChange={setSelectedCategory}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories && categories.data.length > 0 ? (
                                                categories.data.map((category: any) => (
                                                    <SelectItem key={category.id} value={category.id}>
                                                        {category.name}
                                                    </SelectItem>
                                                ))
                                            ) : (
                                                <SelectItem value="-" disabled>
                                                    No categories available
                                                </SelectItem>
                                            )}
                                        </SelectContent>
                                    </Select>
                                )}
                            </div>
                        </div>
                    </div>
                    <SheetFooter className='gap-y-2'>
                        <Button type="button" variant="default" onClick={handleCreate}>
                            Create product
                        </Button>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
    )
}
