import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const API_URL = "https://ipa-boss.onrender.com"; // Replace with your Render URL later

const App = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // --- PROTECTION LOGIC ---
  useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();
    const handleKeyDown = (e) => {
      if (e.keyCode === 123 || (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 67 || e.keyCode === 74)) || (e.ctrlKey && e.keyCode === 85)) {
        e.preventDefault();
      }
    };
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    const interval = setInterval(() => { (function() { return false; }).constructor('debugger').call(); }, 1000);
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      clearInterval(interval);
    };
  }, []);

  // --- FETCH DATA ---
  useEffect(() => {
    const fetchApps = async () => {
      try {
        const response = await fetch(`${API_URL}/apps`);
        const data = await response.json();
        setApps(data);
      } catch (error) {
        console.error("API Offline, using demo data");
        // Remove this demo data if you only want live data
        setApps([{ title: "Esign IPA", description: "Esign IPA Signer install For iOS.", image: "https://ipaomtk.com/wp-content/uploads/2023/03/esign-ipa.jpg", tag: "FEATURED", download_url: "https://t.me/irra_11" }]);
      } finally {
        setLoading(false);
      }
    };
    fetchApps();
  }, []);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white selection:bg-amber-500/30">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-[#0f172a]/90 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between py-3">
          <a href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl overflow-hidden ring-2 ring-white/10 group-hover:ring-amber-500 transition-all">
              <img src="https://i.pinimg.com/736x/b6/36/3a/b6363a1970cfeb3cd725eee9aab9d146.jpg" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <span className="text-xl font-black uppercase tracking-tight">Irra <span className="text-amber-500">Ipa</span></span>
          </a>

          <nav className="hidden md:flex items-center gap-8 font-bold text-xs tracking-widest">
            {['HOME', 'GAMES', 'LIBRARY', 'ABOUT'].map(item => <a key={item} href="#" className="hover:text-amber-500 transition">{item}</a>)}
            <a href="#" className="px-4 py-2 rounded-lg border border-amber-500/50 text-amber-500 hover:bg-amber-500 hover:text-black transition">ADMIN</a>
          </nav>

          <button className="md:hidden text-amber-500" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero */}
        <section className="mb-12 relative overflow-hidden rounded-3xl h-[400px] flex items-end p-8 md:p-12 shadow-2xl">
          <img src="https://ipaomtk.com/wp-content/uploads/2023/03/esign-ipa.jpg" className="absolute inset-0 w-full h-full object-cover opacity-60" alt="Hero" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/20 to-transparent"></div>
          <div className="relative z-10">
            <span className="boss-gradient text-black text-xs font-extrabold px-3 py-1 rounded-full uppercase mb-4 inline-block">Featured App</span>
            <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter">Esign <span className="text-amber-500">IPA</span></h1>
            <a href="https://t.me/irra_11" className="btn-install px-12 py-4 rounded-2xl font-black text-xl inline-block uppercase">Buy Now</a>
          </div>
        </section>

        <h2 className="text-3xl font-black mb-8 flex items-center gap-3">
          <span className="w-2 h-8 boss-gradient rounded-full"></span>
          IPA Library
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full py-20 text-center animate-pulse text-amber-500 font-bold uppercase">Connecting...</div>
          ) : (
            apps.map((app, i) => (
              <div key={i} className="glass-card p-5 rounded-3xl flex items-center gap-5 cursor-pointer">
                <img src={app.image} className="w-20 h-20 rounded-2xl object-cover shadow-lg" alt={app.title} />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg truncate">{app.title}</h3>
                  <p className="text-sm text-gray-400 truncate">{app.description}</p>
                  <p className="text-xs text-amber-500 mt-1 font-bold uppercase tracking-wider">{app.tag}</p>
                </div>
                <button className="btn-install px-4 py-2 rounded-xl text-sm font-black uppercase">INSTALL</button>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
