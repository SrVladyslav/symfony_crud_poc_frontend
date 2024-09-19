'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useSWRConfig } from 'swr'
import { updateCategory } from '@/app/actions/categoryAction'
import { toast } from 'sonner';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { useServerUrl } from '@/hooks/useServerUrl';

interface CategoryEditProps {
    open: boolean;
    title: string;
    description: string;
    itemId: string | number;
    onOpenChange: (isOpen: boolean) => void;
}

export default function CategoryEdit({
    open,
    onOpenChange,
    title,
    description,
    itemId
}: CategoryEditProps) {
    const { mutate } = useSWRConfig()
    const [name, setName] = useState<any>(title);
    const [desc, setDesc] = useState<any>(description);
    const { serverUrl } = useServerUrl();

    const handleSave = async () => {
        // Validate here the items, normally you will be using forms here 
        if(!name || !desc || !itemId) {
            return
        }

        const res = await updateCategory(
            itemId, name, desc, serverUrl
        )

        if(res) {
            mutate(`${serverUrl}/api/categories/get`)
            mutate(`${serverUrl}/api/products/get`)
            toast.success('Category updated successfully')
            onOpenChange(false);
        }else{
            toast.error("Failed to update category.")
        }
    };

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className='bg-[white] w-full xs:w-[400px] sm:w-[540px]'>
                <SheetHeader>
                    <SheetTitle>Edit Item</SheetTitle>
                    <SheetDescription>
                        Make changes to the item here. Click save when you&apos;re done.
                    </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input 
                            id="name" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            className="col-span-3" 
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                            Description
                        </Label>
                        {/* <Input 
                            id="description" 
                            value={desc} 
                            onChange={(e) => setDesc(e.target.value)} 
                            className="col-span-3" 
                        /> */}
                        <Textarea 
                            id="description" 
                            value={desc} 
                            rows={4}
                            onChange={(e) => setDesc(e.target.value)} 
                            className="col-span-3" 
                        />
                    </div>
                </div>
                <SheetFooter className='gap-y-2'>
                    <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button type="button" variant="default" onClick={handleSave}>
                        Save changes
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
