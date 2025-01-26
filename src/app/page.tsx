import Index from "@/components/sessions/Index";
import dynamic from 'next/dynamic';

export default () => {
  const Project = dynamic(() => import('@/components/sessions/Project'), {
    ssr: false,
  });

  return (
    <div className="container space-y-20 max-w-5xl">
      <Index />
      <Project />
    </div>
  );
}