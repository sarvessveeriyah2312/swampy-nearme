'use client';

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-amber-950 via-orange-900 to-amber-800 text-white overflow-hidden">
      {/* Decorative glowing auras */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-yellow-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-56 h-56 bg-orange-400/10 rounded-full blur-3xl"></div>

      <div className="relative container mx-auto px-6 py-16">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-center md:text-left items-center">
          {/* Left Column */}
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-yellow-400">Swamiye NearMe</h3>
            <p className="text-amber-100 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
              Discover, announce, and join sacred poojas nearby. Unite devotees in devotion during Mandala Deeksha.
            </p>
          </div>

          {/* Center Mantra Section */}
          <div className="text-center md:text-right">
            <p className="text-3xl sm:text-4xl font-serif text-yellow-300 drop-shadow-[0_0_10px_rgba(255,200,50,0.4)]">
              “Swamiye <span className="text-yellow-400">Saranam</span> Ayyappa”
            </p>
            <p className="text-sm text-amber-200 mt-2">
              May His light guide every devotee toward peace and purity.
            </p>
          </div>
        </div>

        {/* Divider Line */}
        <div className="mt-12 border-t border-amber-700/40" />

        {/* Bottom Bar */}
        <div className="text-center text-sm text-amber-200 mt-6">
          <p>© {new Date().getFullYear()} Swamiye NearMe</p>
          <p className="text-amber-300/80">
            Built with devotion 🕉️ for Ayyappa devotees worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}
