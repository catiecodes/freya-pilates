import Link from "next/link";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "outline" | "gold";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
};

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  type = "button",
  disabled = false,
  className = "",
}: ButtonProps) {
  const base =
    "inline-block text-[11px] tracking-[0.2em] uppercase font-sans transition-colors duration-200 px-8 py-3.5 cursor-pointer";
  const variants = {
    primary: "bg-olive text-white hover:bg-olive-dark",
    outline:
      "border border-olive text-olive hover:bg-olive hover:text-white",
    gold: "bg-gold text-white hover:bg-gold-dark",
  };

  const classes = `${base} ${variants[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
}
