import React from 'react'
import Editor from './editor';
import { Toolbar } from './toolbar';
interface documentIdProps{
  params:Promise<{documentId:string}>
}

async function DocumentIdPage({params}:documentIdProps) {
  const {documentId} = await params;
  return (
    <div className='min-h-screen bg-[#FAFBFD]'>
      <Toolbar/>
      <Editor/>
    </div>
  )
}

export default DocumentIdPage

