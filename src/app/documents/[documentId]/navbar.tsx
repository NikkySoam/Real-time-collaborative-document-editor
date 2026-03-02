import Image from "next/image"
import Link from "next/link"
import { DocumentInput } from "./document-input"
import { 
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
 } from "@/components/ui/menubar"
import { FileIcon } from "lucide-react"

export const Navbar = ()=>{
    return (
        <nav className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
            <Link href='/'>
                <Image src='/logo.svg' alt="logo" width={32} height={32}/>
            </Link>
            <div className="flex flex-col">
                <DocumentInput/>
                <div className="flex">
                    <Menubar className="border-none bg-transparent shadow-none h-auto p-0 ">
                        <MenubarMenu>
                            <MenubarTrigger>
                                File
                            </MenubarTrigger>
                            <MenubarContent>
                                <MenubarItem>
                                    <FileIcon className="size-4 mr-2"/>
                                    Save
                                </MenubarItem>
                            </MenubarContent>
                        </MenubarMenu>
                   </Menubar>
                </div>
            </div>
            </div>
            
        </nav>
    )
}