interface HorizontalRuleProps {
    icon: React.ReactNode
}

export default function HorizontalRule(props: HorizontalRuleProps) {
    return (
        <div className="flex flex-col justify-center w-full">
        <hr className="relative border border-gray-300" />
        <div className="absolute flex flex-cols items-center justify-center w-12 h-12 border-2 self-center rounded-full border-gray-300 bg-white hover:scale-105">
          {props.icon}
        </div>
      </div>
    );
}