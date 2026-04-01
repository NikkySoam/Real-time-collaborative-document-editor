import React, { useRef, useState } from 'react';
import { useMutation } from 'convex/react';
import { useDebounce } from '@/hooks/use-debounce';
import { toast } from 'sonner';
import { ClientSideSuspense, useStatus } from '@liveblocks/react';
 
import { Id } from '../../../../convex/_generated/dataModel';
import { api } from '../../../../convex/_generated/api';

import { BsCloudCheck } from 'react-icons/bs';
import { LoaderIcon } from 'lucide-react';

interface DocumentInputProps{
    title: string;
    id: Id<"documents">;
}
export const DocumentInput = ({title, id}: DocumentInputProps)=>{
    return (
        <ClientSideSuspense fallback={null}>
            <DocumentInp title={title} id={id}/>
        </ClientSideSuspense>
    )
}


 const DocumentInp=({title, id}: DocumentInputProps)=>{
    const status = useStatus()
    const [value, setValue] = useState(title);
    const [isEditing, setIsEditing] = useState(false);
    const [isPending, setIsPending] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);

    const mutate = useMutation(api.documents.renameById);

    const debounceUpdate = useDebounce((newValue:string)=>{
        if(newValue===title) return;

        setIsPending(true);
        mutate({id, title:newValue})
            .then(()=> toast.success("Document updated"))
            .catch(()=> toast.error("Something went wrong"))
            .finally(()=> setIsPending(false))
    })


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        setIsPending(true);
        mutate({id, title: value})
            .then(()=>{
                 toast.success("Document updated");
                 setIsEditing(false);
    })
            .catch(()=> toast.error("Something went wrong"))
            .finally(()=> setIsPending(false))
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const newValue = e.target.value;
        setValue(newValue);
        debounceUpdate(newValue)
    }

    const showLoader = isPending || status === "connecting" || status === "reconnecting";
    const showError = status === "disconnected";

    return (
        <div className="flex items-center gap-2">
            {isEditing ? (
                <form onSubmit={handleSubmit} className='relative w-fit max-w-[50ch]'>
                    <span className='invisible whitespace-pre px-1.5 text-lg'>
                        {value || " "}
                    </span>
                    <input
                        ref={inputRef}
                        value={value}
                        onChange={onChange}
                        onBlur={()=> setIsEditing(false)}
                        className='absolute inset-0 text-lg text-black bg-transparent truncate'
                    />
                </form>
            ): (

            <span
             onClick={()=>{
                setIsEditing(true);
                setTimeout(()=>{
                    inputRef.current?.focus();
                },0)
             }}
             className="text-lg px-1.5 cursor-pointer truncate"
             >
               {title} 
            </span>
            )}
            {showError && <BsCloudCheck className='size-4'/>}
            {!showLoader && !showError && <BsCloudCheck className='size-4'/>}
            {showLoader && <LoaderIcon className='size-4 animate-spin text-muted-foreground'/>}
            
        </div>
    )
}