import React from 'react';
import { Button } from "@/components/ui/button";
import { deleteCategory } from '@/app/actions/categoryAction'
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
import { useServerUrl } from '@/hooks/useServerUrl';

interface ConfirmDialogProps {
    id: string|number;
    title: string;
    open: boolean;
    onOpenChange: (isOpen: boolean) => void;
    onConfirm: (id: string|number) => void;
}

export default function CategoryDeleteBtn({
  id,
  title,
  open,
  onOpenChange,
  onConfirm,
}: ConfirmDialogProps) {
    const { mutate } = useSWRConfig()
    const { serverUrl } = useServerUrl();
    
    // Handle confirmation
    const handleConfirm = async () => {
        const result = await deleteCategory(id, serverUrl)

        if(result){
            toast.success('Category deleted successfully')
            onConfirm(id)
            onOpenChange(false)
            mutate(`${serverUrl}/api/categories/get`)
            mutate(`${serverUrl}/api/products/get`)
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
                Are you sure you want to delete the item <span className='font-bold'>{title}</span>? <span className='text-red-500 font-semibold'>All the related products to this category</span> will be also deleted!
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
