import HorizontalRule from "@/components/HorizontalRule";
import Index from "@/components/sessions/Index";
import Project from "@/components/sessions/Project";
import Work from "@/components/sessions/Work";
import { Icon } from "@iconify/react/dist/iconify.js";

export default () => {
  return (
    <div className="container space-y-20 max-w-5xl">
      <Index />
      {/* <HorizontalRule icon={<Icon icon="ic:baseline-work" width={36} height={36} style={{color: "#d1d5db"}} />} /> */}
      {/* <Work /> */}
      {/* <HorizontalRule icon={<Icon icon="ic:baseline-work" width={36} height={36} style={{color: "#d1d5db"}} />} /> */}
      <Project />
    </div>
  );
}
