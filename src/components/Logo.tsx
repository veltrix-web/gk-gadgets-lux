export default function Logo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative grid h-8 w-8 place-items-center rounded-[10px] bg-zinc-900 font-heading text-[11px] font-extrabold text-white">
        GK
        <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-accent ring-2 ring-white" />
      </div>
      <span className="font-heading text-[17px] font-extrabold tracking-tight text-zinc-900">
        Gadgets Lux
      </span>
    </div>
  );
}
