import React from 'react';
import { Button } from "@/components/ui/button";
import { deleteProduct } from '@/app/actions/productActions'
import { useSWRConfig } from "swr"
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ConfirmDialogProps {
    id: string|number;
    title: string;
    open: boolean;
    onOpenChange: (isOpen: boolean) => void;
    onConfirm: (id: string|number) => void;
}

export default function ProductDeleteBtn({
  id,
  title,
  open,
  onOpenChange,
  onConfirm,
}: ConfirmDialogProps) {
    const { mutate } = useSWRConfig()
    
    // Handle confirmation
    const handleConfirm = async () => {
        const result = await deleteProduct(id)

        if(result){
            toast.success('Product deleted successfully')
            onConfirm(id)
            onOpenChange(false)
            mutate(`${process.env.NEXT_PUBLIC_API_URL}/api/categories/get`)
            mutate(`${process.env.NEXT_PUBLIC_API_URL}/api/products/get`)
            return
        }
        console.log("failed ")
    };

    // Handle cancellation
    const handleCancel = () => {
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px] bg-[white]">
            <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
                Are you sure you want to delete the item <span className='font-bold'>{title}</span>?
            </DialogDescription>
            </DialogHeader>
            <DialogFooter>
            <Button type="button" variant="outline" onClick={handleCancel}>
                No
            </Button>
            <Button type="button" variant="destructive" onClick={handleConfirm}>
                Yes
            </Button>
            </DialogFooter>
        </DialogContent>
        </Dialog>
    );
}
