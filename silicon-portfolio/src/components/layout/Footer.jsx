export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-10 px-6 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">

        <div className="text-center md:text-left">
          <p className="font-mono text-cyan-400 text-sm font-bold tracking-widest">
            ANANDHA KRISHNAN P
          </p>
          <p className="text-gray-500 text-xs mt-1 font-mono">
            VLSI · RTL Design · Embedded Systems · AI Hardware
          </p>
          <p className="text-gray-600 text-xs mt-2 italic">
            "Building the next generation of intelligent silicon systems."
          </p>
        </div>

        <div className="flex gap-6 text-gray-500 text-xs font-mono">
          <a href="https://www.linkedin.com/in/anandha-krishnan-vlsi" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">LinkedIn</a>
          <a href="https://github.com/anandmsak" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">GitHub</a>
          <a href="mailto:anandhperumal27@gmail.com" className="hover:text-cyan-400 transition-colors">Email</a>
        </div>

        <p className="text-gray-600 text-xs font-mono">
          © {new Date().getFullYear()} Anandha Krishnan P
        </p>
      </div>
    </footer>
  );
}