"use client";
export default function Avatar({
  src,
  alt,
  size = 36,
  fallback,
}: {
  src?: string;
  alt?: string;
  size?: number;
  fallback?: string;
}) {
  const cls = "rounded-full object-cover";
  if (src)
    return (
      <img
        src={src}
        alt={alt || "avatar"}
        width={size}
        height={size}
        className={cls}
      />
    );
  const initials = (fallback || "U").slice(0, 2).toUpperCase();
  return (
    <div
      style={{ width: size, height: size }}
      className="rounded-full bg-gradient-to-br from-rose-300 to-rose-500 text-white grid place-items-center text-xs font-semibold"
      aria-label={alt || "avatar"}
    >
      {initials}
    </div>
  );
}
