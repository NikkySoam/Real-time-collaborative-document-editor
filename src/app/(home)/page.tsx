"use client";
import { usePaginatedQuery } from "convex/react";
import { Navbar } from "./navbar";
import { TemplatesGallery } from "./templates-gallery";
import { api } from "../../../convex/_generated/api";
import { DocumentTable } from "./documents-table";
import { useSearchParam } from "@/hooks/use-search-params";

export default function Home() {
  const [search] = useSearchParam();
  const {results,loadMore,status} = usePaginatedQuery(api.documents.get, {search}, {initialNumItems:5}); //bracket for other args

  return (
   <div className="flex flex-col min-h-screen">
    <div className="fixed top-0 left-0 right-0 z-10 h-16 bg-white p-4">
      <Navbar/>
    </div>
    <div className="mt-16">
    <TemplatesGallery/>
    <DocumentTable
    documents={results}
    loadMore={loadMore}
    status={status}
    />
    </div>
   </div>
  )
}
