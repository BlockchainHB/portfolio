"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useMotion } from "@/components/motion-provider";

export type TweetCardProps = {
  href: string;
  content: string;
  authorName: string;
  authorHandle: string;
  avatar: string;
  media?: string; // optional image/gif thumbnail
  video?: string; // optional video URL
  views?: string;
  date?: string;
};

export function TweetCard({ href, content, authorName, authorHandle, avatar, media, video, views }: TweetCardProps) {
  const { reducedMotion } = useMotion();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [isCoarse, setIsCoarse] = useState(false);
  const [previewing, setPreviewing] = useState(false);
  useEffect(() => {
    if (!videoRef.current) return;
    const io = new IntersectionObserver(([entry]) => setIsIntersecting(entry.isIntersecting), { threshold: 0.2 });
    io.observe(videoRef.current);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    const mq = typeof window !== 'undefined' ? window.matchMedia('(pointer: coarse)') : null;
    const update = () => setIsCoarse(!!mq?.matches);
    update();
    mq?.addEventListener('change', update);
    return () => mq?.removeEventListener('change', update);
  }, []);
  // Auto-stop preview when out of view
  useEffect(() => {
    if (!videoRef.current) return;
    if (!isIntersecting && previewing) {
      try { videoRef.current.pause(); } catch {}
      setPreviewing(false);
    }
  }, [isIntersecting, previewing]);
  return (
    <Link
      href={href}
      target="_blank"
      className="block group"
      onClick={(e) => {
        const v = videoRef.current;
        if (!v) return;
        if (isCoarse && !previewing && !reducedMotion) {
          e.preventDefault();
          v.play().catch(() => {});
          setPreviewing(true);
        }
      }}
    >
      <article className="w-full overflow-hidden border border-border bg-card transition-colors hover:border-accent">
        <div className="flex items-center gap-2 p-2.5">
          <div className="relative h-6 w-6 overflow-hidden rounded-full border border-border">
            <Image src={avatar} alt={authorName} fill className="object-cover" />
          </div>
          <div className="min-w-0">
            <div className="text-[12px] font-medium text-foreground leading-none">{authorName}</div>
            <div className="text-[11px] text-muted-foreground">@{authorHandle}</div>
          </div>
        </div>
        <div className="px-2.5 pb-2.5 text-[12px] text-foreground line-clamp-3">{content}</div>
        {video && (
          <div className="relative mx-2.5 mb-2.5 aspect-[16/9] overflow-hidden border border-border">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              muted={true}
              playsInline={true}
              preload="metadata"
              poster={media}
              onMouseMove={reducedMotion ? undefined : (e) => {
                const v = videoRef.current; if (!v || !isIntersecting) return;
                const rect = (e.currentTarget as HTMLVideoElement).getBoundingClientRect();
                const t = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
                if (v.duration && Number.isFinite(v.duration)) v.currentTime = t * v.duration;
              }}
              onMouseEnter={reducedMotion ? undefined : () => {
                const v = videoRef.current; if (!v) return; v.play().catch(() => {});
              }}
              onMouseLeave={reducedMotion ? undefined : () => {
                const v = videoRef.current; if (!v) return; v.pause();
              }}
              onTouchStart={(e) => {
                const v = videoRef.current; if (!v) return;
                if (isCoarse && !previewing && !reducedMotion) {
                  e.preventDefault();
                  e.stopPropagation();
                  v.play().catch(() => {});
                  setPreviewing(true);
                }
              }}
              controls={reducedMotion}
            >
              <source src={video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {isCoarse && !previewing && !reducedMotion && (
              <div className="pointer-events-none absolute inset-0 grid place-items-center bg-black/0">
                <span className="rounded-full bg-black/60 px-3 py-1 text-xs text-white">Tap to preview</span>
              </div>
            )}
          </div>
        )}
        {media && !video && (
          <div className="relative mx-2.5 mb-2.5 aspect-[16/9] overflow-hidden border border-border">
            <Image src={media} alt="tweet media" fill className="object-cover transition-[filter] duration-300 [filter:blur(12px)] data-[loaded=true]:[filter:blur(0px)]" onLoadingComplete={(img) => { (img as any).dataset.loaded = "true"; }} />
          </div>
        )}
        <div className="flex items-center justify-between px-2.5 pb-2.5 text-[10px] text-muted-foreground">
          <span className="group-hover:text-foreground">View on X</span>
          {views && <span>{views}</span>}
        </div>
      </article>
    </Link>
  );
}


