"use client"
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import { BoldIcon, ItalicIcon, ListTodoIcon, LucideIcon,MessageSquareIcon,MessageSquarePlusIcon,PrinterIcon,Redo2Icon,RemoveFormattingIcon,SpellCheckIcon,UnderlineIcon,Undo2Icon } from "lucide-react";



interface ToolbarButtonProps{
    onClick:()=>void;
    isActive?:boolean;
    icon: LucideIcon;
};

const ToolbarButton = ({
    onClick,
    isActive,
    icon: Icon,
}:ToolbarButtonProps)=>{
    return (
        <button
        onClick={onClick}
        className={
            cn("text-sm flex items-center justify-center h-7 min-w-7 rounded-sm hover:bg-neutral-200/80",
                isActive && "bg-neutral-200/80" 
            )
        }>
            <Icon className='size-4' />
        </button>
    )
}

export const Toolbar = () =>{
    const {editor} = useEditorStore();
    const sections : {
        label:string;
        onClick:()=>void;
        isActive?:boolean;
        icon: LucideIcon;
    } [][] = [
        [
            {
                label:'undo',
                onClick:()=> editor?.chain().focus().undo().run(),
                icon:Undo2Icon,
            },
            {
                label:'redo',
                icon:Redo2Icon,
                onClick : ()=> editor?.chain().focus().redo().run(),
            },
            {
                label:'print',
                icon:PrinterIcon,
                onClick : ()=> window.print(),
            },
            {
                label:'spellCheck',
                icon:SpellCheckIcon,
                onClick :()=> {
                    const current = editor?.view.dom.getAttribute("spellcheck");
                    editor?.view.dom.setAttribute("spellcheck", current==='false' ? 'true' : 'false');
                },
            },
        ],
        [
            {
                label:'Bold',
                icon: BoldIcon,
                isActive: editor?.isActive('bold'),
                onClick:()=> editor?.chain().focus().toggleBold().run(),
            },
            {
                label:'Italic',
                icon: ItalicIcon,
                isActive: editor?.isActive('italic'),
                onClick:()=> editor?.chain().focus().toggleItalic().run(),
            },
            {
                label:'Underline',
                icon: UnderlineIcon,
                isActive: editor?.isActive('underline'),
                onClick:()=> editor?.chain().focus().toggleUnderline().run(),
            },
        ],
        [
            {
                label: 'Comment',
                icon: MessageSquarePlusIcon,
                onClick:()=> console.log('comment'),
                isActive:false //late add functionality
            },
            {
                label: 'List Todo',
                icon: ListTodoIcon,
                isActive: editor?.isActive('taskList'),
                onClick:()=> editor?.chain().focus().toggleTaskList().run(),
            },
            {
                label: 'Remove Formatting',
                icon: RemoveFormattingIcon,
                onClick:()=> editor?.chain().focus().unsetAllMarks().clearNodes().run(),
            }
            

        ]
    ]
    return (
        <div className="bg-[#F1F4F9] px-2.5 py-1 rounded-[24px] flex items-center min-h-[40px] gap-x-0.5 overflow-x-auto ">
            {
                sections[0].map((item)=>(
                <ToolbarButton key={item.label} {...item}/>
                ))
            }
             <Separator orientation="vertical" className="h-6 bg-neutral-300"/>
             {/* font family */}
             <Separator orientation="vertical" className="h-6 bg-neutral-300"/>
             {/* heading */}
             <Separator orientation="vertical" className="h-6 bg-neutral-300"/>
             {/* font size */}
             <Separator orientation="vertical" className="h-6 bg-neutral-300"/>
             {
                sections[1].map((item)=>(
                <ToolbarButton key={item.label} {...item}/>
                ))
             }
             {/* text color */}
             {/* highlightcolor */}
             <Separator orientation="vertical" className="h-6 bg-neutral-300"/>
             {/* link */}
             {/* image */}
             {/* align */}
             {/* lineheight */}
             {/* list */}
             {
                sections[2].map((item)=>(
                <ToolbarButton key={item.label} {...item}/>
                ))
             }
             <Separator orientation="vertical" className="h-6 bg-neutral-300"/>

        </div>
    )
}