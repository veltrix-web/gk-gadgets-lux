export default function Logo({ className = '' }: { className?: string }) {
  return (
    <img
      src="/images/gkgadgetslux-logo-horizontal-dark.avif"
      alt="GK Gadgets Lux"
      className={`h-8 w-auto object-contain ${className}`}
    />
  );
}
