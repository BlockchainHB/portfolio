import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

interface Props {
  title: string;
  description: string;
  dates: string;
  location: string;
  image?: string;
  href?: string;
  links?: readonly {
    icon: React.ReactNode;
    title?: string;
    type?: string;
    href: string;
  }[];
}

export function HackathonCard({
  title,
  description,
  dates,
  location,
  image,
  href,
  links,
}: Props) {
  return (
    <li className="relative ml-10 py-4">
      <div className="absolute -left-16 top-2 flex items-center justify-center bg-background rounded-full">
        <Avatar className="border size-12 m-auto">
          <AvatarImage src={image} alt={title} className="object-cover" />
          <AvatarFallback>{title[0]}</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-1 flex-col justify-start gap-1">
        {dates && (
          <time className="text-[11px] text-muted-foreground">{dates}</time>
        )}
        <div className="flex items-start justify-between gap-2">
          {href && href !== "#" ? (
            <Link href={href} className="text-[12.8px] font-medium leading-tight hover:text-primary transition-colors">
              {title}
            </Link>
          ) : (
            <h2 className="text-[12.8px] font-medium leading-tight">{title}</h2>
          )}
          {links && links.length > 0 && (
            <div className="flex flex-row items-center gap-2">
              {links?.map((link, idx) => (
                <Link
                  href={link.href}
                  key={idx}
                  className="text-[11px] text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.title || link.type}
                </Link>
              ))}
            </div>
          )}
        </div>
        {location && (
          <p className="text-[12.8px] text-muted-foreground">{location}</p>
        )}
        {description && (
          <span className="text-[12.8px] text-muted-foreground">
            {description}
          </span>
        )}
      </div>
    </li>
  );
}
