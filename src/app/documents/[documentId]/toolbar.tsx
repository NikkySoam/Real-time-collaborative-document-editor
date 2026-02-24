"use client"

import { type Level } from "@tiptap/extension-heading";
import {SketchPicker, type ColorResult} from "react-color";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import { DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { BoldIcon,
     AlignLeftIcon,
     ChevronDownIcon,
     HighlighterIcon,
     ImageIcon,
     ItalicIcon, 
     Link2Icon, 
     ListTodoIcon,
      LucideIcon,
      MessageSquarePlusIcon,
      PrinterIcon,
      Redo2Icon,
      RemoveFormattingIcon,
      SearchIcon,
      SpellCheckIcon,
      UnderlineIcon,
      Undo2Icon, 
      UploadIcon,
      AlignCenterIcon,
      AlignRightIcon,
      AlignJustifyIcon,
      ListIcon,
      ListOrderedIcon,
      MinusIcon,
      PlusIcon} from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { set } from "date-fns";
import { is } from "date-fns/locale";


const FontSizeButton = ()=>{
    const {editor} = useEditorStore();
    const currentFontSize = editor?.getAttributes('textStyle').fontSize
        ? editor.getAttributes('textStyle').fontSize.replace('px','') : '16';
    
    const [fontSize,setFontSize] = useState(currentFontSize);
    const [inputValue,setInputValue] = useState(fontSize);
    const [isEditing,setIsEditing] = useState(false);

    const updateFontSize = (size:string)=>{
        const newSize = parseInt(size);
        if(!isNaN(newSize) && newSize > 0){
            editor?.chain().focus().setFontSize(`${newSize}px`).run();
            setFontSize(`${newSize}`);
            setInputValue(`${newSize}`);
            setIsEditing(false);
    }
  }
    
  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setInputValue(e.target.value);
  }

  const handleInputBlur = ()=>{
    updateFontSize(inputValue);
  }

  const handleKeyDown = (e:React.KeyboardEvent<HTMLInputElement>)=>{
    if(e.key === "Enter"){
        e.preventDefault();
        updateFontSize(inputValue);  
        editor?.commands.focus();   
    }
}

const increment = ()=>{
    const newSize = parseInt(fontSize)+1;
    updateFontSize(newSize.toString());
}

const decrement = ()=>{
    const newSize = parseInt(fontSize)-1;
    if(newSize > 0){
    updateFontSize(newSize.toString());
    }
}

    return (
      <div className="flex gap-x-0.5 items-center">
        <button 
        onClick={decrement}
        className="h-7 w-7 shrink-0 flex text-sm items-center justify-center text-center bg-transparent rounded-sm">
            <MinusIcon className="size-4"/>
        </button>

        {isEditing ? (
            <input 
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyDown}
            className="h-7 w-10 text-sm text-center border border-neutral-400 bg-transparent rounded-sm focus:outline-none focus:ring-0"
            />
        ) :
        (
            <button 
                onClick={()=>{
                    setIsEditing(true);
                    setFontSize(currentFontSize);
                }}
                className="h-7 w-10 text-sm text-center border border-neutral-400 hover:bg-neutral-200 rounded-sm focus:outline-none focus:ring-0 cursor-text"
            >
                {currentFontSize}
            </button>
        )

        }

        <button 
        className="h-7 w-7 shrink-0 flex text-sm items-center justify-center text-center bg-transparent rounded-sm"
        onClick={increment}>
            <PlusIcon className="size-4"/>
        </button>
        </div>
    )
}


const ListButton = ()=>{
    const {editor} = useEditorStore();
    const lists = [
        {label:'Bullet List', 
            icon:ListIcon,
            onClick:()=> editor?.chain().focus().toggleBulletList().run(),
            isActive: editor?.isActive("bulletList")    
           },
           {
            label:'Ordered List',
            icon:ListOrderedIcon,
            onClick:()=> editor?.chain().focus().toggleOrderedList().run(),
            isActive: editor?.isActive("orderedList")
           }
    ];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                className="h-10 flex-col min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
                 <ListIcon className="size-4"/> 
                 <span className="text-[8px]">Lists</span>
                </button>
                
            </DropdownMenuTrigger>

            <DropdownMenuContent className="p-0 flex flex-col gap-y-1">
                {lists.map(({label,isActive,onClick,icon:Icon})=>(
                    <button key={label}
                     onClick={onClick}
                     className={cn('flex item-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80',
                        isActive && 'bg-neutral-200/80'
                     )}
                    >
                        <Icon className="size-4"/>
                        <span className="text-sm">{label}</span>
                    </button>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}


const AlignButton = ()=>{
    const {editor} = useEditorStore();
    const alignments = [
        {label:'Align Left', value:'left', icon:AlignLeftIcon},
        {label:'Align Center', value:'center', icon:AlignCenterIcon},
        {label:'Align Right', value:'right', icon:AlignRightIcon},
        {label:'Align Justify', value:'justify', icon:AlignJustifyIcon},
    ];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                className="h-10 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
                 <AlignLeftIcon className="size-4"/> 
                 <span className="text-[8px]">Align</span>
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="p-0 flex flex-col gap-y-1">
                {alignments.map(({label,value,icon:Icon})=>(
                    <button key={value}
                     onClick={()=>editor?.chain().focus().setTextAlign(value).run()}
                     className={cn('flex item-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80',
                        editor?.isActive({textAlign:value}) && 'bg-neutral-200/80'
                     )}
                    >
                        <Icon className="size-4"/>
                        <span className="text-sm">{label}</span>
                    </button>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}


const ImageButton = ()=>{
    const {editor} = useEditorStore();
    const [isDialogOpen,setIsDialogOpen] = useState(false);
    const [imageUrl,setImageUrl] = useState("");

    const onChange = (src:string)=>{
        editor?.chain().focus().setImage({src}).run();
    }

    const onUpload = ()=>{
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e)=>{
            const file = (e.target as HTMLInputElement).files?.[0];
            if(file){
                const imageUrl = URL.createObjectURL(file);
                onChange(imageUrl);
            }
        }
        input.click();
    }

    const handleImageUrlSubmit = ()=>{
        if(imageUrl){
            onChange(imageUrl);
            setImageUrl("");
            setIsDialogOpen(false);
        }
    }

    return (
        <>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="h-10 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
                    <ImageIcon className="size-4" />
                    <span className="text-[8px]">image</span>    
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-2.5 flex flex-col gap-x-2">
                <DropdownMenuItem onClick={()=>onUpload()}>
                    <UploadIcon/>
                    Upload
                </DropdownMenuItem>
                <DropdownMenuItem onClick={()=>setIsDialogOpen(true)}>
                    <SearchIcon/>
                    Paste image URL
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Insert Image Url</DialogTitle>
                </DialogHeader>
                <Input placeholder="Enter image url"
                value={imageUrl}
                onChange={(e)=>setImageUrl(e.target.value)}
                onKeyDown={(e)=>{
                    if(e.key === "Enter") {
                        handleImageUrlSubmit();
                    }
                }}
                />
                <DialogFooter>
                <Button onClick={handleImageUrlSubmit}>
                    Insert 
                </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
        </>
    )
}

const LinkButton = ()=>{
    const {editor} = useEditorStore();
    const [value,setValue] = useState("");

    const onChange = (href:string)=>{
        editor?.chain().focus().extendMarkRange('link').setLink({href}).run();
        setValue("");
    }

    return (
        <DropdownMenu onOpenChange={(open)=>{
            if(open){
                setValue(editor?.getAttributes("link").href || "");
            }
        }}>
            <DropdownMenuTrigger asChild>
                <button className="h-10 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
                    <Link2Icon className="size-4" /> 
                    <span className="text-[8px]">Lists</span>   
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-2.5 flex gap-x-2">
                <Input placeholder="https://example.com"
                value={value}
                 onChange={(e)=>{
                    setValue(e.target.value);
                }}/>
                <Button onClick={()=>onChange(value)}>
                    Apply
                </Button>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

const HighlightColorButton = ()=>{
    const {editor} = useEditorStore();
    const value = editor?.getAttributes('highlight').color || '#FFFF00';
    const onChange = (color: ColorResult)=>{
        editor?.chain().focus().setHighlight({color:color.hex}).run();
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
                    <HighlighterIcon className="size-4" />
                    <div className="h-0.5 w-full mt-1" style={{backgroundColor:value}}/>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-0">
                <SketchPicker
                color={value}
                onChange={onChange}/>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
const TextColorButton = ()=>{
    const {editor} = useEditorStore();
    const value = editor?.getAttributes('textStyle').color|| '#000000';
    const onChange = (color: ColorResult)=>{
        editor?.chain().focus().setColor(color.hex).run();
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
                    <span className="text-sm">A</span>
                    <div className="h-0.5 w-full" style={{backgroundColor:value}}/>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-0">
                <SketchPicker
                color={value}
                onChange={onChange}/>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

const HeadingLevelButton = ()=>{
    const {editor} = useEditorStore();
    const headings = [
        {label:'Normal text', value:0, fontSize:'16px'},
        {label:'Heading 1', value:1, fontSize:'32px'},
        {label:'Heading 2', value:2, fontSize:'24px'},
        {label:'Heading 3', value:3, fontSize:'20px'},
        {label:'Heading 4', value:4, fontSize:'18px'},
        {label:'Heading 5', value:5, fontSize:'16px'},
    ];

    const getCurrentHeading = ()=>{
        for(let level=1; level<=5; level++){
            if(editor?.isActive('heading',{level})){
                return `Heading ${level}`;
            }
        }
        return "Normal text";
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                className="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
                  <span className="truncate">
                    {getCurrentHeading()}
                </span>  
                <ChevronDownIcon className="ml-2 size-4 shrink-0"/>
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
                {headings.map(({label,value,fontSize})=>(
                    <button
                    onClick={()=>{
                        if(value===0){
                            editor?.chain().focus().setParagraph().run();
                        }else{
                            editor?.chain().focus().toggleHeading({level:value as Level}).run();
                        }
                    }}
                    key={label}
                    style={{fontSize}} 
                    className={
                    cn('flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80',
                        (value===0 && !editor?.isActive('heading')) || (editor?.isActive("heading",{level:value})) && 'bg-neutral-200/80'
                    )
                }
                    >
                        {label}
                    </button>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

const FontFamilyButton = ()=>{
    const {editor} = useEditorStore();
    const fonts = [
        {label:'Sans', value:'sans-serif'},
        {label:'Serif', value:'serif'},
        {label:'Mono', value:'monospace'},
        {label:'Arial', value:'Arial, sans-serif'},
        {label:'Georgia', value:'Georgia, serif'},
        {label:'Times New Roman', value:'"Times New Roman", Times, serif'}, 
        {label:'Courier New', value:'"Courier New", Courier, monospace'},
        {label:'Verdana', value:'Verdana, sans-serif'},

    ]

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                 className="h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
                    <span className="truncate">
                    {editor?.getAttributes('textStyle').fontFamily || 'Arial'}
                    </span>
                    <ChevronDownIcon className="ml-2 size-4 shrink-0"/>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
            {fonts.map(({label,value})=>(
                <button
                onClick={()=>editor?.chain().focus().setFontFamily(value).run()}
                key={value} className={
                    cn('flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80',
                        editor?.getAttributes('textStyle').fontFamily === value && 'bg-neutral-200/80'
                    )
                }
                style={{fontFamily:value}}>
                    <span className="text-sm">{label}</span>
                </button>
            ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
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
                <FontFamilyButton />
             <Separator orientation="vertical" className="h-6 bg-neutral-300"/>
                <HeadingLevelButton />
             <Separator orientation="vertical" className="h-6 bg-neutral-300"/>
             <FontSizeButton/>
             <Separator orientation="vertical" className="h-6 bg-neutral-300"/>
             {
                sections[1].map((item)=>(
                <ToolbarButton key={item.label} {...item}/>
                ))
             }
             <TextColorButton />
             <HighlightColorButton />
             <Separator orientation="vertical" className="h-6 bg-neutral-300"/>
             <LinkButton/>
             <ImageButton/>
             <AlignButton/>
             {/* lineheight */}
             <ListButton/>
             <Separator orientation="vertical" className="h-6 bg-neutral-300"/>
             {
                sections[2].map((item)=>(
                <ToolbarButton key={item.label} {...item}/>
                ))
             }
             <Separator orientation="vertical" className="h-6 bg-neutral-300"/>

        </div>
    )
}