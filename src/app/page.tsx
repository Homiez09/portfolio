import { CardListSkeleton } from "@/components/project/CardList";
import Index from "@/components/sessions/Index";
import Project from "@/components/sessions/Project";
import { Suspense } from "react";

export default () => {
  return (
    <div className="container space-y-20">
      <Index />
      <Suspense>
        <Project />
      </Suspense>
    </div>
  );
}