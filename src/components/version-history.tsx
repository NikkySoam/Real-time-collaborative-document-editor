'use client';

import React from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

interface Props {
  documentId: string;
  onRestore: (content: string) => void;
}

function VersionHistory({ documentId, onRestore }: Props) {
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

  return (
    <div className="fixed left-0 top-18 h-[80vh] w-80 bg-gray-200 shadow-xl border-r z-50 flex flex-col">
      
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="font-semibold text-lg">Version History</h2>
        <span className="text-sm text-gray-500">
          {versions.length} versions
        </span>
      </div>

      {/* List */}
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
              {/* Time */}
              <p className="text-xs text-gray-500">
                {new Date(v.createdAt).toLocaleString()}
              </p>

                <p className="text-xs text-gray-500">
                <span className='text-gray-700'>Commit By : </span>{v.userName || "Unknown"} 
                </p>

              {/* Message */}
              <p className="text-sm font-medium text-gray-800 mt-1">
                {v.message || "Saved version"}
              </p>

              {/* Badge for latest */}
              {index === 0 && (
                <span className="inline-block mt-1 text-[10px] bg-blue-100 text-blue-600 px-2 py-[2px] rounded">
                  Latest
                </span>
              )}

              {/* Actions */}
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => onRestore(v.content)}
                  className="text-xs bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Restore
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
    </div>
  );
}

export default VersionHistory;