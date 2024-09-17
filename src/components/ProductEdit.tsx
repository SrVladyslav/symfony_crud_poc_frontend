import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useSWRConfig } from 'swr';
import { updateProduct } from '@/app/actions/productActions';
import { useServerUrl } from '@/hooks/useServerUrl';
import useCategoriesData from '@/hooks/useCategoriesData';
import { toast } from 'sonner';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle
} from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Category {
    id: number | string;
    name: string;
}

export default function ProductEdit({
    open,
    onOpenChange,
    title,
    description,
    itemId,
    itemCategory,
    price
}: {
    open: boolean,
    onOpenChange: (isOpen: boolean) => void,
    title: string,
    description: string,
    itemId: number,
    itemCategory: number | string,
    price: number // New prop for price
}) {
    const { mutate } = useSWRConfig();
    const { serverUrl } = useServerUrl();
    const { categories, isLoading } = useCategoriesData(serverUrl);

    const [name, setName] = useState<string>(title);
    const [desc, setDesc] = useState<string>(description);
    const [selectedCategory, setSelectedCategory] = useState<string | number>(itemCategory);
    const [productPrice, setProductPrice] = useState<number>(price); 

    const handleUpdate = async () => {
        if (!name || !desc || !selectedCategory || isNaN(productPrice)) {
            toast.error("Please fill in all fields correctly.");
            return;
        }
        const res = await updateProduct(itemId, name, desc, productPrice, parseInt(selectedCategory.toString()), serverUrl)
        console.log(res)
        if (res) {
            toast.success("Product updated successfully.");
            mutate(`${serverUrl}/api/products/get`);
            mutate(`${serverUrl}/api/categories/get`);
            onOpenChange(false); 
        } else {
            toast.error("Failed to update product.");
        }
    };

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className='bg-[white] w-full xs:w-[400px] sm:w-[540px]'>
                <SheetHeader>
                    <SheetTitle>Edit Product</SheetTitle>
                    <SheetDescription>
                        Modify the product details here. Click save when you&apos;re done.
                    </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                    {/* Name Field */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input 
                            id="name" 
                            placeholder="Name" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            className="col-span-3" 
                        />
                    </div>

                    {/* Description Field */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                            Description
                        </Label>
                        <Textarea 
                            id="description" 
                            placeholder="Description" 
                            value={desc} 
                            onChange={(e) => setDesc(e.target.value)} 
                            className="col-span-3" 
                        />
                    </div>

                    {/* Category Selector */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="category" className="text-right">
                            Category
                        </Label>
                        <div className="col-span-3">
                            {isLoading ? (
                                <p>Loading categories...</p>
                            ) : (
                                <Select 
                                    onValueChange={setSelectedCategory}
                                    value={selectedCategory?.toString()}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories && categories.data.length > 0 ? (
                                            categories.data.map((category: Category) => (
                                                <SelectItem key={category.id} value={category.id.toString()}>
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

                    {/* Price Field */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="price" className="text-right">
                            Price
                        </Label>
                        <Input 
                            id="price" 
                            placeholder="Price"
                            type="number" 
                            step="0.01" // Allows for decimal input
                            value={productPrice} 
                            onChange={(e) => setProductPrice(Math.round(parseFloat(e.target.value) * 100) / 100)} 
                            className="col-span-3" 
                        />
                    </div>
                </div>
                
                {/* Footer */}
                <SheetFooter className="gap-y-2">
                    <Button 
                        type="button" 
                        variant="default" 
                        onClick={handleUpdate}
                    >
                        Save changes
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
