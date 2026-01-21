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
      <article className="w-full overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-ring/50">
        <div className="flex items-center gap-2 p-3">
          <div className="relative h-8 w-8 overflow-hidden rounded-full border border-border">
            <Image src={avatar} alt={authorName} fill className="object-cover" />
          </div>
          <div className="min-w-0">
            <div className="text-[12.8px] font-medium text-foreground leading-none">{authorName}</div>
            <div className="text-[11px] text-muted-foreground">@{authorHandle}</div>
          </div>
        </div>
        <div className="px-3 pb-3 text-[12.8px] text-foreground/90 line-clamp-4 overflow-hidden">{content}</div>
        {video && (
          <div className="relative mx-3 mb-3 aspect-[16/9] overflow-hidden rounded-md border border-border">
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
          <div className="relative mx-3 mb-3 aspect-[16/9] overflow-hidden rounded-md border border-border">
            <Image src={media} alt="tweet media" fill className="object-cover transition-[filter] duration-300 [filter:blur(12px)] data-[loaded=true]:[filter:blur(0px)]" onLoadingComplete={(img) => { (img as any).dataset.loaded = "true"; }} />
          </div>
        )}
        <div className="flex items-center justify-between px-3 pb-3 text-[11px] text-muted-foreground">
          <span className="group-hover:text-foreground transition-colors">View on X</span>
          {views && <span>{views}</span>}
        </div>
      </article>
    </Link>
  );
}


