"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Zap,
  Feather,
  Maximize2,
  Lock,
  Radio,
  Navigation,
  Shield,
  Activity,
  Check,
  Phone,
  ArrowRight,
  Plane,
  Sparkles,
  Waves,
  Layers,
  Award,
  Smartphone,
} from "lucide-react";

export default function MantaBrochureSections() {
  const [activeHoldMode, setActiveHoldMode] = useState<"grip" | "ring">("grip");

  return (
    <div className="w-full bg-[#4A505B] text-white selection:bg-[#ef0e0a] selection:text-white">

      <section className="relative w-full overflow-hidden bg-[#4A505B]">
        <div className="relative w-full h-[420px] sm:h-[540px]">
          <img
            src="/manta/evo/evo_img_23.jpg"
            alt="TakeOff Evo Power Flow Travel"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent" />
          <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-10 sm:pb-14">
            <span className="text-[#d4f828] font-bold tracking-widest text-xs uppercase mb-2">
              TakeOff Evo System
            </span>
            <h2 className="text-5xl sm:text-7xl font-black tracking-tight leading-none text-white uppercase">
              Power<br />
              Flow<br />
              Travel
            </h2>
          </div>
        </div>

        <div className="h-1.5 w-full bg-[#d4f828]" />

        <div className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-[#4A505B]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4f828]/20 text-[#d4f828] text-xs font-semibold tracking-wide">
                <Sparkles className="w-3.5 h-3.5" /> Next-Gen Architecture
              </div>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
                Integrated Modular Ecosystem
              </h3>
              <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
                Designed entirely in-house from high-strength anodized aluminum and carbon composites. 
                The TakeOff Evo combines an ultra-compact hull chassis, swappable high-output power cells, 
                a zero-drag performance motor, and real-time biometric telemetry in a single harmonized platform.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-4 rounded-2xl bg-[#383D47] border border-white/10 shadow-md">
                  <div className="text-2xl font-black text-[#d4f828]">3,500 W</div>
                  <div className="text-xs text-gray-300">Peak Motor Power</div>
                </div>
                <div className="p-4 rounded-2xl bg-[#383D47] border border-white/10 shadow-md">
                  <div className="text-2xl font-black text-[#d4f828]">4.5 kg</div>
                  <div className="text-xs text-gray-300">Lightest Setup</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col items-center">
              <div className="w-full p-6 sm:p-8 rounded-3xl bg-[#383D47] border border-white/10 shadow-xl flex flex-col items-center">
                <img
                  src="/manta/evo/takeoff_evo_unit_bottom.png"
                  alt="TakeOff Evo Hull, Motor & Remote Architecture"
                  className="w-full max-w-lg h-auto object-contain drop-shadow-2xl"
                />
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full pt-6">
                  <div className="text-center p-2.5 rounded-xl bg-[#2e323b] border border-white/10">
                    <div className="w-2 h-2 rounded-full bg-[#d4f828] mx-auto mb-1.5" />
                    <span className="text-[11px] font-bold text-gray-200">Performance Motor</span>
                  </div>
                  <div className="text-center p-2.5 rounded-xl bg-[#2e323b] border border-white/10">
                    <div className="w-2 h-2 rounded-full bg-[#d4f828] mx-auto mb-1.5" />
                    <span className="text-[11px] font-bold text-gray-200">Remote Control</span>
                  </div>
                  <div className="text-center p-2.5 rounded-xl bg-[#2e323b] border border-white/10">
                    <div className="w-2 h-2 rounded-full bg-[#d4f828] mx-auto mb-1.5" />
                    <span className="text-[11px] font-bold text-gray-200">Evo Main Unit</span>
                  </div>
                  <div className="text-center p-2.5 rounded-xl bg-[#2e323b] border border-white/10">
                    <div className="w-2 h-2 rounded-full bg-[#d4f828] mx-auto mb-1.5" />
                    <span className="text-[11px] font-bold text-gray-200">Evo Air Battery</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-[#383D47]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10">
            <img
              src="/manta/evo/flate_img_436_800x531.png"
              alt="Manta Foils Team at AWSI Hood River 26"
              className="w-full h-[320px] sm:h-[480px] object-cover object-top"
            />
            <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-medium text-gray-300 border border-white/10">
              📸 Downwind Deck — AWSI Hood River 26
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-4">
                <img
                  src="/takeoff-evo/20-e1755000699578.png"
                  alt="20 Years Heritage"
                  className="h-16 w-auto object-contain"
                />
                <div>
                  <span className="text-[#ef0e0a] font-bold text-xs uppercase tracking-widest">
                    Heritage &amp; Innovation
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                    Twenty years of foils, in one system
                  </h2>
                </div>
              </div>

              <div className="space-y-4 text-gray-200 text-sm sm:text-base leading-relaxed">
                <p>
                  Manta Foils has been designing foils since before most riders had heard of them. 
                  Our founder Renaud Barbier built his first kitefoil prototype in 2002, produced 
                  some of the first commercial kitefoils in 2011, then launched one of the first 
                  aluminium foils, the first inflatable foil board, early wings and early eFoils. 
                  Foil, board, motor, battery, electronics, software: for more than 20 years almost 
                  every part has been designed in-house. The TakeOff Evo is where all of that comes together.
                </p>
                <p>
                  It is the lightest and most compact Foil Assist we have built, and one of the most 
                  powerful on the market. Its fully enclosed motor delivers 3,500 W and needs almost 
                  no care: rinse it for a few seconds and ride again. No spray, no rusting parts, no 
                  bearings to replace. That power is what lets you ride smaller wings and smaller boards, 
                  and gets heavier riders flying.
                </p>
                <p>
                  The batteries decide how you ride. A light Air battery for effortless pumping and hard 
                  carving. Bigger Ultra &amp; Endurance batteries for long sessions in the waves or in eFoil mode. 
                  Plug them together for up to 1200 Wh. And because each Air pack stays under 100 Wh, 
                  the Evo is still the only Foil Assist you can fly with carrying several batteries. 
                  Your holiday does not stop after one session.
                </p>
                <p>
                  The remote has riding profiles and gears to make the first sessions easier and the later 
                  ones faster, with GPS tracking of every ride in the Manta app.
                </p>
                <p className="font-semibold text-white">
                  Most of what is in the Evo came from riders telling us what they wanted. Keep telling us.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-3">
              <div className="p-4 rounded-2xl bg-[#4A505B] border border-white/10 hover:border-[#d4f828]/50 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#d4f828]/20 flex items-center justify-center text-[#d4f828] shrink-0 font-bold">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">True power (3500W motor)</h4>
                    <p className="text-xs text-gray-300">Catch faster waves, ride smaller gear, take off faster</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#4A505B] border border-white/10 hover:border-[#d4f828]/50 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#d4f828]/20 flex items-center justify-center text-[#d4f828] shrink-0 font-bold">
                    <Feather className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Light setup, from 4.5 kg only</h4>
                    <p className="text-xs text-gray-300">Better carving and effortless pumping</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#4A505B] border border-white/10 hover:border-[#d4f828]/50 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#d4f828]/20 flex items-center justify-center text-[#d4f828] shrink-0 font-bold">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Unique enclosed motor</h4>
                    <p className="text-xs text-gray-300">Low maintenance — 10-second fresh water rinse</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#4A505B] border border-white/10 hover:border-[#d4f828]/50 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#d4f828]/20 flex items-center justify-center text-[#d4f828] shrink-0 font-bold">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Multiple battery combinations</h4>
                    <p className="text-xs text-gray-300">From 194 to 1200 Wh across 7 configurations</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#4A505B] border border-white/10 hover:border-[#d4f828]/50 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#d4f828]/20 flex items-center justify-center text-[#d4f828] shrink-0 font-bold">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Remote with riding profiles &amp; gears</h4>
                    <p className="text-xs text-gray-300">10 progressive gears for easy progression</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#4A505B] border border-white/10 hover:border-[#d4f828]/50 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#d4f828]/20 flex items-center justify-center text-[#d4f828] shrink-0 font-bold">
                    <Navigation className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">GPS remote &amp; mobile app</h4>
                    <p className="text-xs text-gray-300">Track wave count, session speed and global leaderboards</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full py-24 px-4 sm:px-6 lg:px-8 bg-[#4A505B] overflow-hidden border-t border-white/10">
        <div className="max-w-7xl mx-auto space-y-14">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[#d4f828] font-bold text-xs uppercase tracking-widest">
              Direct Drive Hybrid Architecture
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
              Revolutionary Motor System
            </h2>
            <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
              The Evo features a revolutionary hybrid motor — setting a new standard in motor design 
              and performance. It&apos;s all about power, responsiveness and convenience. It comes 
              standard with our <strong className="text-white">new motor pod V2</strong>, and a{" "}
              <strong className="text-white">2-blade aluminum propeller</strong>.
            </p>
          </div>

          <div className="relative rounded-3xl p-8 sm:p-14 bg-[#383D47] border border-white/10 overflow-hidden shadow-2xl">
            <div className="absolute right-6 top-6 sm:top-1/2 sm:-translate-y-1/2 select-none pointer-events-none opacity-20 sm:opacity-30">
              <div className="text-6xl sm:text-8xl lg:text-9xl font-black tracking-tighter text-transparent" style={{ WebkitTextStroke: "2px #d4f828" }}>
                3500W
              </div>
              <div className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-transparent" style={{ WebkitTextStroke: "2px #d4f828" }}>
                35kg thrust
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-7 flex justify-center">
                <img
                  src="/takeoff-evo/Motor-Design-v2-e1763024913324.webp"
                  alt="TakeOff Evo Motor Design V2"
                  className="w-full max-w-lg object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="lg:col-span-5 space-y-6">
                <div className="p-6 rounded-2xl bg-[#4A505B] border border-white/10 space-y-2 shadow-md">
                  <div className="text-xs font-bold text-[#d4f828] uppercase tracking-wider">01 / Performance</div>
                  <h3 className="text-2xl font-black text-white">Most Powerful</h3>
                  <p className="text-gray-200 text-sm leading-relaxed">
                    It delivers 50% more power enabling higher top speeds &amp; lets you ride smaller foils or boards, and catch faster waves.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#4A505B] border border-white/10 space-y-2 shadow-md">
                  <div className="text-xs font-bold text-[#d4f828] uppercase tracking-wider">02 / Maintenance</div>
                  <h3 className="text-2xl font-black text-white">Care Free</h3>
                  <p className="text-gray-200 text-sm leading-relaxed">
                    With the fully enclosed design, a 10 sec water rinse is enough. There is no rotor to pull and wash, or bearings to care about.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#4A505B] border border-white/10 space-y-2 shadow-md">
                  <div className="text-xs font-bold text-[#d4f828] uppercase tracking-wider">03 / Flexibility</div>
                  <h3 className="text-2xl font-black text-white">Swappable Power Cables</h3>
                  <p className="text-gray-200 text-sm leading-relaxed">
                    The power cable can now be unplugged from the motor, to swap easily between assist and eFoil riding. Different lengths of cables are available for each application.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full py-24 px-4 sm:px-6 lg:px-8 bg-[#383D47] border-t border-white/10">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-[#ef0e0a] font-bold text-xs uppercase tracking-widest">
              Modular Power Architecture
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
              Flexible Battery Options
            </h2>
            <p className="text-gray-200 text-sm sm:text-base">
              The Evo main unit supports 4 battery types, for the ultimate freedom of use. From 194 to 1200 Wh capacity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-[#4A505B] border border-white/10 flex flex-col justify-between hover:border-[#d4f828] shadow-md transition-all">
              <div className="space-y-2">
                <span className="px-2.5 py-1 rounded-full bg-[#d4f828]/20 text-[#d4f828] text-[10px] font-bold tracking-wider uppercase">
                  Air Travel Approved
                </span>
                <h3 className="text-2xl font-black text-white">AIR 194WH</h3>
                <p className="text-xs text-gray-300">Ultra-light 2.5 kg pack designed for quick sessions &amp; flight carry-on.</p>
              </div>
              <div className="py-6 flex justify-center">
                <img
                  src="/takeoff-evo/1-air-battery-icon-e1763375532478.webp"
                  alt="Air Battery"
                  className="h-28 object-contain"
                />
              </div>
              <div className="text-xs text-[#d4f828] font-bold">15 – 20 min ride time</div>
            </div>

            <div className="p-6 rounded-3xl bg-[#4A505B] border border-white/10 flex flex-col justify-between hover:border-[#d4f828] shadow-md transition-all">
              <div className="space-y-2">
                <span className="px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-bold tracking-wider uppercase">
                  14S More Boost &amp; Efficiency
                </span>
                <h3 className="text-2xl font-black text-white">ULTRA 450WH</h3>
                <p className="text-xs text-gray-300">High-voltage 14S performance for fast wave takeoffs and pumping.</p>
              </div>
              <div className="py-6 flex justify-center">
                <img
                  src="/takeoff-evo/STR-Batteries.webp"
                  alt="Ultra 450 Battery"
                  className="h-28 object-contain"
                />
              </div>
              <div className="text-xs text-[#d4f828] font-bold">40 – 45 min ride time</div>
            </div>

            <div className="p-6 rounded-3xl bg-[#4A505B] border border-white/10 flex flex-col justify-between hover:border-[#d4f828] shadow-md transition-all">
              <div className="space-y-2">
                <span className="px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-400 text-[10px] font-bold tracking-wider uppercase">
                  14S More Boost &amp; Efficiency
                </span>
                <h3 className="text-2xl font-black text-white">ULTRA 600WH</h3>
                <p className="text-xs text-gray-300">Extended-range 14S pack for deep offshore downwind runs.</p>
              </div>
              <div className="py-6 flex justify-center">
                <img
                  src="/takeoff-evo/Both-batteries-with-name-and-Air-travel.webp"
                  alt="Ultra 600 Battery"
                  className="h-28 object-contain"
                />
              </div>
              <div className="text-xs text-[#d4f828] font-bold">55 – 60 min ride time</div>
            </div>

            <div className="p-6 rounded-3xl bg-[#4A505B] border border-white/10 flex flex-col justify-between hover:border-[#d4f828] shadow-md transition-all">
              <div className="space-y-2">
                <span className="px-2.5 py-1 rounded-full bg-[#ef0e0a]/20 text-[#ef0e0a] text-[10px] font-bold tracking-wider uppercase">
                  Starter Pack
                </span>
                <h3 className="text-2xl font-black text-white">ENDURANCE 518WH</h3>
                <p className="text-xs text-gray-300">The high-capacity daily workhorse for long surf sessions &amp; eFoil.</p>
              </div>
              <div className="py-6 flex justify-center">
                <img
                  src="/takeoff-evo/1-endurance-battery-icon-e1763375717151.webp"
                  alt="Endurance Battery"
                  className="h-28 object-contain"
                />
              </div>
              <div className="text-xs text-[#d4f828] font-bold">45 – 50 min ride time</div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-6 w-1 bg-[#d4f828] rounded-full" />
              <h3 className="text-2xl font-black text-white">Customization, like never before.</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-[#4A505B] border border-white/10 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-white text-base">1x Air</span>
                  <span className="text-xs font-bold text-[#d4f828]">194 Wh</span>
                </div>
                <div className="text-xs text-gray-300 space-y-1">
                  <div>Ride time : <strong className="text-white">15 – 20 min</strong></div>
                  <div>Weight : <strong className="text-white">2.5 kg + 2.0 kg motor</strong></div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#4A505B] border border-white/10 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-white text-base">2x Air</span>
                  <span className="text-xs font-bold text-[#d4f828]">388 Wh</span>
                </div>
                <div className="text-xs text-gray-300 space-y-1">
                  <div>Ride time : <strong className="text-white">35 – 40 min</strong></div>
                  <div>Weight : <strong className="text-white">4.1 kg + 2.0 kg motor</strong></div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#4A505B] border border-white/10 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-white text-base">1x Endurance</span>
                  <span className="text-xs font-bold text-[#d4f828]">518 Wh</span>
                </div>
                <div className="text-xs text-gray-300 space-y-1">
                  <div>Ride time : <strong className="text-white">45 – 50 min</strong></div>
                  <div>Weight : <strong className="text-white">4.7 kg + 2.0 kg motor</strong></div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#4A505B] border border-white/10 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-white text-base">1x Ultra 450</span>
                  <span className="text-xs font-bold text-[#d4f828]">450 Wh</span>
                </div>
                <div className="text-xs text-gray-300 space-y-1">
                  <div>Ride time : <strong className="text-white">40 – 45 min</strong></div>
                  <div>Weight : <strong className="text-white">4.3 kg + 2.0 kg motor</strong></div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#4A505B] border border-white/10 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-white text-base">2x Ultra 450</span>
                  <span className="text-xs font-bold text-[#d4f828]">900 Wh</span>
                </div>
                <div className="text-xs text-gray-300 space-y-1">
                  <div>Ride time : <strong className="text-white">80 – 90 min</strong></div>
                  <div>Weight : <strong className="text-white">7.7 kg + 2.0 kg motor</strong></div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#4A505B] border border-white/10 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-white text-base">1x Ultra 600</span>
                  <span className="text-xs font-bold text-[#d4f828]">600 Wh</span>
                </div>
                <div className="text-xs text-gray-300 space-y-1">
                  <div>Ride time : <strong className="text-white">55 – 60 min</strong></div>
                  <div>Weight : <strong className="text-white">4.3 kg + 2.0 kg motor</strong></div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#4A505B] border border-white/10 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-white text-base">2x Ultra 600</span>
                  <span className="text-xs font-bold text-[#d4f828]">1200 Wh</span>
                </div>
                <div className="text-xs text-gray-300 space-y-1">
                  <div>Ride time : <strong className="text-white">110 – 120 min</strong></div>
                  <div>Weight : <strong className="text-white">7.7 kg + 2.0 kg motor</strong></div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative rounded-3xl p-8 sm:p-10 bg-[#2e323b] border border-blue-500/20 overflow-hidden shadow-xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-wider">
                  <Plane className="w-4 h-4" /> Global Airline Travel Ready
                </div>
                <h4 className="text-2xl sm:text-3xl font-black text-white">
                  Air Travel — How much can you travel with?
                </h4>
                <p className="text-gray-200 text-sm max-w-xl">
                  Because each individual Air pack is strictly under 100 Wh (97 Wh each), you can legally carry up to 16 packs on commercial passenger airlines according to IATA regulations.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#383D47] border border-white/10 text-center shrink-0 shadow-md">
                <div className="text-3xl sm:text-4xl font-black text-[#d4f828]">
                  4 sessions at 388 Wh
                </div>
                <div className="text-xs text-gray-300 mt-1">16x packs 97 Wh allowed on commercial flights</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full py-24 px-4 sm:px-6 lg:px-8 bg-[#4A505B] overflow-hidden border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative max-w-md w-full">
                <img
                  src="/takeoff-evo/Narrower-1.png"
                  alt="TakeOff Evo Ultra Light Slim Wireframe"
                  className="w-full h-auto object-contain drop-shadow-[0_0_30px_rgba(212,248,40,0.2)]"
                />
              </div>
            </div>

            <div className="lg:col-span-6 space-y-8">
              <div className="space-y-3">
                <span className="text-[#d4f828] font-bold text-xs uppercase tracking-widest">
                  Aerodynamic Form Factor
                </span>
                <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                  Ultra Light. Slim.
                </h2>
                <p className="text-gray-200 text-base leading-relaxed">
                  We redesigned everything to make the Evo our lightest foil assist kit. By minimizing lateral resistance and optimizing hydrodynamic water displacement, touchdowns cause zero deceleration.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-6 rounded-3xl bg-[#383D47] border border-white/10 space-y-3 hover:border-[#d4f828] shadow-md transition-all">
                  <div className="w-12 h-12 rounded-2xl bg-[#d4f828]/20 flex items-center justify-center text-[#d4f828]">
                    <Feather className="w-6 h-6" />
                  </div>
                  <div className="text-3xl font-black text-white">4.5 kg</div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    It is an ultra-light setup with the lightest configuration at <strong className="text-white">only 4.5 kg</strong>.
                  </p>
                </div>

                <div className="p-6 rounded-3xl bg-[#383D47] border border-white/10 space-y-3 hover:border-[#d4f828] shadow-md transition-all">
                  <div className="w-12 h-12 rounded-2xl bg-[#d4f828]/20 flex items-center justify-center text-[#d4f828]">
                    <Maximize2 className="w-6 h-6" />
                  </div>
                  <div className="text-3xl font-black text-white">13 cm</div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    With the fully redesigned batteries, the Evo main unit is <strong className="text-white">only 13 cm wide</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full h-[360px] sm:h-[500px] overflow-hidden">
        <img
          src="/manta/evo/evo_img_23.jpg"
          alt="Ocean wave foiling with TakeOff Evo"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#4A505B] via-transparent to-[#4A505B]" />
      </section>

      <section className="relative w-full py-24 px-4 sm:px-6 lg:px-8 bg-[#4A505B] border-t border-white/10">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-[#d4f828] font-bold text-xs uppercase tracking-widest">
              Smart Rider Interface
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
              Handheld Remote
            </h2>
            <p className="text-gray-200 text-sm sm:text-base">
              Crystal-clear OLED telemetry, instant response trigger, 10 gear levels, and onboard GPS wave tracking.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 space-y-4">
              <div className="p-5 rounded-2xl bg-[#383D47] border border-white/10 shadow-md">
                <h4 className="font-extrabold text-white text-base flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#d4f828]" /> Battery Monitoring
                </h4>
                <p className="text-xs text-gray-300 mt-1">
                  Monitor individual battery cell health, remaining capacity, and voltage from your remote.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#383D47] border border-white/10 shadow-md">
                <h4 className="font-extrabold text-white text-base flex items-center gap-2">
                  <Zap className="w-4 h-4 text-[#d4f828]" /> Gears System
                </h4>
                <p className="text-xs text-gray-300 mt-1">
                  Limit your maximum power output with 10 customizable gear levels for controlled wave catching.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#383D47] border border-white/10 shadow-md">
                <h4 className="font-extrabold text-white text-base flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-[#d4f828]" /> GPS Enabled
                </h4>
                <p className="text-xs text-gray-300 mt-1">
                  Log your riding sessions, max speed, total distance, and wave count automatically.
                </p>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center py-6">
              <div className="relative max-w-xs w-full">
                <img
                  src="/takeoff-evo/Remote_final-e1761842600154.webp"
                  alt="TakeOff Evo Handheld GPS Remote"
                  className="w-full h-auto object-contain drop-shadow-[0_0_40px_rgba(212,248,40,0.15)]"
                />
              </div>
            </div>

            <div className="lg:col-span-4 space-y-4">
              <div className="p-5 rounded-2xl bg-[#383D47] border border-white/10 shadow-md">
                <h4 className="font-extrabold text-white text-base flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#d4f828]" /> Rider Profiles
                </h4>
                <p className="text-xs text-gray-300 mt-1">
                  Set customizable profiles from gentle beginner cruise to hyper-aggressive advanced punch.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#383D47] border border-white/10 shadow-md">
                <h4 className="font-extrabold text-white text-base flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#d4f828]" /> Instant Lock
                </h4>
                <p className="text-xs text-gray-300 mt-1">
                  The remote auto-locks after a preset time and can be instantly locked at the press of a button to prevent accidental injury due to trigger operation.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#383D47] border border-white/10 shadow-md">
                <h4 className="font-extrabold text-white text-base flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-[#d4f828]" /> App Connectivity
                </h4>
                <p className="text-xs text-gray-300 mt-1">
                  With the Mobile app, compete with riders from across the globe on community leaderboards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full py-24 px-4 sm:px-6 lg:px-8 bg-[#383D47] border-t border-white/10">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[#ef0e0a] font-bold text-xs uppercase tracking-widest">
                Hands-Free Freedom for Wings
              </span>
              <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                Finger Remote
              </h2>
              <p className="text-xl font-bold text-[#d4f828]">
                Keep both hands free to grab a wing while still controlling your motor.
              </p>
              <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
                Designed for wing foil and para wing sessions, the TakeOff Evo helps you learn at your own pace, extend your range, and ride with greater freedom.
              </p>

              <div className="pt-2">
                <h4 className="text-xs font-black uppercase tracking-wider text-gray-300 mb-3">
                  Two Ways to Hold It:
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setActiveHoldMode("grip")}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      activeHoldMode === "grip"
                        ? "bg-[#4A505B] border-[#d4f828] text-white shadow-lg"
                        : "bg-[#2e323b] border-white/10 text-gray-300 hover:border-white/30"
                    }`}
                  >
                    <div className="font-extrabold text-sm">HANDHELD GRIP</div>
                    <div className="text-xs text-gray-300 mt-1">Traditional palm &amp; index trigger control</div>
                  </button>

                  <button
                    onClick={() => setActiveHoldMode("ring")}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      activeHoldMode === "ring"
                        ? "bg-[#4A505B] border-[#d4f828] text-white shadow-lg"
                        : "bg-[#2e323b] border-white/10 text-gray-300 hover:border-white/30"
                    }`}
                  >
                    <div className="font-extrabold text-sm">FINGER RING</div>
                    <div className="text-xs text-gray-300 mt-1">Hands-free dual boom / wing handle hold</div>
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 flex justify-center">
              <div className="relative max-w-md w-full bg-[#4A505B] rounded-3xl p-8 border border-white/10 flex flex-col items-center shadow-xl">
                <div className="text-center mb-4">
                  <span className="text-xs font-bold text-[#d4f828] tracking-widest uppercase">
                    OLED Integrated Telemetry
                  </span>
                </div>
                <img
                  src="/takeoff-evo/STR-Remote.webp"
                  alt="TakeOff Evo Finger Remote"
                  className="w-full max-w-sm object-contain drop-shadow-2xl"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-[#4A505B] border border-white/10 text-center space-y-2 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#d4f828]/20 text-[#d4f828] flex items-center justify-center mx-auto">
                <Radio className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-white text-sm">HANDS-FREE CONTROL</h4>
              <p className="text-xs text-gray-300">Ride naturally with full wing grip</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#4A505B] border border-white/10 text-center space-y-2 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#d4f828]/20 text-[#d4f828] flex items-center justify-center mx-auto">
                <Waves className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-white text-sm">WINGFOIL &amp; PARA-WING</h4>
              <p className="text-xs text-gray-300">Focus on flying and trimming</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#4A505B] border border-white/10 text-center space-y-2 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#d4f828]/20 text-[#d4f828] flex items-center justify-center mx-auto">
                <Activity className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-white text-sm">CONFIDENCE &amp; PROGRESSION</h4>
              <p className="text-xs text-gray-300">Helps you step up effortlessly</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#4A505B] border border-white/10 text-center space-y-2 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#d4f828]/20 text-[#d4f828] flex items-center justify-center mx-auto">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-white text-sm">PUSH YOUR LIMITS</h4>
              <p className="text-xs text-gray-300">Unlock previously unrideable winds</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 rounded-3xl overflow-hidden">
            <div className="relative h-64 sm:h-80 overflow-hidden rounded-2xl border border-white/10">
              <img
                src="/manta/evo/flate_img_977_800x390.png"
                alt="Wing foil session with TakeOff Evo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative h-64 sm:h-80 overflow-hidden rounded-2xl border border-white/10">
              <img
                src="/manta/evo/flate_img_980_800x390.png"
                alt="Para wing surfing on hydrofoil"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="text-center font-bold text-gray-200 text-sm tracking-wide">
            Experience more freedom on the water.
          </div>
        </div>
      </section>

      <section className="relative w-full py-24 px-4 sm:px-6 lg:px-8 bg-[#4A505B] border-t border-white/10">
        <div className="max-w-7xl mx-auto space-y-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <img
                src="/manta/backpack/hero.jpg"
                alt="Manta Universal Backpack"
                className="w-full h-auto object-cover"
              />
            </div>

            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4f828]/20 text-[#d4f828] text-xs font-semibold">
                Universal Accessory
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                MANTA BACKPACK
              </h2>
              <p className="text-xl font-bold text-gray-100">
                Universal backpack for foil assist kits.
              </p>
              <p className="text-gray-200 text-sm leading-relaxed">
                Carry your power pack on your back for an ultra-light board feel. Eliminates hull swing weight, dramatically accelerates early flight, and works seamlessly with all leading brands.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-[#383D47] border border-white/10 shadow-md">
                  <div className="text-[#d4f828] font-bold text-sm">Universally Compatible</div>
                  <div className="text-xs text-gray-300 mt-1">Works with Manta &amp; Foil Drive kits</div>
                </div>
                <div className="p-4 rounded-2xl bg-[#383D47] border border-white/10 shadow-md">
                  <div className="text-[#d4f828] font-bold text-sm">Board Weightless Feel</div>
                  <div className="text-xs text-gray-300 mt-1">Zero hull drag and maximum agility</div>
                </div>
                <div className="p-4 rounded-2xl bg-[#383D47] border border-white/10 shadow-md">
                  <div className="text-[#d4f828] font-bold text-sm">Floating &amp; Comfortable</div>
                  <div className="text-xs text-gray-300 mt-1">Ergonomic shoulder harness &amp; buoyancy</div>
                </div>
                <div className="p-4 rounded-2xl bg-[#383D47] border border-white/10 shadow-md">
                  <div className="text-[#d4f828] font-bold text-sm">Perfect Signal</div>
                  <div className="text-xs text-gray-300 mt-1">Uninhibited transmission through carbon</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="h-56 rounded-2xl overflow-hidden border border-white/10">
              <img
                src="/manta/evo/evo_img_81.jpg"
                alt="Backpack foil jump"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="h-56 rounded-2xl overflow-hidden border border-white/10">
              <img
                src="/manta/evo/evo_img_82.jpg"
                alt="Backpack wave cruising"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="h-56 rounded-2xl overflow-hidden border border-white/10">
              <img
                src="/manta/evo/evo_img_83.jpg"
                alt="Backpack surf foiling"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full py-24 px-4 sm:px-6 lg:px-8 bg-[#383D47] border-t border-white/10">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[#d4f828] font-bold text-xs uppercase tracking-widest">
                Universal Mast Clamping
              </span>
              <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                Universal Motor Pod V3
              </h2>
              <p className="text-xl font-bold text-gray-100">
                Get ready to ride in seconds.
              </p>
              <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
                A smart universal design that fits any mast and keeps your motor mounted on the back of the pod. Less time assembling. More time riding.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-[#4A505B] border border-white/10 text-center shadow-sm">
                  <div className="text-lg font-black text-[#d4f828]">30 SEC</div>
                  <div className="text-[11px] text-gray-200">Quickest Assembly</div>
                </div>
                <div className="p-3 rounded-xl bg-[#4A505B] border border-white/10 text-center shadow-sm">
                  <div className="text-lg font-black text-[#d4f828]">REAR MOUNT</div>
                  <div className="text-[11px] text-gray-200">Motor On Back</div>
                </div>
                <div className="p-3 rounded-xl bg-[#4A505B] border border-white/10 text-center shadow-sm">
                  <div className="text-lg font-black text-[#d4f828]">ANY MAST</div>
                  <div className="text-[11px] text-gray-200">Universal Fit</div>
                </div>
                <div className="p-3 rounded-xl bg-[#4A505B] border border-white/10 text-center col-span-2 sm:col-span-3 shadow-sm">
                  <div className="text-xs font-bold text-white">TWO GRIP RUBBER SIZES &bull; 3500W PERFORMANCE MOTOR READY</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 flex justify-center">
              <img
                src="/takeoff-evo/STR-Motor.webp"
                alt="Universal Motor Pod V3"
                className="w-full max-w-md object-contain drop-shadow-2xl"
              />
            </div>
          </div>

          <div className="p-8 sm:p-12 rounded-3xl bg-[#4A505B] border border-white/10 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-3">
                <span className="px-2.5 py-1 rounded-full bg-[#ef0e0a]/20 text-[#ef0e0a] text-xs font-bold uppercase tracking-wider">
                  Schools &amp; Cruising Safety
                </span>
                <h3 className="text-3xl font-black text-white">eFoil Motor with Prop Guard</h3>
                <p className="text-gray-200 text-sm leading-relaxed">
                  Full 360-degree circumferential duct shielding for commercial foil schools and recreational eFoiling.
                </p>
                <div className="flex items-center gap-4 pt-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-white">
                    <Check className="w-4 h-4 text-[#d4f828]" /> Increased Safety
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-white">
                    <Check className="w-4 h-4 text-[#d4f828]" /> Sustained High Speed
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 flex justify-center">
                <img
                  src="/takeoff-evo/Motor-Design-v2-e1763024913324.webp"
                  alt="eFoil Motor with Prop Guard"
                  className="w-full max-w-md object-contain drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full py-24 px-4 sm:px-6 lg:px-8 bg-[#4A505B] border-t border-white/10">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10">
            <img
              src="/manta/evo/evo_img_40.jpg"
              alt="TakeOff Trench Board High Speed Foil Riding"
              className="w-full h-[340px] sm:h-[480px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
            <div className="absolute bottom-6 left-6 sm:bottom-12 sm:left-12 max-w-2xl">
              <span className="text-[#d4f828] font-bold text-xs uppercase tracking-widest">
                Optimized Hydrodynamics
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                TakeOff Trench Board
              </h2>
              <p className="text-gray-200 text-sm sm:text-base mt-2">
                Why a trench board? For fast &amp; efficient water starts, reducing battery consumption, and a seamless feel when touching water at high speeds on a wave.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-3">
                <span className="text-[#ef0e0a] font-bold text-xs uppercase tracking-widest">
                  European Precision Craftsmanship
                </span>
                <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  A benchmark of shape optimization, craftsmanship, and durability.
                </h3>
              </div>

              <div className="space-y-4 text-gray-200 text-sm leading-relaxed">
                <p>
                  Produced in Portugal by <strong className="text-white">Appletree Manufacturing</strong>, the shape &amp; weight have been optimized with months of prototyping, to allow for precision turns and effortless control.
                </p>
                <p>
                  It gives you a feather-light feel with a rock-solid remote signal connection. It is our most agile board ever made, focusing on carving, and unlocking your pumping.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 overflow-hidden bg-[#383D47] shadow-lg">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#2e323b] border-b border-white/10 text-gray-300 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="p-3.5">Volume</th>
                      <th className="p-3.5">Imperial</th>
                      <th className="p-3.5">Metric</th>
                      <th className="p-3.5">Weight</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10 text-gray-200">
                    <tr className="hover:bg-white/5">
                      <td className="p-3.5 font-bold text-white">32 L</td>
                      <td className="p-3.5">4&apos;2&quot; x 18&quot;</td>
                      <td className="p-3.5">128 x 47 cm</td>
                      <td className="p-3.5 font-bold text-[#d4f828]">4 kg</td>
                    </tr>
                    <tr className="hover:bg-white/5">
                      <td className="p-3.5 font-bold text-white">48 L</td>
                      <td className="p-3.5">4&apos;9&quot; x 21&quot;</td>
                      <td className="p-3.5">145 x 53 cm</td>
                      <td className="p-3.5 font-bold text-[#d4f828]">5 kg</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-200">
                  <Award className="w-5 h-5 text-[#d4f828]" /> ECO BOARD PROJECT LEVEL ONE
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-gray-200">
                  <Check className="w-5 h-5 text-[#d4f828]" /> MADE IN EUROPE
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 flex justify-center">
              <img
                src="/takeoff-evo/STR-Trench-board.webp"
                alt="Appletree Trench Board Internal Cavity"
                className="w-full max-w-md object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full py-24 px-4 sm:px-6 lg:px-8 bg-[#383D47] border-t border-white/10">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10">
            <img
              src="/manta/evo/evo_img_44.jpg"
              alt="Universal Integrated Masts Wave Riding"
              className="w-full h-[320px] sm:h-[440px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
            <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 max-w-xl">
              <span className="text-[#d4f828] font-bold text-xs uppercase tracking-widest">
                Seamless Integration
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                Universal Integrated Masts
              </h2>
              <p className="text-gray-300 text-sm mt-1">
                More glide. Reduced drag. Easy installation.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 flex justify-center">
              <img
                src="/takeoff-evo/STR-Aluminum-integ.-mast-1.webp"
                alt="TakeOff Evo Aluminum Integrated Mast"
                className="w-full max-w-md object-contain drop-shadow-2xl"
              />
            </div>

            <div className="lg:col-span-6 space-y-6">
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                Next-Level Efficiency
              </h3>
              <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
                Our Integrated Masts are made of aviation-grade aluminum and give you a clean silhouette for next-level efficiency. Motor is mounted at exactly 20 cm from the mast plate.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[#4A505B] border border-white/10 shadow-sm">
                  <div className="text-white font-extrabold text-sm">For Prone &amp; Downwind</div>
                  <p className="text-xs text-gray-300 mt-1">Clean setup and seamless continuous glide.</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#4A505B] border border-white/10 shadow-sm">
                  <div className="text-white font-extrabold text-sm">For eFoil</div>
                  <p className="text-xs text-gray-300 mt-1">Longer sessions with dramatically less drag.</p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#4A505B] border border-white/10 space-y-3 shadow-md">
                <h4 className="font-bold text-white text-sm">Dedicated Mast Adapters</h4>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Our integrated masts come with dedicated adapters to ensure a snug fit on your kit. Available for most leading foil brands on the market.
                </p>
                <div className="pt-2">
                  <img
                    src="/takeoff-evo/Mast-Adapters-1-e1763025039560.webp"
                    alt="Mast Adapters"
                    className="h-16 object-contain"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-[#4A505B] border border-white/10 text-center shadow-sm">
                  <div className="text-xs text-gray-300">Weight</div>
                  <div className="text-sm font-black text-white mt-0.5">4.6 kg</div>
                  <div className="text-[10px] text-gray-400">incl. adapter &amp; motor</div>
                </div>
                <div className="p-3 rounded-xl bg-[#4A505B] border border-white/10 text-center shadow-sm">
                  <div className="text-xs text-gray-300">Length</div>
                  <div className="text-sm font-black text-white mt-0.5">80 / 85 cm</div>
                  <div className="text-[10px] text-gray-400">Assist / eFoil</div>
                </div>
                <div className="p-3 rounded-xl bg-[#4A505B] border border-white/10 text-center shadow-sm">
                  <div className="text-xs text-gray-300">Thickness</div>
                  <div className="text-sm font-black text-white mt-0.5">19 mm</div>
                  <div className="text-[10px] text-gray-400">Streamlined</div>
                </div>
                <div className="p-3 rounded-xl bg-[#4A505B] border border-white/10 text-center shadow-sm">
                  <div className="text-xs text-gray-300">Chord</div>
                  <div className="text-sm font-black text-white mt-0.5">130 mm</div>
                  <div className="text-[10px] text-gray-400">Aero profile</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full py-24 px-4 sm:px-6 lg:px-8 bg-[#4A505B] border-t border-white/10">
        <div className="max-w-7xl mx-auto space-y-14">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div className="space-y-1">
              <span className="text-[#d4f828] font-bold text-xs uppercase tracking-widest">
                Special Collaboration
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
                Manta Foils <span className="text-gray-400">|</span> X AFS Infinity F.A.
              </h2>
              <p className="text-sm font-bold text-gray-200">
                CARBON INTEGRATED MAST &amp; TRENCH BOARDS &bull; ENDLESS SWELLS. INFINITE POSSIBILITIES.
              </p>
            </div>
            <div className="shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#383D47] border border-white/10 text-xs font-semibold text-gray-200">
              <span>🇫🇷</span> Manufactured in France
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 flex justify-center">
              <img
                src="/takeoff-evo/STR-AFS.webp"
                alt="Manta x AFS Infinity Carbon Integration"
                className="w-full max-w-xl object-contain drop-shadow-2xl"
              />
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="p-5 rounded-2xl bg-[#383D47] border border-white/10 flex items-start gap-3 shadow-md">
                <div className="w-8 h-8 rounded-lg bg-[#d4f828]/20 text-[#d4f828] flex items-center justify-center shrink-0">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-extrabold text-white text-sm">Lightweight UHM + HM Carbon Construction</h4>
                  <p className="text-xs text-gray-300 mt-0.5">Ultra High Modulus carbon fiber laying for zero torsional twist.</p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#383D47] border border-white/10 flex items-start gap-3 shadow-md">
                <div className="w-8 h-8 rounded-lg bg-[#d4f828]/20 text-[#d4f828] flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-extrabold text-white text-sm">15 cm Motor Position</h4>
                  <p className="text-xs text-gray-300 mt-0.5">Optimized thrust line located exactly 15 cm below board hull.</p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#383D47] border border-white/10 flex items-start gap-3 shadow-md">
                <div className="w-8 h-8 rounded-lg bg-[#d4f828]/20 text-[#d4f828] flex items-center justify-center shrink-0">
                  <Ruler className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-extrabold text-white text-sm">Stiff 14 mm Thick Mast</h4>
                  <p className="text-xs text-gray-300 mt-0.5">Ultra-skinny foil cross-section with maximum lateral rigidity.</p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#383D47] border border-white/10 flex items-start gap-3 shadow-md">
                <div className="w-8 h-8 rounded-lg bg-[#d4f828]/20 text-[#d4f828] flex items-center justify-center shrink-0">
                  <Radio className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-extrabold text-white text-sm">Perfect Signal</h4>
                  <p className="text-xs text-gray-300 mt-0.5">Dedicated internal RF conduit prevents carbon shielding of remote signals.</p>
                </div>
              </div>

              <p className="text-xs text-gray-200 pt-2 leading-relaxed">
                Premium setup for discerning riders. Built for clean integration, low weight, unmatched stiffness, and an exhilarating riding feel.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full py-24 px-4 sm:px-6 lg:px-8 bg-[#383D47] border-t border-white/10">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-[#d4f828] font-bold text-xs uppercase tracking-widest">
              Full Technical Comparison
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
              Specifications
            </h2>
            <p className="text-gray-200 text-sm">
              All 7 TakeOff Evo modular battery configurations compared side-by-side.
            </p>
          </div>

          <div className="w-full overflow-x-auto rounded-3xl border border-white/10 bg-[#4A505B] shadow-2xl">
            <table className="w-full text-center text-xs border-collapse min-w-[850px]">
              <thead>
                <tr className="bg-[#2e323b] text-white font-black border-b border-white/10">
                  <th className="p-4 text-left font-bold text-gray-300">Battery Option</th>
                  <th className="p-4 text-[#d4f828]">1x Air</th>
                  <th className="p-4 text-[#d4f828]">2x Air</th>
                  <th className="p-4">1x Endurance</th>
                  <th className="p-4">1x Ultra 450</th>
                  <th className="p-4">2x Ultra 450</th>
                  <th className="p-4">1x Ultra 600</th>
                  <th className="p-4">2x Ultra 600</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-gray-200">
                <tr className="hover:bg-white/5">
                  <td className="p-3.5 text-left font-bold text-white">Battery capacity (Wh)</td>
                  <td className="p-3.5 font-bold text-[#d4f828]">194</td>
                  <td className="p-3.5 font-bold text-[#d4f828]">388</td>
                  <td className="p-3.5">518</td>
                  <td className="p-3.5">450</td>
                  <td className="p-3.5">900</td>
                  <td className="p-3.5">600</td>
                  <td className="p-3.5 font-bold text-white">1,200</td>
                </tr>

                <tr className="hover:bg-white/5">
                  <td className="p-3.5 text-left font-bold text-white">Weight — full system incl. battery</td>
                  <td className="p-3.5 font-black text-[#d4f828]">4.5 kg</td>
                  <td className="p-3.5">6.1 kg</td>
                  <td className="p-3.5">6.7 kg</td>
                  <td className="p-3.5">6.3 kg</td>
                  <td className="p-3.5">7.7 kg</td>
                  <td className="p-3.5">6.3 kg</td>
                  <td className="p-3.5">7.7 kg</td>
                </tr>

                <tr className="hover:bg-white/5">
                  <td className="p-3.5 text-left font-bold text-white">Motor power — peak (W)</td>
                  <td colSpan={7} className="p-3.5 font-black text-white text-sm bg-white/5">
                    3,500 W
                  </td>
                </tr>

                <tr className="hover:bg-white/5">
                  <td className="p-3.5 text-left font-bold text-white">Max thrust</td>
                  <td colSpan={7} className="p-3.5 font-black text-[#d4f828] text-sm bg-white/5">
                    35 kg
                  </td>
                </tr>

                <tr className="hover:bg-white/5">
                  <td className="p-3.5 text-left font-bold text-white">Ride time</td>
                  <td className="p-3.5 font-semibold text-white">15–20 min</td>
                  <td className="p-3.5 font-semibold text-white">35–40 min</td>
                  <td className="p-3.5 font-semibold text-white">45–50 min</td>
                  <td className="p-3.5 font-semibold text-white">40–45 min</td>
                  <td className="p-3.5 font-semibold text-white">80–85 min</td>
                  <td className="p-3.5 font-semibold text-white">55–60 min</td>
                  <td className="p-3.5 font-semibold text-[#d4f828]">110–115 min</td>
                </tr>

                <tr className="hover:bg-white/5">
                  <td className="p-3.5 text-left font-bold text-white">Configurations with 1 kit</td>
                  <td colSpan={7} className="p-3.5 font-bold text-white bg-white/5">
                    7 configs — from 194 to 1200 Wh, dual-battery capable
                  </td>
                </tr>

                <tr className="hover:bg-white/5">
                  <td className="p-3.5 text-left font-bold text-white">Travel batteries (airline-friendly)</td>
                  <td className="p-3.5 font-bold text-emerald-400 bg-emerald-950/20">Approval free (2x 97 Wh)</td>
                  <td className="p-3.5 font-bold text-emerald-400 bg-emerald-950/20">Approval free (4x 97 Wh)</td>
                  <td className="p-3.5 text-rose-400 font-bold">✘</td>
                  <td className="p-3.5 text-rose-400 font-bold">✘</td>
                  <td className="p-3.5 text-rose-400 font-bold">✘</td>
                  <td className="p-3.5 text-rose-400 font-bold">✘</td>
                  <td className="p-3.5 text-rose-400 font-bold">✘</td>
                </tr>

                <tr className="hover:bg-white/5">
                  <td className="p-3.5 text-left font-bold text-white">eFoil capability (longer ride)</td>
                  <td className="p-3.5 text-rose-400 font-bold">✘</td>
                  <td className="p-3.5 text-emerald-400 font-bold">✔</td>
                  <td className="p-3.5 text-emerald-400 font-bold">✔</td>
                  <td className="p-3.5 text-emerald-400 font-bold">✔</td>
                  <td className="p-3.5 text-emerald-400 font-bold">✔</td>
                  <td className="p-3.5 text-emerald-400 font-bold">✔</td>
                  <td className="p-3.5 text-emerald-400 font-bold">✔</td>
                </tr>

                <tr className="hover:bg-white/5">
                  <td className="p-3.5 text-left font-bold text-white">Multiple motor heights with 1 kit</td>
                  <td colSpan={7} className="p-3.5 text-emerald-400 font-bold">
                    ✔
                  </td>
                </tr>

                <tr className="hover:bg-white/5">
                  <td className="p-3.5 text-left font-bold text-white">External antenna for carbon boards</td>
                  <td colSpan={7} className="p-3.5 text-gray-200">
                    ✔ Optional ($175)
                  </td>
                </tr>

                <tr className="hover:bg-white/5">
                  <td className="p-3.5 text-left font-bold text-white">Remote with locking system</td>
                  <td colSpan={7} className="p-3.5 text-emerald-400 font-bold">
                    ✔
                  </td>
                </tr>

                <tr className="hover:bg-white/5">
                  <td className="p-3.5 text-left font-bold text-white">Handheld remote, including GPS</td>
                  <td colSpan={7} className="p-3.5 text-emerald-400 font-bold">
                    ✔
                  </td>
                </tr>

                <tr className="hover:bg-white/5">
                  <td className="p-3.5 text-left font-bold text-white">Mast adaptor</td>
                  <td colSpan={7} className="p-3.5 font-bold text-white">
                    Universal
                  </td>
                </tr>

                <tr className="hover:bg-white/5">
                  <td className="p-3.5 text-left font-bold text-white">Recharge time with fast charger</td>
                  <td className="p-3.5 font-bold text-[#d4f828]">25 min</td>
                  <td className="p-3.5 font-bold text-[#d4f828]">25 min / bat</td>
                  <td className="p-3.5">1h 20 min</td>
                  <td className="p-3.5">50 min</td>
                  <td className="p-3.5 text-gray-400">—</td>
                  <td className="p-3.5">1h 10 min</td>
                  <td className="p-3.5 text-gray-400">—</td>
                </tr>

                <tr className="hover:bg-white/5 bg-[#d4f828]/10">
                  <td className="p-3.5 text-left font-bold text-white">Motor maintenance</td>
                  <td colSpan={7} className="p-3.5 font-bold text-emerald-300">
                    None — sealed direct drive motor, fresh-water rinse only
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-[#383D47] border-t border-white/10">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ef0e0a]/20 text-[#ef0e0a] text-xs font-bold uppercase tracking-widest">
            Western Australia Authorized Manta Dealer
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Ready to Fly with the TakeOff Evo?
          </h2>
          <p className="text-gray-200 text-base max-w-2xl mx-auto leading-relaxed">
            Get expert local advice, hands-on demos, and complete custom setup guidance right here in WA. 
            Talk directly with Mark on <strong>0487 042 694</strong> for order availability and advice.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#ef0e0a] text-white font-extrabold text-sm uppercase tracking-wider hover:bg-[#d40c08] shadow-lg shadow-[#ef0e0a]/30 transition-all"
            >
              Enquire &amp; Order Now <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:0487042694"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm tracking-wide border border-white/15 transition-all"
            >
              <Phone className="w-4 h-4 text-[#d4f828]" /> Call Mark: 0487 042 694
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}

function Ruler(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21.3 8.7 8.7 21.3c-1 1-2.5 1-3.4 0l-2.6-2.6c-1-1-1-2.5 0-3.4L15.3 2.7c1-1 2.5-1 3.4 0l2.6 2.6c1 1 1 2.5 0 3.4Z" />
      <path d="m14.5 3.5 2 2" />
      <path d="m11.5 6.5 2 2" />
      <path d="m8.5 9.5 2 2" />
      <path d="m5.5 12.5 2 2" />
    </svg>
  );
}
