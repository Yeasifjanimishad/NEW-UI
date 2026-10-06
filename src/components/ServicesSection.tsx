import React, { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

interface ServiceItem {
  tag: string;
  title: string;
  description: string;
  videoUrl: string;
}

const services: ServiceItem[] = [
  {
    tag: 'Strategy',
    title: 'Research & Insight',
    description:
      'We dig deep into data, culture, and human behavior to surface the insights that drive meaningful, lasting change.',
    videoUrl:
      'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4',
  },
  {
    tag: 'Craft',
    title: 'Design & Execution',
    description:
      'From concept to launch, we obsess over every detail to deliver experiences that feel effortless and look extraordinary.',
    videoUrl:
      'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_151826_c7218672-6e92-402c-9e45-f1e0f454bdc4.mp4',
  },
];

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 1,
    backdropFilter: 'blur(4px)',
    WebkitBackdropFilter: 'blur(4px)',
    boxShadow: '0 0 0 rgba(255, 255, 255, 0)',
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    backdropFilter: 'blur(4px)',
    WebkitBackdropFilter: 'blur(4px)',
    boxShadow: '0 0 0 rgba(255, 255, 255, 0)',
    transition: {
      duration: 0.8,
      delay: i * 0.15,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
  hover: {
    scale: 1.025,
    backdropFilter: 'blur(18px)',
    WebkitBackdropFilter: 'blur(18px)',
    boxShadow:
      '0 0 40px -5px rgba(255, 255, 255, 0.22), inset 0 1px 2px rgba(255, 255, 255, 0.35)',
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const glowingBorderVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 0 },
  hover: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export const ServicesSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="services"
      className="bg-black py-28 md:py-40 px-6 overflow-hidden relative"
    >
      {/* Subtle radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.02)_0%,_transparent_60%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10" ref={sectionRef}>
        {/* Header row: flex between "What we do" and "Our services" label */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-end justify-between mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-5xl text-white tracking-tight font-normal">
            What we do
          </h2>
          <span className="text-white/40 text-sm tracking-wider uppercase hidden md:inline-block">
            Our services
          </span>
        </motion.div>

        {/* Two-card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {services.map((item, index) => (
            <motion.div
              key={item.title}
              custom={index}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              whileHover="hover"
              variants={cardVariants}
              className="liquid-glass rounded-3xl overflow-hidden group cursor-pointer relative"
            >
              {/* Subtle glowing border overlay animated on hover */}
              <motion.div
                variants={glowingBorderVariants}
                className="absolute inset-0 rounded-3xl pointer-events-none ring-1 ring-white/50 shadow-[0_0_35px_rgba(255,255,255,0.25)] z-20"
              />

              {/* Card video area: aspect-video, object-cover, transition-transform duration-700 group-hover:scale-105 */}
              <div className="aspect-video relative overflow-hidden bg-black/40">
                <video
                  src={item.videoUrl}
                  muted
                  autoPlay
                  loop
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Card body (p-6 md:p-8) */}
              <div className="p-6 md:p-8 flex flex-col justify-between relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-white/40 text-xs tracking-widest uppercase font-medium">
                    {item.tag}
                  </span>
                  <div className="liquid-glass rounded-full p-2 group-hover:bg-white group-hover:text-black transition-colors duration-300">
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

                <h3 className="text-white text-xl md:text-2xl mb-3 tracking-tight font-medium">
                  {item.title}
                </h3>

                <p className="text-white/50 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
