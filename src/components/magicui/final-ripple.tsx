import { Ripple } from "@/components/magicui/ripple";

export function RippleDemo() {
  return (
    <div className="relative w-full h-[300px] lg:h-[400px] flex flex-col items-center justify-center overflow-hidden rounded-lg bg-muted shadow-inner">
      <p className="z-10 text-center text-4xl lg:text-5xl font-medium tracking-tighter text-white">
        Let's Connect
      </p>
      <Ripple />
    </div>
  );
}