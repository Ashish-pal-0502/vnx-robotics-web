
"use client";

import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import dynamic from "next/dynamic";
import gsap from "gsap";

const Globe = dynamic(() => import("react-globe.gl"), {
  ssr: false,
});

const points = [
  {
    lat: 28.6139,
    lng: 77.209,
    label: "India",
  },
  {
    lat: 40.7128,
    lng: -74.006,
    label: "New York",
  },
  {
    lat: 35.6762,
    lng: 139.6503,
    label: "Tokyo",
  },
  {
    lat: 51.5072,
    lng: -0.1276,
    label: "London",
  },
  {
    lat: 37.7749,
    lng: -122.4194,
    label: "San Francisco",
  },
  {
    lat: 25.2048,
    lng: 55.2708,
    label: "Dubai",
  },
];

function OurWorldWideReach() {
  const globeRef = useRef();
  const headingRef = useRef();
  const globeWrapperRef = useRef();
  const glowRef = useRef();
  const [globeReady, setGlobeReady] = useState(false);

  const [dimensions, setDimensions] = useState({
    width: 900,
    height: 700,
  });

  /* RESPONSIVE */
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;

      setDimensions({
        width: mobile ? window.innerWidth - 32 : 600,
        height: mobile ? 400 : 500,
      });
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () =>
      window.removeEventListener("resize", handleResize);
  }, []);

  /* GLOBE CONTROLS - FIXED AUTO ROTATION */
  useEffect(() => {
    if (!globeReady || !globeRef.current) return;

    // Small delay to ensure controls are fully initialized
    const timer = setTimeout(() => {
      if (!globeRef.current) return;
      
      const controls = globeRef.current.controls();
      
      if (controls) {
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.18;
        controls.enableZoom = false;
        controls.enablePan = false;
      }

      // Set initial view
      globeRef.current.pointOfView(
        {
          lat: 18,
          lng: 15,
          altitude: 1.9,
        },
        0
      );
    }, 100);

    return () => clearTimeout(timer);
  }, [globeReady]);

  /* ENTRY ANIMATION */
  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      headingRef.current,
      {
        opacity: 0,
        y: -60,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.1,
        ease: "power3.out",
      }
    ).fromTo(
      globeWrapperRef.current,
      {
        opacity: 0,
        scale: 0.75,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "power3.out",
      },
      "-=0.5"
    );
  }, []);

  /* CURSOR GLOW EFFECT */
  const handleMouseMove = (e) => {
    if (!glowRef.current || !globeWrapperRef.current) return;

    const rect =
      globeWrapperRef.current.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(glowRef.current, {
      x: x - 150,
      y: y - 150,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  return (
    <section className="relative overflow-hidden bg-black flex flex-col items-center justify-center px-6 py-20">
      {/* BACKGROUND GLOW */}
      <div className="absolute top-[-250px] left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-yellow-500/10 blur-[180px]" />

      {/* GRID */}
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#ffffff22_1px,transparent_1px),linear-gradient(to_bottom,#ffffff22_1px,transparent_1px)] bg-[size:70px_70px]" />

      {/* HEADING */}
      <div
        ref={headingRef}
        className="relative z-20 text-center max-w-6xl"
      >
        <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight">
          Innovation Across
          <span className="block text-yellow-400 mt-2">
            Frontiers.
          </span>
        </h1>

        <p className="mt-6 text-neutral-400 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
          Intelligent robotics systems engineered for global
          automation, edge AI, and futuristic deployment
          infrastructure.
        </p>
      </div>

      {/* GLOBE */}
      <div
        ref={globeWrapperRef}
        onMouseMove={handleMouseMove}
        className="relative z-10 -mt-10 flex items-center justify-center"
      >
        {/* CURSOR GLOW */}
        <div
          ref={glowRef}
          className="absolute w-[300px] h-[300px] rounded-full bg-yellow-400/20 blur-[120px] pointer-events-none z-0"
        />

        {/* MAIN GLOBE GLOW */}
        <div className="absolute w-[500px] h-[500px] rounded-full bg-yellow-500/20 blur-[120px]" />

        {/* GLOBE */}
        <div className="relative rounded-full overflow-hidden cursor-grab active:cursor-grabbing">
          <Globe
            ref={globeRef}
            width={dimensions.width}
            height={dimensions.height}
            backgroundColor="rgba(0,0,0,0)"

            /* EARTH */
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
            bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"

            /* ATMOSPHERE */
            showAtmosphere={true}
            atmosphereColor="#facc15"
            atmosphereAltitude={0.15}

            /* POINTS */
            pointsData={points}
            pointAltitude={0.01}
            pointRadius={1}
            pointColor={() => "#facc15"}

            /* LABELS */
            labelsData={points}
            labelLat="lat"
            labelLng="lng"
            labelText="label"
            labelSize={3}
            labelDotRadius={0.5}
            labelColor={() => "#facc15"}
            labelResolution={2}
            labelAltitude={0.015}

            /* INTERACTION */
            enablePointerInteraction={true}
            
            /* READY CALLBACK */
            onGlobeReady={() => setGlobeReady(true)}
          />
        </div>
      </div>

      {/* BOTTOM TEXT */}
      <div className="relative z-20  text-center max-w-2xl">
        <p className="text-neutral-500 text-sm md:text-base leading-relaxed">
          Real-time connected robotics intelligence operating
          across worldwide infrastructure networks.
        </p>
      </div>

      {/* BOTTOM FADE */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}

export default OurWorldWideReach;



// "use client";

// import React, {
//   useEffect,
//   useRef,
//   useState,
// } from "react";

// import dynamic from "next/dynamic";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// const Globe = dynamic(() => import("react-globe.gl"), {
//   ssr: false,
// });

// const points = [
//   {
//     lat: 28.6139,
//     lng: 77.209,
//     label: "India",
//   },
//   {
//     lat: 40.7128,
//     lng: -74.006,
//     label: "New York",
//   },
//   {
//     lat: 35.6762,
//     lng: 139.6503,
//     label: "Tokyo",
//   },
//   {
//     lat: 51.5072,
//     lng: -0.1276,
//     label: "London",
//   },
//   {
//     lat: 37.7749,
//     lng: -122.4194,
//     label: "San Francisco",
//   },
//   {
//     lat: 25.2048,
//     lng: 55.2708,
//     label: "Dubai",
//   },
// ];

// const statsData = [
//   {
//     percentage: 94,
//     title: "Global Robotics<br/>Coverage",
//     desc: "Operating across 6 continents with 24/7 autonomous deployment",
//   },
//   {
//     percentage: 87,
//     title: "Edge AI<br/>Efficiency",
//     desc: "Real-time processing at the source, reducing latency by 87%",
//   },
//   {
//     percentage: 99.9,
//     title: "System<br/>Uptime",
//     desc: "Reliable infrastructure with 99.9% global availability",
//   },
//   {
//     percentage: 150,
//     title: "Industrial<br/>Partners",
//     desc: "Trusted by leading enterprises for robotic automation",
//   },
//   {
//     percentage: 73,
//     title: "Energy Cost<br/>Reduction",
//     desc: "Optimized AI algorithms reducing power consumption",
//   },
//   {
//     percentage: 200,
//     title: "Deployed<br/>Robots",
//     desc: "Fleet of autonomous units operating worldwide",
//   },
// ];

// function OurWorldWideReach() {
//   const globeRef = useRef();
//   const headingRef = useRef();
//   const globeWrapperRef = useRef();
//   const glowRef = useRef();
//   const rightSectionRef = useRef();
//   const splitContainerRef = useRef();
//   const statsGridRef = useRef();
  
//   const [globeReady, setGlobeReady] = useState(false);
//   const [typingComplete, setTypingComplete] = useState(false);
//   const [displayText, setDisplayText] = useState("");
//   const [showCursor, setShowCursor] = useState(true);
//   const [counts, setCounts] = useState(statsData.map(() => 0));

//   const [dimensions, setDimensions] = useState({
//     width: 900,
//     height: 700,
//   });

//   const fullText = "Innovation Across Frontiers.";

//   // Typing animation
//   useEffect(() => {
//     let i = 0;
//     const typingInterval = setInterval(() => {
//       if (i <= fullText.length) {
//         setDisplayText(fullText.slice(0, i));
//         i++;
//       } else {
//         clearInterval(typingInterval);
//         setTypingComplete(true);
//         setTimeout(() => setShowCursor(false), 1000);
//       }
//     }, 80);

//     return () => clearInterval(typingInterval);
//   }, []);

//   // Count up animation for stats
//   useEffect(() => {
//     if (!typingComplete) return;

//     const intervals = statsData.map((item, index) => {
//       const duration = 2500;
//       const increment = item.percentage / (duration / 30);

//       return setInterval(() => {
//         setCounts((prev) => {
//           const newCounts = [...prev];
//           if (newCounts[index] < item.percentage) {
//             newCounts[index] = Math.min(
//               item.percentage,
//               newCounts[index] + increment
//             );
//           }
//           return newCounts;
//         });
//       }, 30);
//     });

//     return () => intervals.forEach((i) => clearInterval(i));
//   }, [typingComplete]);

//   /* RESPONSIVE */
//   useEffect(() => {
//     const handleResize = () => {
//       const mobile = window.innerWidth < 768;

//       setDimensions({
//         width: mobile ? window.innerWidth - 32 : 700,
//         height: mobile ? 400 : 600,
//       });
//     };

//     handleResize();

//     window.addEventListener("resize", handleResize);

//     return () =>
//       window.removeEventListener("resize", handleResize);
//   }, []);

//   /* GLOBE CONTROLS - AUTO ROTATION */
//   useEffect(() => {
//     if (!globeReady || !globeRef.current) return;

//     const timer = setTimeout(() => {
//       if (!globeRef.current) return;
      
//       const controls = globeRef.current.controls();
      
//       if (controls) {
//         controls.autoRotate = true;
//         controls.autoRotateSpeed = 0.18;
//         controls.enableZoom = false;
//         controls.enablePan = false;
//       }

//       globeRef.current.pointOfView(
//         {
//           lat: 18,
//           lng: 15,
//           altitude: 1.9,
//         },
//         0
//       );
//     }, 100);

//     return () => clearTimeout(timer);
//   }, [globeReady]);

//   /* SCROLL TRIGGER ANIMATIONS */
//   useEffect(() => {
//     if (!typingComplete) return;

//     // Split layout animation when scrolling to globe
//     const ctx = gsap.context(() => {
//       // Initially hide right section
//       gsap.set(rightSectionRef.current, { opacity: 0, x: 50 });
//       gsap.set(statsGridRef.current, { opacity: 0, y: 30 });

//       // Create scroll trigger for split layout
//       ScrollTrigger.create({
//         trigger: splitContainerRef.current,
//         start: "top center",
//         end: "bottom bottom",
//         onEnter: () => {
//           // Move globe to left side
//           gsap.to(globeWrapperRef.current, {
//             scale: 1.3,
//             x: "-25%",
//             duration: 1.2,
//             ease: "power3.out",
//           });
          
//           // Hide auto-rotation when sticky
//           if (globeRef.current?.controls()) {
//             const controls = globeRef.current.controls();
//             controls.autoRotate = false;
//           }
          
//           // Show right section
//           gsap.to(rightSectionRef.current, {
//             opacity: 1,
//             x: 0,
//             duration: 0.8,
//             ease: "power3.out",
//           });
          
//           // Animate stats grid
//           gsap.to(statsGridRef.current, {
//             opacity: 1,
//             y: 0,
//             duration: 0.8,
//             ease: "power3.out",
//             delay: 0.3,
//           });
//         },
//         onLeaveBack: () => {
//           // Reset when scrolling back up
//           gsap.to(globeWrapperRef.current, {
//             scale: 1,
//             x: "0%",
//             duration: 1,
//             ease: "power3.out",
//           });
          
//           if (globeRef.current?.controls()) {
//             const controls = globeRef.current.controls();
//             controls.autoRotate = true;
//           }
          
//           gsap.to(rightSectionRef.current, {
//             opacity: 0,
//             x: 50,
//             duration: 0.6,
//             ease: "power3.out",
//           });
          
//           gsap.to(statsGridRef.current, {
//             opacity: 0,
//             y: 30,
//             duration: 0.6,
//             ease: "power3.out",
//           });
//         },
//       });
//     });

//     return () => ctx.revert();
//   }, [typingComplete]);

//   /* ENTRY ANIMATION */
//   useEffect(() => {
//     const tl = gsap.timeline();

//     tl.fromTo(
//       headingRef.current,
//       {
//         opacity: 0,
//         y: -60,
//       },
//       {
//         opacity: 1,
//         y: 0,
//         duration: 1.1,
//         ease: "power3.out",
//       }
//     ).fromTo(
//       globeWrapperRef.current,
//       {
//         opacity: 0,
//         scale: 0.75,
//       },
//       {
//         opacity: 1,
//         scale: 1,
//         duration: 1.5,
//         ease: "power3.out",
//       },
//       "-=0.5"
//     );
//   }, []);

//   /* CURSOR GLOW EFFECT */
//   const handleMouseMove = (e) => {
//     if (!glowRef.current || !globeWrapperRef.current) return;

//     const rect = globeWrapperRef.current.getBoundingClientRect();

//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;

//     gsap.to(glowRef.current, {
//       x: x - 150,
//       y: y - 150,
//       duration: 0.4,
//       ease: "power3.out",
//     });
//   };

//   return (
//     <section className="relative overflow-hidden bg-black">
//       {/* BACKGROUND GLOW */}
//       <div className="absolute top-[-250px] left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-cyan-500/10 blur-[180px]" />

//       {/* GRID */}
//       <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#ffffff22_1px,transparent_1px),linear-gradient(to_bottom,#ffffff22_1px,transparent_1px)] bg-[size:70px_70px]" />

//       {/* INITIAL HEADING SECTION */}
//       <div className="flex flex-col items-center justify-center px-6 pt-20 pb-10 min-h-screen">
//         <div
//           ref={headingRef}
//           className="relative z-20 text-center max-w-6xl"
//         >
//           <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight">
//             <span className="inline-block">
//               {displayText}
//               {showCursor && typingComplete === false && (
//                 <span className="inline-block w-1 h-12 md:h-16 bg-cyan-400 ml-1 animate-pulse" />
//               )}
//             </span>
//             {typingComplete && (
//               <span className="block text-cyan-400 mt-2 animate-glow">
//                 {displayText.includes("Frontiers.") ? "🤖" : ""}
//               </span>
//             )}
//           </h1>

//           <p className="mt-6 text-neutral-400 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
//             Intelligent robotics systems engineered for global
//             automation, edge AI, and futuristic deployment
//             infrastructure.
//           </p>
//         </div>

//         <div className="mt-16 animate-bounce">
//           <div className="w-6 h-10 border-2 border-neutral-500 rounded-full mx-auto flex justify-center">
//             <div className="w-1 h-2 bg-cyan-400 rounded-full mt-2 animate-scroll" />
//           </div>
//         </div>
//       </div>

//       {/* SPLIT LAYOUT SECTION - STICKY GLOBE + STATS */}
//       <div ref={splitContainerRef} className="relative min-h-screen">
//         {/* Left Side - Sticky Globe */}
//         <div className="sticky top-0 h-screen overflow-hidden">
//           <div
//             ref={globeWrapperRef}
//             onMouseMove={handleMouseMove}
//             className="absolute inset-0 flex items-center justify-center"
//           >
//             {/* CURSOR GLOW */}
//             <div
//               ref={glowRef}
//               className="absolute w-[300px] h-[300px] rounded-full bg-cyan-400/20 blur-[120px] pointer-events-none z-0"
//             />

//             {/* MAIN GLOBE GLOW */}
//             <div className="absolute w-[600px] h-[600px] rounded-full bg-cyan-500/20 blur-[120px]" />

//             {/* GLOBE */}
//             <div className="relative rounded-full overflow-hidden cursor-grab active:cursor-grabbing">
//               <Globe
//                 ref={globeRef}
//                 width={dimensions.width}
//                 height={dimensions.height}
//                 backgroundColor="rgba(0,0,0,0)"

//                 /* EARTH */
//                 globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
//                 bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"

//                 /* ATMOSPHERE */
//                 showAtmosphere={true}
//                 atmosphereColor="#06b6d4"
//                 atmosphereAltitude={0.15}

//                 /* POINTS */
//                 pointsData={points}
//                 pointAltitude={0.01}
//                 pointRadius={1}
//                 pointColor={() => "#06b6d4"}

//                 /* LABELS */
//                 labelsData={points}
//                 labelLat="lat"
//                 labelLng="lng"
//                 labelText="label"
//                 labelSize={3}
//                 labelDotRadius={0.5}
//                 labelColor={() => "#06b6d4"}
//                 labelResolution={2}
//                 labelAltitude={0.015}

//                 /* INTERACTION */
//                 enablePointerInteraction={true}
                
//                 /* READY CALLBACK */
//                 onGlobeReady={() => setGlobeReady(true)}
//               />
//             </div>
//           </div>
//         </div>

//         {/* Right Side - Stats Section */}
//         <div
//           ref={rightSectionRef}
//           className="absolute right-0 top-0 w-full md:w-1/2 h-screen flex items-center justify-center px-8 md:px-12 pointer-events-none"
//         >
//           <div className="w-full max-w-lg">
//             <div className="mb-8">
//               <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
//                 Global Impact
//               </h2>
//               <p className="text-cyan-400 text-lg">
//                 by the numbers
//               </p>
//             </div>

//             <div
//               ref={statsGridRef}
//               className="grid grid-cols-1 sm:grid-cols-2 gap-6"
//             >
//               {statsData.map((item, index) => (
//                 <div
//                   key={index}
//                   className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-cyan-400/50 transition-all duration-300"
//                 >
//                   <h3 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
//                     {item.percentage >= 100 
//                       ? `${Math.round(counts[index])}+`
//                       : `${Math.round(counts[index])}%`}
//                   </h3>
//                   <p
//                     className="mt-2 text-lg font-bold text-white leading-tight"
//                     dangerouslySetInnerHTML={{ __html: item.title }}
//                   />
//                   <p className="text-sm text-neutral-400 font-normal mt-2">
//                     {item.desc}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* BOTTOM FADE */}
//       <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />

//       {/* Custom Animations */}
//       <style jsx>{`
//         @keyframes glow {
//           0%, 100% {
//             text-shadow: 0 0 20px rgba(6, 182, 212, 0.5);
//           }
//           50% {
//             text-shadow: 0 0 40px rgba(6, 182, 212, 0.8);
//           }
//         }
        
//         .animate-glow {
//           animation: glow 2s ease-in-out infinite;
//         }
        
//         @keyframes scroll {
//           0% {
//             transform: translateY(0);
//             opacity: 1;
//           }
//           100% {
//             transform: translateY(10px);
//             opacity: 0;
//           }
//         }
        
//         .animate-scroll {
//           animation: scroll 1.5s ease-in-out infinite;
//         }
//       `}</style>
//     </section>
//   );
// }

// export default OurWorldWideReach;