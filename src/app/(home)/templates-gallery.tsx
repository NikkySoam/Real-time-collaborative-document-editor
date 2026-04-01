"use client"

import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
 } from "@/components/ui/carousel"

import {cn} from "@/lib/utils";
import { templates } from "@/constants/templates";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

export const TemplatesGallery = ()=>{
    const [isCreating,setIsCreating] = useState(false);
    const router = useRouter();
    const create = useMutation(api.documents.create)

    const onTemplateClick=(title:string,initialContent:string)=>{
        setIsCreating(true);
        create({title,initialContent})
        .catch(()=> toast.error("Something went wrong"))
        .then((documentid)=>{
            router.push(`documents/${documentid}`);
            toast.success("Document created");
        })
        .finally(()=>{
            setIsCreating(false);
        })
    }
 
    return (
        <div className="bg-[#F1F3F4]">
            <div className="max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-y-4">
            <h3 className="text-base font-medium">start a new document</h3>
            <Carousel>
                <CarouselContent>
                    {templates.map((template)=>(
                        <CarouselItem
                         key={template.id}
                         className="basis:1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 2xl:basis-[14.285714%] pl-4"
                         >
                            <div
                            className={cn("aspect-[3/4] flex flex-col gap-y-2.5",
                                isCreating && "pointer-events-none opacity-50"
                            )}
                            >
                                <button
                                disabled={isCreating}
                                //todo: add proper initial content
                                onClick={()=>onTemplateClick(template.label, template.initialContent)}
                                style={{
                                    backgroundImage:`url(${template.imageUrl})`,
                                    backgroundPosition: "center",
                                    backgroundSize: "cover",
                                    backgroundRepeat: "no-repeat"
                                }}
                                className="size-full hover:border-blue-500 rounded-sm border hover:bg-blue-50 transition flex flex-col gap-y-4 justify-center items-center bg-white"
                                />
                                <p className="text-sm font-medium truncate">{template.label}</p>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious/>
                <CarouselNext/>
            </Carousel>
            </div>
        </div>
    )
}