'use client';
import { motion } from 'framer-motion';
import { useEffect, useState, useRef, useMemo } from 'react';
import Image from 'next/image';
import { Play, Pause, SkipForward, SkipBack } from 'lucide-react';
import { FastAverageColor } from 'fast-average-color';

const About = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [bgColor, setBgColor] = useState('#b1b5a4');
  const imgRef = useRef<HTMLImageElement | null>(null);
  const particleContainerRef = useRef<HTMLDivElement | null>(null);

  const tracks = useMemo(() => [
    { title: "Sunsetz", src: "/Sunsetz.mp3", image: "/sunsetz.jpg" },
    { title: "I Love You So", src: "/ilys.mp3", image: "/2v.jpg" },
    { title: "Shower", src: "/shower.mp3", image: "/1968.png" },
  ], []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // ✅ 1. Set audio.src ONLY when track changes
  useEffect(() => {
    if (!isMounted || !audioRef.current) return;
    const audio = audioRef.current;

    audio.src = tracks[currentTrackIndex].src;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateTime);
    audio.addEventListener('ended', nextTrack);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateTime);
      audio.removeEventListener('ended', nextTrack);
    };
  }, [currentTrackIndex, isMounted, tracks]);

  // ✅ 2. Play/pause control
  useEffect(() => {
    if (!audioRef.current) return;
    const audio = audioRef.current;

    if (isPlaying) {
      audio.play().catch((err) => {
        console.error('Audio playback error:', err);
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  // ✅ 3. When track changes and isPlaying is true, ensure it starts playing
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch((err) => {
        console.error('Playback error on track change:', err);
      });
    }
  }, [currentTrackIndex]);

  useEffect(() => {
    calculateAverageColor();
  }, [currentTrackIndex]);

  const calculateAverageColor = () => {
    if (!imgRef.current) return;
    const fac = new FastAverageColor();
    fac.getColorAsync(imgRef.current)
      .then((color) => setBgColor(color.hex))
      .catch((err) => console.error('Error getting average color:', err));
  };

  const createParticleSplash = () => {
    const container = particleContainerRef.current;
    if (!container) return;

    for (let i = 0; i < 6; i++) {
      const size = Math.random() * 8 + 12;
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.position = 'absolute';
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.background = 'white';
      particle.style.zIndex = '50';
      particle.style.clipPath =
        'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)';
      particle.style.top = '50%';
      particle.style.left = '50%';
      particle.style.transform = 'translate(-50%, -50%)';
      particle.style.pointerEvents = 'none';
      container.appendChild(particle);

      const angle = Math.random() * 2 * Math.PI;
      const distance = Math.random() * 60 + 30;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;

      const anim = particle.animate(
        [
          { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
          { transform: `translate(${x}px, ${y}px) scale(0.5)`, opacity: 0 },
        ],
        {
          duration: 700,
          easing: 'ease-out',
        }
      );

      anim.onfinish = () => particle.remove();
    }
  };

  const togglePlay = () => {
    createParticleSplash();
    setIsPlaying((prev) => !prev);
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    setCurrentTime(0);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
    setCurrentTime(0);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const handleSeekClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  return (
    <section className="relative grid grid-cols-1 md:grid-cols-3 grid-rows-auto md:grid-rows-2 gap-6 min-h-screen px-4 sm:px-6 md:px-12 py-6 transition-all duration-500 bg-[#153439]">
      {/* Profile Image */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-[#b1b5a4] col-span-1 row-span-1 md:row-span-2 rounded-xl flex items-center justify-center overflow-hidden"
        style={{ backgroundImage: "url('/grain-texture.png')", backgroundSize: 'cover' }}
      >
        <Image
          src="/profile.jpg"
          alt="Profile Photo"
          width={350}
          height={450}
          className="rounded-lg grayscale w-auto h-auto max-w-full max-h-full"
          priority
        />
      </motion.div>

      {/* Music Player */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="col-span-1 md:col-span-2 row-span-1 rounded-xl shadow-md flex flex-col sm:flex-row items-center px-6 py-8 overflow-hidden gap-6"
        style={{ background: bgColor, backgroundImage: "url('/grain-texture.png')", backgroundSize: 'cover' }}
      >
        <div className="w-full sm:w-1/2 flex justify-center items-center">
          <div className="relative w-48 h-48 sm:w-64 sm:h-64 aspect-square">
            <img
              ref={imgRef}
              src={tracks[currentTrackIndex].image}
              alt="Album Art"
              width={256}
              height={256}
              className="rounded-lg object-cover w-full h-full"
              onLoad={calculateAverageColor}
            />
          </div>
        </div>

        <div className="w-full sm:w-1/2 flex flex-col items-center sm:items-start mt-8 sm:mt-0 gap-4">
          <p className="text-[#153439] text-2xl sm:text-3xl font-extrabold text-center sm:text-left w-full ml-[5px]" style={{ fontFamily: 'var(--font-sub)' }}>
            {tracks[currentTrackIndex].title}
          </p>

          <div className="w-full flex items-center gap-3 mt-2">
            <span className="text-xs text-[#153439] w-10 text-right">{formatTime(currentTime)}</span>
            <div
              className="relative w-full h-4 rounded-full bg-[#153439]/30 cursor-pointer"
              onClick={handleSeekClick}
            >
              <div
                className="absolute top-0 left-0 h-full bg-[#153439] transition-all duration-300 ease-in-out rounded-full"
                style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
              />
            </div>
            <span className="text-xs text-[#153439] w-10">{formatTime(duration)}</span>
          </div>

          <div className="flex flex-row items-center gap-4 mt-2">
            <button onClick={prevTrack} className="p-2 rounded-full transition-transform duration-200 hover:scale-110 group" aria-label="Previous track">
              <SkipBack size={24} className="text-[#153439] group-hover:text-white transition-colors duration-200" />
            </button>

            <div className="relative" ref={particleContainerRef}>
              <button
                onClick={togglePlay}
                className="p-3 w-12 h-12 flex items-center justify-center rounded-full bg-[#153439] hover:bg-[#0f272b]"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause size={24} className="text-white" /> : <Play size={24} className="text-white ml-[2px]" />}
              </button>
            </div>

            <button onClick={nextTrack} className="p-2 rounded-full transition-transform duration-200 hover:scale-110 group" aria-label="Next track">
              <SkipForward size={24} className="text-[#153439] group-hover:text-white transition-colors duration-200" />
            </button>
          </div>
        </div>
        {isMounted && <audio ref={audioRef} />}
      </motion.div>

 {/* Blank Box */}
<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="bg-[#b1b5a4] rounded-xl p-4 sm:p-6 overflow-hidden flex items-center justify-center"
  style={{ backgroundImage: "url('/grain-texture.png')", backgroundSize: 'cover' }}
>
  <div
    className="text-center text-[#153439] font-black text-4xl sm:text-6xl leading-tight whitespace-pre-line tracking-widest"
    style={{ fontFamily: 'var(--font-sub)' }}
  >
    DEVELOPER,{'\n'}EDITOR,{'\n'}PHOTOGRAPHER,{'\n'}MUSICIAN.
  </div>
</motion.div>

    

      {/* Tech Stack */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-[#b1b5a4] rounded-xl grid grid-cols-3 grid-rows-2 gap-2 p-4 sm:p-6"
        style={{ backgroundImage: "url('/grain-texture.png')", backgroundSize: 'cover' }}
      >
        {['html', 'tw', 'js', 'react', 'njs', 'next'].map((tech) => (
          <div key={tech} className="bg-[#153439] rounded-lg flex items-center justify-center p-2">
            <Image src={`/${tech}.svg`} alt={tech.toUpperCase()} width={40} height={40} className="invert" />
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default About;
