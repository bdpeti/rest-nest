import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Globe, Menu, X, ArrowRight } from 'lucide-react';

// --- Data ---
const masseurs = [
    { id: 1, name: "Kovács Anna", role: "Vezető Masszőr", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400", bio: "Anna több mint 10 éves tapasztalattal rendelkezik a sportmasszázs és a mélyszöveti technikák terén. Specialitása a hátfájás enyhítése." },
    { id: 2, name: "Nagy Gábor", role: "Thai Specialista", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400", bio: "Gábor Thaiföldön tanulta a tradicionális thai masszázs művészetét. A keleti gyógyászat híve." },
    { id: 3, name: "Tóth Eszter", role: "Relaxációs Terapeuta", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400", bio: "Eszter a svédmasszázs és az aromaterápia szakértője. Kezelései a teljes mentális és fizikai ellazulást szolgálják." },
    { id: 4, name: "Szabó Péter", role: "Gyógymasszőr", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400", bio: "Péter rehabilitációs szakember, aki sérülések utáni felépülésben segít sportolóknak és hétköznapi hősöknek egyaránt." },
];

const massages = [
    { id: 101, title: "Svédmasszázs", duration: "60 / 90 perc", img: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&q=80&w=400", desc: "A klasszikus nyugati masszázs, amely ellazítja az izmokat és javítja a vérkeringést. Tökéletes választás első alkalomra." },
    { id: 102, title: "Mélyszöveti", duration: "60 perc", img: "https://images.unsplash.com/photo-1519823551278-64ac927ac4dd?auto=format&fit=crop&q=80&w=400", desc: "Erősebb nyomásokkal dolgozó technika, amely a mélyebb izomrétegeket célozza meg a krónikus feszültség oldására." },
    { id: 103, title: "Aromaterápia", duration: "60 / 90 perc", img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=400", desc: "Illóolajok segítségével végzett gyengéd masszázs, amely a lelki egyensúly helyreállítását segíti." },
    { id: 104, title: "Talpmasszázs", duration: "45 perc", img: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&q=80&w=400", desc: "A reflexzónák stimulálásával hat a belső szervekre és a teljes test energetikai rendszerére." },
];

const prices = [
    { name: "Svédmasszázs (60 perc)", price: "12.000 Ft" },
    { name: "Svédmasszázs (90 perc)", price: "16.000 Ft" },
    { name: "Mélyszöveti (60 perc)", price: "14.000 Ft" },
    { name: "Aromaterápia (60 perc)", price: "13.000 Ft" },
    { name: "Thai Masszázs (90 perc)", price: "18.000 Ft" },
];

// --- Components ---

// Expanding Card Component
const Card = ({ item, setSelectedId, colorClass, borderClass }) => {
    return (
        <motion.div
            layoutId={`card-${item.id}`}
            onClick={() => setSelectedId(item.id)}
            className={`min-w-[280px] h-[400px] md:min-w-[350px] md:h-[500px] relative rounded-3xl overflow-hidden cursor-pointer group border border-zinc-800 ${borderClass} hover:border-opacity-100 border-opacity-30 transition-all duration-300 mr-6 flex-shrink-0 bg-zinc-900`}
            whileHover={{ scale: 1.02, y: -10 }}
        >
            <motion.img
                src={item.img}
                alt={item.name || item.title}
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />

            <div className="absolute bottom-0 left-0 p-8 w-full">
                <motion.h3 className={`text-3xl font-bold uppercase mb-2 ${colorClass}`}>
                    {item.name || item.title}
                </motion.h3>
                <p className="text-zinc-400 font-light text-sm uppercase tracking-widest">
                    {item.role || item.duration}
                </p>
            </div>
        </motion.div>
    );
};

// Expanded Card Modal
const ExpandedCard = ({ item, setSelectedId, type }) => {
    if (!item) return null;

    const isMasseur = type === 'masseur';
    const accentColor = isMasseur ? 'text-lime-400' : 'text-purple-400';
    const btnBg = isMasseur ? 'bg-lime-400 hover:bg-lime-500 text-black' : 'bg-purple-500 hover:bg-purple-600 text-white';

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedId(null)}
        >
            <motion.div
                layoutId={`card-${item.id}`}
                className="bg-zinc-900 w-full max-w-2xl rounded-3xl overflow-hidden relative shadow-2xl border border-zinc-700"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={() => setSelectedId(null)}
                    className="absolute top-4 right-4 z-20 p-2 bg-black/50 rounded-full text-white hover:bg-white hover:text-black transition-colors"
                >
                    <X size={24} />
                </button>

                <div className="flex flex-col md:flex-row h-full">
                    <div className="md:w-1/2 h-64 md:h-auto relative">
                        <img src={item.img} alt={item.name || item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="md:w-1/2 p-8 flex flex-col justify-center">
                        <motion.h2 className={`text-4xl font-bold uppercase mb-2 ${accentColor}`}>
                            {item.name || item.title}
                        </motion.h2>
                        <p className="text-zinc-500 uppercase tracking-widest text-sm mb-6">
                            {item.role || item.duration}
                        </p>
                        <p className="text-zinc-300 leading-relaxed mb-8">
                            {item.bio || item.desc}
                        </p>
                        <a
                            href="#"
                            className={`py-4 px-8 rounded-full font-bold uppercase tracking-wide flex items-center justify-center gap-2 transition-all ${btnBg}`}
                        >
                            {isMasseur ? `Foglalás ${item.name.split(' ')[1]}-hoz` : 'Időpontfoglalás'}
                            <ArrowRight size={18} />
                        </a>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

const Navbar = ({ onMenuClick }) => (
    <nav className="fixed top-0 left-0 w-full z-40 px-6 py-4 flex justify-between items-center mix-blend-difference text-white">
        <button onClick={onMenuClick} className="flex items-center gap-2 group">
            <div className="p-2 border border-zinc-700 rounded-full group-hover:bg-lime-400 group-hover:text-black transition-all">
                <Menu size={20} />
            </div>
            <span className="uppercase font-bold text-sm tracking-widest hidden md:block">Menü</span>
        </button>

        <div className="flex gap-4">
            <button className="p-3 border border-zinc-700 rounded-full hover:bg-lime-400 hover:text-black transition-all">
                <Phone size={20} />
            </button>
            <button className="p-3 border border-zinc-700 rounded-full hover:bg-white hover:text-black transition-all">
                <Globe size={20} />
            </button>
        </div>
    </nav>
);

const MenuOverlay = ({ isOpen, onClose, scrollToSection }) => (
    <AnimatePresence>
        {isOpen && (
            <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed inset-0 z-50 bg-lime-400 text-black flex flex-col justify-center items-center"
            >
                <button onClick={onClose} className="absolute top-6 left-6 p-3 border border-black rounded-full hover:bg-black hover:text-lime-400 transition-all">
                    <X size={24} />
                </button>
                <div className="flex flex-col gap-6 text-center">
                    {['Kezdőlap', 'Masszőreink', 'Masszázsaink', 'Árlista', 'Kapcsolat'].map((item, idx) => (
                        <button
                            key={idx}
                            onClick={() => scrollToSection(item)}
                            className="text-5xl md:text-7xl font-bold uppercase hover:italic transition-all tracking-tighter"
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </motion.div>
        )}
    </AnimatePresence>
);

export default function App() {
    const [selectedMasseur, setSelectedMasseur] = useState(null);
    const [selectedMassage, setSelectedMassage] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const scrollToSection = (sectionName) => {
        setIsMenuOpen(false);
        let id = "";
        if (sectionName === "Kezdőlap") id = "hero";
        if (sectionName === "Masszőreink") id = "staff";
        if (sectionName === "Masszázsaink") id = "services";
        if (sectionName === "Árlista") id = "prices";
        if (sectionName === "Kapcsolat") id = "footer";

        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-zinc-950 text-white selection:bg-lime-400 selection:text-black font-sans">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=Oswald:wght@400;500;700&display=swap');
                
                body {
                    font-family: 'Inter', sans-serif;
                }
                
                h1, h2, h3, .btn-text {
                    font-family: 'Oswald', sans-serif;
                }

                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>

            <Navbar onMenuClick={() => setIsMenuOpen(true)} />
            <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} scrollToSection={scrollToSection} />

            {/* HERO SECTION */}
            <section id="hero" className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
                {/* Background Effect - "Leaf" texture */}
                <div className="absolute inset-0 z-0 opacity-80">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center filter grayscale blur-sm scale-110"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/80 via-transparent to-zinc-950"></div>
                </div>

                <div className="z-10 text-center px-4 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Placeholder Logo */}
                        <div className="mx-auto w-24 h-24 mb-6 border-2 border-lime-400 rounded-full flex items-center justify-center">
                            <span className="text-3xl font-bold text-lime-400 font-serif">Zalán</span>
                        </div>

                        <h1 className="text-7xl md:text-9xl font-bold uppercase tracking-tighter leading-none mb-2 text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-600">
                            RestNest
                        </h1>
                        <p className="text-lime-200 text-lg md:text-xl uppercase tracking-[0.3em] mb-12">
                            Béke a testnek és léleknek egyaránt
                        </p>
                    </motion.div>

                    <div className="flex flex-col md:flex-row gap-6 justify-center w-full">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-10 py-6 bg-lime-400 text-black text-xl font-bold uppercase tracking-widest rounded-none hover:bg-lime-300 transition-colors w-full md:w-auto"
                            onClick={() => alert("Redirect to Reservation System")}
                        >
                            Időpontfoglalás
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-10 py-6 border border-zinc-600 text-white text-xl font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors w-full md:w-auto"
                            onClick={() => scrollToSection("Masszázsaink")}
                        >
                            Masszázsaink
                        </motion.button>
                    </div>
                </div>

                <div className="absolute bottom-10 animate-bounce">
                    <svg className="w-6 h-6 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                </div>
            </section>

            {/* MASSEURS SECTION - Horizontal Scroll */}
            <motion.section
                id="staff"
                className="py-24 pl-6 md:pl-24 border-t border-zinc-900 overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
            >
                <div className="mb-12 flex items-baseline gap-4">
                    <h2 className="text-5xl md:text-7xl font-bold uppercase text-white">
                        Masszőreink
                    </h2>
                    <span className="hidden md:inline-block h-px w-24 bg-lime-400"></span>
                    <span className="text-lime-400 font-mono text-sm uppercase">Ismerje meg csapatunkat</span>
                </div>

                <div className="flex overflow-x-auto pb-12 hide-scrollbar pr-12">
                    {masseurs.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card
                                item={item}
                                setSelectedId={setSelectedMasseur}
                                colorClass="text-lime-400"
                                borderClass="hover:border-lime-400"
                            />
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* MASSAGES SECTION - Horizontal Scroll */}
            <motion.section
                id="services"
                className="py-24 pl-6 md:pl-24 border-t border-zinc-900 overflow-hidden bg-zinc-900/30"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
            >
                <div className="mb-12 flex items-baseline gap-4">
                    <h2 className="text-5xl md:text-7xl font-bold uppercase text-white">
                        Masszázsaink
                    </h2>
                    <span className="hidden md:inline-block h-px w-24 bg-purple-500"></span>
                    <span className="text-purple-400 font-mono text-sm uppercase">Szolgáltatások</span>
                </div>

                <div className="flex overflow-x-auto pb-12 hide-scrollbar pr-12">
                    {massages.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card
                                item={item}
                                setSelectedId={setSelectedMassage}
                                colorClass="text-purple-400"
                                borderClass="hover:border-purple-500"
                            />
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* PRICES SECTION */}
            <motion.section
                id="prices"
                className="py-24 px-6 md:px-24 border-t border-zinc-900 max-w-6xl mx-auto"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
            >
                <div className="flex flex-col md:flex-row gap-12">
                    <div className="md:w-1/3">
                        <h2 className="text-5xl md:text-7xl font-bold uppercase text-white mb-6">Árlista</h2>
                        <p className="text-zinc-400 leading-relaxed">
                            Áraink forintban értendők és tartalmazzák az ÁFA-t. Bérlet vásárlása esetén 10% kedvezményt biztosítunk.
                        </p>
                    </div>
                    <div className="md:w-2/3">
                        <div className="space-y-6">
                            {prices.map((item, index) => (
                                <motion.div
                                    key={index}
                                    className="flex justify-between items-end border-b border-zinc-800 pb-4 hover:border-lime-400 transition-colors group"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <span className="text-xl md:text-2xl font-bold uppercase text-zinc-300 group-hover:text-white transition-colors">{item.name}</span>
                                    <span className="text-xl md:text-2xl font-mono text-lime-400">{item.price}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* FOOTER */}
            <footer id="footer" className="py-12 px-6 border-t border-zinc-900 text-center md:text-left bg-zinc-950">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div>
                        <h3 className="text-2xl font-bold uppercase mb-2">Rest Nest</h3>
                        <p className="text-zinc-500 text-sm">1093 Budapest, Fővám tér 8.</p>
                        <p className="text-zinc-500 text-sm">+36 70 356 5767</p>
                    </div>
                    <div className="flex gap-8 text-sm uppercase tracking-widest text-zinc-400">
                        <a href="#" className="hover:text-lime-400 transition-colors">GDPR</a>
                        <a href="#" className="hover:text-lime-400 transition-colors">Adatkezelés</a>
                        <a href="#" className="hover:text-lime-400 transition-colors">Sütik</a>
                    </div>
                    <div className="text-zinc-600 text-xs">
                        © 2025 Rest Nest. No rights reserved.
                    </div>
                </div>
            </footer>

            {/* Animate Presence for Expanding Cards */}
            <AnimatePresence>
                {selectedMasseur && (
                    <ExpandedCard item={masseurs.find(m => m.id === selectedMasseur)} setSelectedId={setSelectedMasseur} type="masseur" />
                )}
                {selectedMassage && (
                    <ExpandedCard item={massages.find(m => m.id === selectedMassage)} setSelectedId={setSelectedMassage} type="massage" />
                )}
            </AnimatePresence>
        </div>
    );
}