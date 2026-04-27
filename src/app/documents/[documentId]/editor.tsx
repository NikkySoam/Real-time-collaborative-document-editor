'use client'
import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import Table from '@tiptap/extension-table'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import Image from '@tiptap/extension-image'
import ImageResize from 'tiptap-extension-resize-image'
import Underline from '@tiptap/extension-underline'
import TextStyle from '@tiptap/extension-text-style'
import FontFamily from '@tiptap/extension-font-family' 
import {Color} from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align'
import { FontSizeExtension } from '@/extensions/font-size'
import { LineHeightExtension } from '@/extensions/line-height'
import { useLiveblocksExtension } from "@liveblocks/react-tiptap";

import { Ruler } from './ruler'

import { useEditorStore } from '@/store/use-editor-store'
import { Threads } from './threads'
import { useStorage } from '@liveblocks/react'
import { LEFT_MARGIN_DEFAULT, RIGHT_MARGIN_DEFAULT } from '@/constants/margins'

// for version control
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useParams } from "next/navigation";

import VersionHistory from '@/components/version-history';



interface editorProps{
  initialContent?: string | undefined;
}

function Editor({initialContent}: editorProps) {
    const liveblocks = useLiveblocksExtension({
      initialContent,
      offlineSupport_experimental:true
    })
    const {setEditor} = useEditorStore();

    const leftMargin = useStorage((root)=> root.leftMargin) ?? LEFT_MARGIN_DEFAULT;
    const rightMargin = useStorage((root)=> root.rightMargin) ?? RIGHT_MARGIN_DEFAULT;

    const editor = useEditor({
      onCreate({editor}){
        setEditor(editor);
      },
      onDestroy(){
        setEditor(editor);
      },
      onUpdate({editor}){
        setEditor(editor);
      },
      onSelectionUpdate({editor}){
        setEditor(editor);
      },
      onTransaction({editor}){
        setEditor(editor);
      },
      onFocus({editor}){
        setEditor(editor);
      },
      onBlur({editor}){
        setEditor(editor);
      },
      onContentError({editor}){
        setEditor(editor);
      },
    editorProps:{
        attributes:{
            style:`padding-left:${leftMargin}px; padding-right:${rightMargin}px;`,
            class: 'focus:outline-none print:border-0 bg-white border border-[#C7C7C7] flex flex-col min-h-[1054px] w-[816px] pt-10 pb-10 pr-14 cursor-text'
        }
    },
    extensions: [
        liveblocks,
        StarterKit.configure({
          history:false,
        }),
        Link.configure({
            openOnClick: false,
            autolink: true,
            defaultProtocol: 'https'
        }),
        Color, 
        Highlight.configure({ multicolor: true }),
        TextAlign.configure({
        types: ['heading', 'paragraph'],
        }),
        LineHeightExtension.configure({
        types: ['paragraph', 'heading'],
        defaultLineHeight: 'normal',
        }),
        TextStyle,
        FontSizeExtension,
        FontFamily,
        Underline,
        Table,
        TableHeader,
        TableRow,
        TableCell,
        TaskItem.configure({
        nested: true,
      }),
      TaskList,
      Image,
      ImageResize,
    ],
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
  })


  const params = useParams();
  const documentId = params.documentId as string;
  const saveVersion = useMutation(api.versions.saveVersion);
  const [message, setMessage] = React.useState("");

  const handleSaveVersion = async () => {
  if (!editor) return;

  const content = editor.getHTML(); // snapshot
  try {
    await saveVersion({
      docId: documentId as any,
      content,
      message: message || "Manual save",
    });
    setMessage("");
  } catch (err) {
    console.error("Error saving version", err);
  }
};

const handleRestore = (content: string) => {
  if (!editor) return;

  editor.commands.setContent(content);
};

const [showHistory, setShowHistory] = React.useState(false);


  return (
    <div className='size-full flex flex-col items-center overflow-x-auto bg-[#F9FBFD] px-4 print:p-0 print:bg-white print:overflow-visible'>
          {/* version control UI */}
          <div className="py-1 flex gap-2 ">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter commit message"
              className="border outline-none px-2 py-1 rounded"
            />
           {/* commit button  */}
          <button
            onClick={handleSaveVersion}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            Commit
          </button>

          {/* Toggle History Button */}
          <button
            onClick={() => setShowHistory((prev) => !prev)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            {showHistory ? "Hide Commits" : "Show Commits"}
          </button>
        </div>

       {showHistory && (
          <VersionHistory
            documentId={documentId}
            onRestore={handleRestore}
          />
        )}

      <Ruler/>
    <div className='min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0'>
      <EditorContent editor={editor} />
      <Threads editor={editor}/>
    </div>
    </div>
  )
}

export default Editor
