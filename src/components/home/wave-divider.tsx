type WaveDividerProps = {
  from?: string;
  to?: string;
  className?: string;
  variant?: "soft" | "medium";
  size?: "sm" | "md" | "lg";
};

const waveHeights = {
  sm: "h-14 sm:h-16",
  md: "h-20 sm:h-24",
  lg: "h-24 sm:h-28 lg:h-32",
};

export function WaveDivider({
  from = "#fafafc",
  to = "#ffffff",
  className,
  size = "sm",
}: WaveDividerProps) {
  const mergedClassName = ["block w-full", waveHeights[size]].filter(Boolean).join(" ");

  const wrapperClassName = ["relative z-[1] -my-px", className].filter(Boolean).join(" ");

  return (
    <div className={wrapperClassName} aria-hidden="true">
      <div
        className={mergedClassName}
        style={{
          background: `linear-gradient(to bottom, ${from} 0 50%, ${to} 50% 100%)`,
        }}
      />
    </div>
  );
}
