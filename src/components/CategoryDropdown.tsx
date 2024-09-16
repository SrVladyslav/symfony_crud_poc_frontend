import React, {useState} from "react";

import { Button } from "@/components/ui/button"
import CategoryDeleteBtn from '@/components/CategoryDeleteBtn'
import CategoryEdit from '@/components/CategoryEdit'
import { SlOptions } from "react-icons/sl";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function CategoryDropdown({
    itemId,
    itemName,
    itemDescription
}:{itemId:number, itemName:string, itemDescription:string}) {
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);

    const handleUpdate=()=>{
        console.log('update')
        setOpenEdit(true)
    }

    const handleDelete=()=>{
        console.log('delete')
        setOpen(true)
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-[3] w-[3] m-0 p-0">
                    <SlOptions className="min-h-3 min-w-3"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-50 pointer-cursor" align="end">
                <DropdownMenuGroup>
                <DropdownMenuItem onClick={handleUpdate}>
                    Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDelete}>
                    Delete
                </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
            <CategoryDeleteBtn 
                id={itemId} 
                title={itemName}
                open={open} 
                onOpenChange={()=>{setOpen(false)}} 
                onConfirm={()=>{}}
            />
            <CategoryEdit
                open={openEdit} 
                onOpenChange={()=>{setOpenEdit(false)}} 
                title={itemName}
                description={itemDescription}
                itemId={itemId}
            />
        </DropdownMenu>
    )
}
