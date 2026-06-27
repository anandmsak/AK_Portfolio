export default function Button({ children, variant = "primary", href, onClick, className = "" }) {
  const base = "inline-flex items-center gap-2 px-6 py-3 rounded-xl font-mono text-sm font-semibold transition-all duration-300";

  const variants = {
    primary: "bg-cyan-400 text-black hover:bg-cyan-300 hover:shadow-lg hover:shadow-cyan-400/30",
    outline: "border border-white/30 text-white hover:border-cyan-400 hover:text-cyan-400 hover:bg-cyan-400/5",
    ghost:   "text-cyan-400 hover:bg-cyan-400/10",
  };

  const cls = `${base} ${variants[variant]} ${className}`;

  if (href) return <a href={href} className={cls} target={href.startsWith("http") ? "_blank" : "_self"} rel="noopener noreferrer">{children}</a>;
  return <button onClick={onClick} className={cls}>{children}</button>;
}