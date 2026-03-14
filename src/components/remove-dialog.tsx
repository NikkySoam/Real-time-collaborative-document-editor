"use client"

import { useState } from "react";
import { useMutation } from "convex/react";
import { Id } from "../../convex/_generated/dataModel"
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";

import { 
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogTrigger,
    AlertDialogFooter,
    AlertDialogHeader,
 } from "@/components/ui/alert-dialog"

 interface removeDialogProps{
    documentId: Id<"documents">;
    children: React.ReactNode;
 }

 export const RemoveDialog = ({documentId,children}:removeDialogProps)=>{
    const remove = useMutation(api.documents.removeById);
    const [isRemoving,setIsRemoving] = useState(false);

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent onClick={(e)=>e.stopPropagation()}>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your document.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={(e)=>e.stopPropagation()}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                    disabled={isRemoving}
                    onClick={(e)=>{
                        e.stopPropagation();
                        setIsRemoving(true);
                        remove({id:documentId})
                        .catch(()=> toast.error("Something went wrong"))
                        .then(()=> toast.success("Document removed"))
                        .finally(()=>setIsRemoving(false));
                    }}
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
 }