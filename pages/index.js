import Head from 'next/head'
import MySlider from '../components/MySlider'
import { useDispatch, useSelector } from 'react-redux'
import { incNumber, decNumber } from '../src/redux/counter'

export default function Home() {
  const myState = useSelector((state) => state.changeTheNumber)
  const dispatch = useDispatch()

  const features = [
    { title: 'Premium Fabric', desc: 'Ring-spun cotton with a brushed finish — soft from day one, better after every wash.' },
    { title: 'Minimal by Design', desc: 'No loud logos. Clean cuts and considered details that work with everything you own.' },
    { title: 'Crafted to Last', desc: 'Reinforced stitching and colourfast dyes. Built for your wardrobe, not a single season.' },
    { title: 'Free Returns', desc: 'Not the right fit? Return within 30 days, no questions. We make it simple.' },
  ]

  return (
    <>
      <Head>
        <title>eTailEdge — Wear the Code</title>
        <meta name="description" content="Premium minimal clothing for developers and creatives." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
      </Head>

      <div className="bg-white text-neutral-900 min-h-screen" style={{ fontFamily: "'Inter', sans-serif" }}>


        {/* ── HERO ── */}
        <section className="relative min-h-screen flex items-center bg-neutral-50 overflow-hidden">
          {/* subtle texture lines */}
          {/* <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, #000 0px, #000 1px, transparent 1px, transparent 60px)',
            }}
          /> */}

          <div className="max-w-6xl mx-auto px-6 md:px-10 w-full grid md:grid-cols-2 gap-12 items-center pb-20 pt-10">
            {/* left: copy */}
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-[#C9A84C] mb-6 font-medium">
                New Collection — 2024
              </p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.08] tracking-tight text-neutral-900 mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}>
                Dressed<br />
                to <span className="italic text-[#C9A84C]">think.</span>
              </h1>
              <p className="text-base text-neutral-500 max-w-sm leading-relaxed font-light mb-10">
                Premium essentials designed for people who value quality over noise. 
                Minimal cuts. Lasting fabric. Nothing you don&apos;t need.
              </p>
              <div className="flex flex-wrap gap-3">
                <button className="text-xs tracking-widest uppercase font-medium bg-neutral-900 text-white px-8 py-3.5 hover:bg-[#C9A84C] transition-colors duration-300">
                  Browse Collection
                </button>
                <button className="text-xs tracking-widest uppercase font-medium text-neutral-900 border border-neutral-300 px-8 py-3.5 hover:border-neutral-900 transition-colors duration-200">
                  Our Story
                </button>
              </div>
            </div>

            {/* right: accent card */}
            <div className="relative hidden md:block">
              <div className="aspect-[3/4] bg-neutral-200 w-full max-w-sm ml-auto overflow-hidden">
                <img src="/banner.png" alt="eTailEdge collection" className="w-full h-full object-cover" onError={e => e.target.style.display='none'} />
              </div>
              {/* floating tag */}
              <div className="absolute bottom-8 -left-6 bg-white shadow-lg px-5 py-4">
                <p className="text-[0.65rem] tracking-widest uppercase text-neutral-400 mb-0.5">Starting from</p>
                <p className="text-xl font-semibold text-neutral-900" style={{ fontFamily: "'Playfair Display', serif" }}>₹799</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── MARQUEE ── */}
        <div className="overflow-hidden bg-neutral-900 py-3.5">
          <div className="flex gap-16 whitespace-nowrap" style={{ animation: 'marquee 28s linear infinite' }}>
            {Array(2).fill([
              'Free Shipping Over ₹999',
              'New Arrivals Every Month',
              '100% Premium Cotton',
              'Easy 30-Day Returns',
              'Minimal. Considered. Yours.',
            ]).flat().map((item, i) => (
              <span key={i} className="text-[0.7rem] font-light tracking-[0.2em] uppercase text-white shrink-0">
                {item} <span className="text-[#C9A84C] mx-4">·</span>
              </span>
            ))}
          </div>
          <style>{`@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
        </div>

        {/* ── SLIDER / FEATURED ── */}
        <section className="max-w-6xl mx-auto px-6 md:px-10 py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs tracking-[0.25em] uppercase text-[#C9A84C] mb-2 font-medium">Curated for you</p>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                Featured Pieces
              </h2>
            </div>
            <a href="#" className="hidden md:inline text-xs tracking-widest uppercase text-neutral-500 hover:text-neutral-900 transition-colors border-b border-neutral-300 pb-0.5 no-underline">
              View All
            </a>
          </div>
          <MySlider />
        </section>

        {/* ── DIVIDER ── */}
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="h-px bg-neutral-100" />
        </div>

        {/* ── FEATURES ── */}
        <section className="max-w-6xl mx-auto px-6 md:px-10 py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {features.map(({ title, desc }) => (
              <div key={title}>
                <div className="w-8 h-px bg-[#C9A84C] mb-5" />
                <h3 className="text-sm font-medium tracking-wide text-neutral-900 mb-3">{title}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed font-light">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA BAND ── */}
        <section className="bg-neutral-900 px-6 md:px-10 py-20 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-[#C9A84C] mb-5 font-medium">Limited drops. No restock.</p>
          <h2 className="text-4xl md:text-5xl font-semibold text-white leading-tight mb-5 tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Wear what you mean.
          </h2>
          <p className="text-neutral-400 font-light max-w-xs mx-auto mb-10 leading-relaxed text-sm">
            Every piece is made in limited quantities. Once it&apos;s gone, it&apos;s gone.
          </p>
          <button className="text-xs tracking-widest uppercase font-medium bg-[#C9A84C] text-white px-10 py-3.5 hover:bg-white hover:text-neutral-900 transition-colors duration-300">
            Shop the Drop
          </button>
        </section>
      </div>
    </>
  )
}
