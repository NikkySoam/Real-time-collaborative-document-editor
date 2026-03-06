import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { Navbar } from "./navbar";

export default function Home() {
  return (
   <div className="flex flex-col min-h-screen">
    <div className="fixed top-0 left-0 right-0 z-10 h-16 bg-white p-4">
      <Navbar/>
    </div>
    <div className="mt-16">
    <Button > 
        <a href="/documents/123">Go to Document</a>
    </Button>
    </div>
   </div>
  );
}
