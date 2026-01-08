"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import localFont from 'next/font/local';

const tanPearlFont = localFont({
  src: './fonts/TanPearl.otf',
  display: 'swap',
  variable: '--font-tan-pearl',
});

// --- ÍCONES ---
const ICONS = {
  auto: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#1c3a4b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
      <path d="m21 8-2 2-1.5-3.7A2 2 0 0 0 15.646 5H8.4a2 2 0 0 0-1.903 1.257L5 10 3 8"/><path d="M7 14h.01"/><path d="M17 14h.01"/><rect width="18" height="8" x="3" y="10" rx="2"/><path d="M5 18v2"/><path d="M19 18v2"/>
    </svg>
  ),
  viagem: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#1c3a4b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
      <path d="M10.5 17h1.227a2 2 0 0 0 1.345-.52L18 12"/><path d="m12 13.5 3.75.5"/><path d="m3.173 8.18 11-5a2 2 0 0 1 2.647.993L18.56 8"/><path d="M6 10V8"/><path d="M6 14v1"/><path d="M6 19v2"/><rect x="2" y="8" width="20" height="13" rx="2"/>
    </svg>
  ),
  saude: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#1c3a4b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
      <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"/>
    </svg>
  ),
  residencial: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#1c3a4b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
      <path d="M8.62 13.8A2.25 2.25 0 1 1 12 10.836a2.25 2.25 0 1 1 3.38 2.966l-2.626 2.856a.998.998 0 0 1-1.507 0z"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    </svg>
  ),
  rural: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#1c3a4b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
      <path d="M12 3v18M12 5l-2 2m2 0l-2 2m2 0l-2 2M12 5l2 2m-2 0l2 2m-2 0l2 2m-2 0l2 2m-2 0l2 2m-2 0l2 2" />
    </svg>
  ),
  pet: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#1c3a4b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
      <path d="M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z"/><path d="M8 14v.5"/><path d="M16 14v.5"/><path d="M11.25 16.25h1.5L12 17l-.75-.75Z"/>
    </svg>
  ),
  empresarial: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#1c3a4b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
      <path d="M13.5 8h-3"/><path d="m15 2-1 2h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h3"/><path d="M16.899 22A5 5 0 0 0 7.1 22"/><path d="m9 2 3 6"/><circle cx="12" cy="15" r="3"/>
    </svg>
  ),
  condominio: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#1c3a4b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
      <path d="M10 12h4"/><path d="M10 8h4"/><path d="M14 21v-3a2 2 0 0 0-4 0v3"/><path d="M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2"/><path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"/>
    </svg>
  ),
  equipamento: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#1c3a4b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
      <path d="M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8"/><path d="M10 19v-3.96 3.15"/><path d="M7 19h5"/><rect width="6" height="10" x="16" y="12" rx="2"/>
    </svg>
  ),
  transporte: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#1c3a4b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
      <path d="M14 19V7a2 2 0 0 0-2-2H9"/><path d="M15 19H9"/><path d="M19 19h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62L18.3 9.38a1 1 0 0 0-.78-.38H14"/><path d="M2 13v5a1 1 0 0 0 1 1h2"/><path d="M4 3 2.15 5.15a.495.495 0 0 0 .35.86h2.15a.47.47 0 0 1 .35.86L3 9.02"/><circle cx="17" cy="19" r="2"/><circle cx="7" cy="19" r="2"/>
    </svg>
  ),
  odonto: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#1c3a4b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
      <circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/>
    </svg>
  ),
  vida: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#1c3a4b" className="w-8 h-8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
  ),
  civil: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#1c3a4b" className="w-8 h-8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" />
    </svg>
  ),
  bike: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#1c3a4b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
      <circle cx="18.5" cy="17.5" r="3.5"/><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="15" cy="5" r="1"/><path d="M12 17.5V14l-3-3 4-3 2 3h2"/>
    </svg>
  ),
  diversos: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#1c3a4b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
      <path d="M15.686 15A14.5 14.5 0 0 1 12 22a14.5 14.5 0 0 1 0-20 10 10 0 1 0 9.542 13"/><path d="M2 12h8.5"/><path d="M20 6V4a2 2 0 1 0-4 0v2"/><rect width="8" height="5" x="14" y="6" rx="1"/>
    </svg>
  ),
};

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const { current } = carouselRef;
      const firstCard = current.children[0] as HTMLElement;
      // Ajuste de scroll considerando o gap
      const scrollAmount = firstCard ? firstCard.offsetWidth + 24 : current.clientWidth;
      
      current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const seguros = [
    { id: "vida", title: "Vida", icon: ICONS.vida, desc: "Proteção financeira e tranquilidade para quem você mais ama.", link: "https://cgscorretora.seucorretor.digital/#/formularios/vida" },
    { id: "auto", title: "Auto", icon: ICONS.auto, desc: "Cobertura completa, carro reserva e assistência 24h.", link: "https://cgscorretora.seucorretor.digital/#/formularios/auto" },
    { id: "residencial", title: "Residencial", icon: ICONS.residencial, desc: "Segurança para seu lar com assistências emergenciais inclusas.", link: "https://cgscorretora.seucorretor.digital/#/formularios/residencial" },
    { id: "saude", title: "Saúde", icon: ICONS.saude, desc: "Os melhores planos e hospitais para cuidar de você e sua família." },
    { id: "viagem", title: "Viagem", icon: ICONS.viagem, desc: "Viaje o mundo sem preocupações com extravios e despesas médicas.", link: "https://cgscorretora.seucorretor.digital/#/formularios/viagem" },
    { id: "pet", title: "Pet", icon: ICONS.pet, desc: "Planos de saúde completos para cães e gatos." },
    { id: "celular", title: "Celular", icon: ICONS.equipamento, desc: "Proteção contra roubo e danos para portáteis e eletrônicos.", link: "https://cgscorretora.seucorretor.digital/#/formularios/celular" },
    { id: "bike", title: "Bike", icon: ICONS.bike, desc: "Pedale com tranquilidade protegendo sua bicicleta contra roubos.", link: "https://cgscorretora.seucorretor.digital/#/formularios/bike" },
    { id: "odonto", title: "Odonto", icon: ICONS.odonto, desc: "Sorriso saudável com ampla rede credenciada nacional." },
    { id: "empresarial", title: "Empresarial", icon: ICONS.empresarial, desc: "Multirrisco sob medida para empresas de todos os portes.", link: "https://cgscorretora.seucorretor.digital/#/formularios/empresarial" },
    { id: "transportes", title: "Transportes", icon: ICONS.transporte, desc: "Segurança para cargas, embarcadores e transportadoras.", link: "https://cgscorretora.seucorretor.digital/#/formularios/caminhao" },
    { id: "condominio", title: "Condomínio", icon: ICONS.condominio, desc: "Proteção obrigatória para síndicos, moradores e áreas comuns.", link: "https://cgscorretora.seucorretor.digital/#/formularios/condominio" },
    { id: "diversos", title: "Seguros Diversos", icon: ICONS.diversos, desc: "Soluções personalizadas para diferentes tipos de riscos e necessidades.", link: "https://cgscorretora.seucorretor.digital/#/formularios/diversos" },
  ];

  const logosSeguradoras = [
    { src: "/portoo.png", alt: "Porto Seguro" },
    { src: "/bradesco-ladoo.png", alt: "Bradesco Seguros", className: "scale-125" },
    { src: "/zurich-ladoo.png", alt: "Zurich Seguros" },
    { src: "/mapfree.png", alt: "Mapfre" },
    { src: "/suhaii.png", alt: "Suhai" },
    { src: "/azul-ladoo.png", alt: "Azul Seguros", className: "-mt-3" },
  ];

  if (!mounted) return null;

  // Common styles
  const heroBtnStyle = "border border-[#c1a46d]/50 text-[#c1a46d] font-bold px-4 py-2 md:px-6 md:py-2 rounded-full text-[10px] md:text-[11px] hover:bg-[#c1a46d] hover:text-[#1A1612] hover:border-[#c1a46d] transition-all uppercase tracking-[0.25em] active:scale-95 backdrop-blur-sm shadow-sm pointer-events-auto inline-block";
  const cardBtnStyle = "w-full block text-center py-3 rounded-lg font-bold text-[10px] tracking-[0.2em] transition-all bg-[#1c3a4b] text-[#e0d5c3] hover:bg-[#c1a46d] hover:text-[#1c3a4b] uppercase";

  return (
    <main className="min-h-screen bg-[#f2efe9] text-[#1c3a4b] font-sans scroll-smooth relative overflow-x-hidden">
      
      {/* --- HEADER --- */}
      <header className="absolute top-0 left-0 w-full z-40 px-4 md:px-6 py-6 md:py-8 pointer-events-none">
        <div className="max-w-7xl mx-auto flex flex-row items-center justify-between">
          <div className="relative h-14 w-24 md:h-20 md:w-32">
            <Image src="/logoo.png" fill alt="Logo CGS" className="object-contain" priority sizes="(max-width: 768px) 100vw, 33vw" />
          </div>
          <div className="hidden md:flex gap-4">
            <a href="#seguros" className={heroBtnStyle}>Produtos</a>
            <a href="#footer" className={heroBtnStyle}>Contato</a>
          </div>
          <div>
            <a href="#seguros" className={heroBtnStyle}>SIMULE AGORA</a>
          </div>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <video autoPlay muted loop playsInline className="absolute z-0 w-auto min-w-full min-h-full max-w-none object-cover">
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute z-10 w-full h-full bg-black/65"></div>
        <div className="relative z-20 text-center px-4 w-full max-w-7xl pt-10 md:pt-20">
          <span className="text-[#c1a46d] tracking-[0.3em] md:tracking-[0.5em] text-[10px] md:text-xs font-bold uppercase mb-6 md:mb-8 block">
            Especialistas em Proteção Patrimonial
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif text-[#e0d5c3] mb-4 drop-shadow-2xl md:whitespace-nowrap leading-tight">
            O que você quer <span className="italic text-[#c1a46d]">proteger</span> hoje?
          </h1>
        </div>
      </section>

      {/* --- LOGO CAROUSEL --- */}
      <div className="bg-[#c1a46d] h-24 overflow-hidden shadow-2xl relative z-30 flex items-center border-y border-white/20">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-white/25 via-transparent to-black/10 backdrop-blur-[0.5px] pointer-events-none"></div>
        <div className="animate-scroll flex items-center gap-12 md:gap-24 whitespace-nowrap px-6 md:px-10 h-full relative z-10">
          {[...logosSeguradoras, ...logosSeguradoras, ...logosSeguradoras, ...logosSeguradoras].map((logo, i) => (
            <div key={`${i}-${logo.src}`} className={`relative flex-shrink-0 h-10 w-32 md:h-14 md:w-48 flex items-center justify-center group ${logo.className || ''}`}>
              <Image 
                src={logo.src} 
                alt={logo.alt} 
                fill 
                sizes="(max-width: 768px) 128px, 192px" 
                className="object-contain grayscale brightness-0 invert opacity-80 group-hover:grayscale-0 group-hover:brightness-100 group-hover:invert-0 group-hover:opacity-100 transition-all duration-500" 
              />
            </div>
          ))}
        </div>
      </div>

      {/* --- BANNER SECTION (MOBILE COM GUARDA-CHUVA GIGANTE) --- */}
      <section className="relative w-full bg-[#f2efe9]">
        <div className="relative w-full">
          <Image 
            src="/banner-protecao.png" 
            alt="Fundo Proteção CGS" 
            width={1920} 
            height={1080} 
            className="w-full h-[85vh] md:h-auto object-cover object-center block" 
            priority 
          />
          
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-end px-4 text-center pb-20 md:pb-40 overflow-hidden">
            
            {/* --- NOVO: ÍCONE GUARDA-CHUVA GIGANTE (APENAS MOBILE) --- */}
            {/* GIGANTE: w-72 h-72. PUXADO PARA CIMA: -mt-32 */}
            <div className="relative w-72 h-72 md:hidden mb-0 -mt-32 animate-in fade-in slide-in-from-bottom-4 duration-700 pointer-events-none">
                <Image
                    src="/guarda-chuva.png"
                    alt="Proteção CGS"
                    fill
                    className="object-contain drop-shadow-lg"
                />
            </div>

            {/* CGS Text */}
            <h1 className={`${tanPearlFont.className} text-[5rem] md:text-[10rem] leading-none text-[#1c3a4b] tracking-tighter select-none mb-4 md:mb-[-2rem] relative -top-4 md:-top-16 opacity-90`}>
              CGS
            </h1>

            <h2 className="font-serif text-2xl md:text-5xl font-bold text-[#1c3a4b] leading-tight mb-4 drop-shadow-sm relative z-20">
              Há 15 anos cuidando <br /> do seu patrimônio
            </h2>
            
            <p className="font-serif text-sm md:text-xl text-[#1c3a4b] mb-12 font-medium max-w-lg relative z-20">
              3x Indicada à melhor do Brasil pela <span className="italic">Bradesco Seguros</span>
            </p>
            
            <a href="#seguros" className="border-2 border-[#1c3a4b] bg-transparent text-[#1c3a4b] font-bold px-8 py-3 rounded-full text-xs md:text-xs hover:bg-[#1c3a4b] hover:text-[#f2efe9] transition-all uppercase tracking-[0.2em] active:scale-95 shadow-lg relative z-20">
              SIMULE AGORA
            </a>
          </div>
        </div>
      </section>

      {/* --- INSURANCE CARDS --- */}
      <section id="seguros" className="py-16 md:py-24 px-4 md:px-6 max-w-7xl mx-auto scroll-mt-20">
        <div className="relative group">
          <button onClick={() => scroll('left')} className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 z-10 bg-[#1c3a4b] text-[#e0d5c3] p-3 rounded-full shadow-xl hover:bg-[#c1a46d] hover:text-[#1c3a4b] transition-colors hidden md:block">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          
          <div ref={carouselRef} className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {seguros.map((item) => (
              <div key={item.id} className="min-w-[85%] md:min-w-[calc(33.333%-1rem)] snap-center bg-[#faf8f4] p-6 md:p-8 rounded-2xl border border-[#c1a46d]/15 hover:border-[#c1a46d]/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-[#e0d5c3]/30 rounded-xl flex items-center justify-center text-[#1c3a4b] mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-serif font-bold text-[#1c3a4b] mb-2 md:mb-3">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow font-light">{item.desc}</p>
                <div className="mt-auto">
                  <a href={item.link || "https://wa.me/5511994751153"} target="_blank" className={cardBtnStyle}>
                    {item.link ? "COTE AQUI!" : "ENTRE EM CONTATO"}
                  </a>
                </div>
              </div>
            ))}
          </div>

          <button onClick={() => scroll('right')} className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 z-10 bg-[#1c3a4b] text-[#e0d5c3] p-3 rounded-full shadow-xl hover:bg-[#c1a46d] hover:text-[#1c3a4b] transition-colors animate-pulse hover:animate-none hidden md:block">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer id="footer" className="bg-[#1c3a4b] text-[#e0d5c3] py-8 px-6 border-t border-[#c1a46d]/20 text-sm scroll-mt-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="flex flex-col items-start space-y-4">
            <div className="relative w-24 h-14 md:w-28 md:h-16"><Image src="/logoo.png" fill alt="CGS Logo" className="object-contain" sizes="112px" /></div>
            <div className="flex gap-3">
              <a href="https://www.instagram.com/cgscorretora" target="_blank" className="w-8 h-8 rounded-full bg-[#e0d5c3]/10 flex items-center justify-center hover:bg-[#c1a46d] hover:text-[#1c3a4b] transition-colors" aria-label="Instagram">
                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-[#e0d5c3]/10 flex items-center justify-center hover:bg-[#c1a46d] hover:text-[#1c3a4b] transition-colors" aria-label="LinkedIn">
                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="https://wa.me/5511994751153" target="_blank" className="w-8 h-8 rounded-full bg-[#e0d5c3]/10 flex items-center justify-center hover:bg-[#c1a46d] hover:text-[#1c3a4b] transition-colors" aria-label="WhatsApp">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
              <a href="mailto:contato@cgscorretora.com" className="w-8 h-8 rounded-full bg-[#e0d5c3]/10 flex items-center justify-center hover:bg-[#c1a46d] hover:text-[#1c3a4b] transition-colors" aria-label="Email">
                 <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
              </a>
            </div>
          </div>
          <div className="flex flex-col space-y-3">
            <h3 className="text-[#c1a46d] font-bold tracking-widest uppercase mb-1 text-xs">Fale Conosco</h3>
            <div className="text-[#e0d5c3]/80 text-sm">
              <p className="hover:text-[#c1a46d] transition-colors cursor-pointer mb-2">contato@cgscorretora.com</p>
              <p className="leading-relaxed">Atendimento Digital <br /> São Paulo, SP</p>
            </div>
            <p className="text-[#c1a46d] font-bold text-base">+55 11 99475-1153</p>
          </div>
          <div className="flex flex-col space-y-3">
            <h3 className="text-[#c1a46d] font-bold tracking-widest uppercase mb-1 text-xs">Novidades</h3>
            <p className="text-xs text-[#e0d5c3]/60 mb-2">Cadastre-se para receber novidades.</p>
            <div className="relative">
              <input type="email" placeholder="Seu E-mail" className="w-full bg-[#e0d5c3]/10 text-[#e0d5c3] border border-[#e0d5c3]/20 px-3 py-2 rounded text-sm focus:outline-none focus:border-[#c1a46d] placeholder-[#e0d5c3]/40" />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 text-[#c1a46d] hover:text-[#1c3a4b] transition-colors" aria-label="Enviar">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-[#c1a46d]/10 flex justify-center items-center text-[10px] text-[#e0d5c3]/40">
          <p>© 2025 CGS Corretora. Todos os direitos reservados.</p>
        </div>
      </footer>
    </main>
  );
}