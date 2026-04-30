'use client';

import React from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';


interface Props {
  documentId: string;
  onRestore: (content: string) => void;
  currentContent: string
}

function VersionHistory({ documentId, onRestore, currentContent }: Props) {
    const [preview, setPreview] = React.useState<string | null>(null);

    const splitBlocks = (html: string) => {
    return html
        .replace(/<\/(p|h[1-6]|li|blockquote)>/g, "</$1>\n")
        .split("\n")
        .map((b) => b.trim())
        .filter(Boolean);
    };

    const versions = useQuery(api.versions.getVersions, {
        docId: documentId as any,
    });

    if (!versions) {
        return (
        <div className="fixed left-0 top-0 h-full w-80 bg-white shadow-xl border-r z-50 flex items-center justify-center">
            <p className="text-gray-500">Loading versions...</p>
        </div>
        );
    }

          // for commit highlight
        const oldBlocks = splitBlocks(preview || "");
        const newBlocks = splitBlocks(currentContent || "");

        const maxLen = Math.max(oldBlocks.length, newBlocks.length);

        const rows = Array.from({ length: maxLen }, (_, i) => {
        const left = oldBlocks[i] || "";
        const right = newBlocks[i] || "";

        return {
            left,
            right,
            changed: left !== right,
                };
                });

  return (
    <div className="fixed left-0 top-18 h-[80vh] w-80 bg-gray-100 shadow-xl rounded-md border-r z-50 flex flex-col print:hidden">
      
      
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="font-semibold text-lg">Version History</h2>
        <span className="text-sm text-gray-500">
          {versions.length} versions
        </span>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        {versions.length === 0 ? (
          <p className="p-4 text-sm text-gray-500">
            No versions yet
          </p>
        ) : (
          versions.map((v, index) => (
            <div
              key={v._id}
              className={`px-4 py-3 border-b border-gray-300 hover:bg-gray-50 transition ${
                index === 0 ? "bg-blue-50" : ""
              }`}
            >
              
              <p className="text-xs text-gray-500">
                {new Date(v.createdAt).toLocaleString()}
              </p>

                <p className="text-xs text-gray-500">
                <span className='text-gray-700'>Commit By : </span>{v.userName || "Unknown"} 
                </p>

              
              <p className="text-sm font-medium text-gray-800 mt-1">
                {v.message || "Saved version"}
              </p>

             
              {index === 0 && (
                <span className="inline-block mt-1 text-[10px] bg-blue-100 text-blue-600 px-2 py-[2px] rounded">
                  Latest
                </span>
              )}

             
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => onRestore(v.content)}
                  className="text-xs bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Restore
                </button>

                <button
                onClick={() => setPreview(v.content)}
                className="text-xs border px-3 py-1 rounded hover:bg-gray-100"
                >
                Preview
                </button>

                <button
                  className="text-xs border px-3 py-1 rounded hover:bg-gray-100"
                  onClick={() => navigator.clipboard.writeText(v.content)}
                >
                  Copy
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {preview && (
        <div className="fixed right-0 top-18 h-[80vh] w-2/3 p-4  bg-gray-100 rounded-md border-l shadow-xl z-50 flex flex-col">
            
            <div className="flex items-center justify-between border-b px-4 py-3">
            <h2 className="font-semibold text-lg">Changes Preview</h2>

            <button
                onClick={() => setPreview(null)}
                className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-200"
            >
                ✕
            </button>
            </div>

            <div className="flex-1 mt-1 overflow-hidden">
            <div className="grid grid-cols-2 h-full border rounded-lg overflow-hidden bg-gray-50">
                
            {/* LEFT (OLD) */}
            <div className="border-r overflow-hidden">
                <div className="bg-red-50 border-b px-4 py-2 font-semibold text-red-700 flex items-center justify-between">
                <span>Old Version</span>
                </div>

                <div className=" overflow-y-auto no-scrollbar h-full p-3 space-y-3 ">
                {rows.map((row, i) => (
                <div
                    key={i}
                    className={`p-2 ${row.changed ? "border-red-300 bg-red-50" : ""}`}
                >

                    {row.changed && (
                    <span className="text-xs text-gray-500 mb-1 block">
                        Modified
                    </span>
                    )}

                    <div
                    className="prose prose-sm max-w-none "
                    dangerouslySetInnerHTML={{ __html: row.left }}
                    />
                </div>
                ))}
                </div>
            </div>

            {/* RIGHT (NEW) */}
            <div className="overflow-hidden">
                <div className="bg-green-50 border-b px-4 py-2 font-semibold text-green-700 flex items-center justify-between">
                <span>Current Version</span>
                </div>

                <div className=" overflow-y-auto no-scrollbar h-full p-3 space-y-3 ">
                {rows.map((row, i) => (
                <div
                    key={i}
                    className={` p-2 ${
                    row.changed ? "border-green-300 bg-green-50" : ""
                    }`}
                >
                    {row.changed && (
                    <span className="text-xs text-gray-500 mb-1 block">
                        Modified
                    </span>
                    )}
                    <div
                    className="prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: row.right }}
                    />
                </div>
                ))}
                </div>
            </div>

            </div>
            </div>

        </div>
        )}
            </div>
        );
        }

export default VersionHistory;