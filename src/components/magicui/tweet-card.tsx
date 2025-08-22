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
  useEffect(() => {
    if (!videoRef.current) return;
    const io = new IntersectionObserver(([entry]) => setIsIntersecting(entry.isIntersecting), { threshold: 0.2 });
    io.observe(videoRef.current);
    return () => io.disconnect();
  }, []);
  return (
    <Link href={href} target="_blank" className="block group">
      <article className="w-full overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900 transition-colors hover:border-slate-300 dark:hover:border-slate-600">
        <div className="flex items-center gap-2 p-3">
          <div className="relative h-8 w-8 overflow-hidden rounded-full border border-slate-200 dark:border-slate-600">
            <Image src={avatar} alt={authorName} fill className="object-cover" />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-medium text-slate-900 dark:text-slate-100 leading-none">{authorName}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">@{authorHandle}</div>
          </div>
        </div>
        <div className="px-3 pb-3 text-sm text-slate-800 dark:text-slate-200 line-clamp-4">{content}</div>
        {video && (
          <div className="relative mx-3 mb-3 aspect-[16/9] overflow-hidden rounded-md border border-slate-200 dark:border-slate-600">
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
              controls={reducedMotion}
            >
              <source src={video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
        {media && !video && (
          <div className="relative mx-3 mb-3 aspect-[16/9] overflow-hidden rounded-md border border-slate-200 dark:border-slate-600">
            <Image src={media} alt="tweet media" fill className="object-cover transition-[filter] duration-300 [filter:blur(12px)] data-[loaded=true]:[filter:blur(0px)]" onLoadingComplete={(img) => { (img as any).dataset.loaded = "true"; }} />
          </div>
        )}
        <div className="flex items-center justify-between px-3 pb-3 text-[11px] text-slate-500 dark:text-slate-400">
          <span className="group-hover:text-slate-600 dark:group-hover:text-slate-300">View on X</span>
          {views && <span>{views}</span>}
        </div>
      </article>
    </Link>
  );
}


