"use client"

import { useState } from "react";
import { useMutation } from "convex/react";
import { Id } from "../../convex/_generated/dataModel"
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";


 interface renameDialogProps{
    documentId: Id<"documents">;
    initialTitle:string;
    children: React.ReactNode;
 }

 export const RenameDialog = ({documentId,initialTitle,children}:renameDialogProps)=>{
    const rename = useMutation(api.documents.renameById);
    const [isRenaming,setIsRenaming] = useState(false);

    const [title,setTitle] = useState(initialTitle);
    const [open, setOpen] = useState(false);

    const onSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setIsRenaming(true);

        rename({id:documentId, title: title.trim() || "Untitled"})
        .catch(()=> toast.error("Something went wrong"))
        .then(()=> toast.success("Document renamed"))
        .finally(()=>{
            setIsRenaming(false);
            setOpen(false);
        })

    }

    return (
       <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            {children}
        </DialogTrigger>
        <DialogContent onClick={(e)=> e.stopPropagation()}>
            <form onSubmit={onSubmit}>
                <DialogHeader>
                    <DialogTitle>Rename document</DialogTitle>
                    <DialogDescription>
                        Enter a new name for this document
                    </DialogDescription>
                </DialogHeader>
                <div className="my-4">
                    <Input
                    placeholder="Document name"
                    value={title}
                    onClick={(e)=> e.stopPropagation()}
                    onChange={(e)=> setTitle(e.target.value)}
                    />
                </div>
                <DialogFooter>
                    <Button
                    type="button"
                    variant="ghost"
                    disabled={isRenaming}
                    onClick={(e)=>{
                        e.stopPropagation();
                        setOpen(false)
                    }}
                    >
                        Cancel
                    </Button>
                    <Button 
                    type="submit"
                    disabled={isRenaming}
                    onClick={(e)=>e.stopPropagation()}
                    >
                        Save
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
       </Dialog>
    )
 }