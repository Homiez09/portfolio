import Index from "@/components/sessions/Index";
import dynamic from 'next/dynamic';
import { Suspense } from "react";

const Project = dynamic(() => import('@/components/sessions/Project'), {
  ssr: false,
});

export default () => {
  return (
    <div className="container space-y-20 max-w-5xl">
      <Index />
      <Project />
    </div>
  );
}