import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

interface Props {
  title: string;
  description: string;
  dates: string;
  location: string;
  image?: string;
  links?: readonly {
    icon: React.ReactNode;
    title: string;
    href: string;
  }[];
}

export function HackathonCard({
  title,
  description,
  dates,
  location,
  image,
  links,
}: Props) {
  return (
    <li className="relative ml-8 py-3">
      <div className="absolute -left-12 top-3 flex items-center justify-center">
        <Avatar className="size-8">
          <AvatarImage src={image} alt={title} className="object-contain" />
          <AvatarFallback className="text-[10px]">{title[0]}</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-1 flex-col justify-start gap-0.5">
        {dates && (
          <time className="text-[11px] text-muted-foreground">{dates}</time>
        )}
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-[13px] font-medium leading-tight">{title}</h2>
          {links && links.length > 0 && (
            <div className="flex flex-row items-center gap-2">
              {links?.map((link, idx) => (
                <Link
                  href={link.href}
                  key={idx}
                  title={link.title}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.icon}
                </Link>
              ))}
            </div>
          )}
        </div>
        {location && (
          <p className="text-[12px] text-muted-foreground">{location}</p>
        )}
        {description && (
          <span className="text-[12px] text-muted-foreground line-clamp-2">
            {description}
          </span>
        )}
      </div>
    </li>
  );
}
