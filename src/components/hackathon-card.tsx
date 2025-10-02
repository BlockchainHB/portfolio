import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
    <li className="relative ml-10 py-4">
      <div className="absolute -left-16 top-2 flex items-center justify-center bg-white rounded-full">
        <Avatar className="border size-12 m-auto">
          <AvatarImage src={image} alt={title} className="object-contain" />
          <AvatarFallback>{title[0]}</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-1 flex-col justify-start gap-1">
        {dates && (
          <time className="text-xs text-muted-foreground font-sans">{dates}</time>
        )}
        <div className="flex items-start justify-between gap-2">
          <h2 className="font-semibold leading-none font-sans">{title}</h2>
          {links && links.length > 0 && (
            <div className="flex flex-row items-start gap-1">
              {links?.map((link, idx) => (
                <Link href={link.href} key={idx}>
                  <Badge key={idx} title={link.title} className="flex gap-1 px-2 py-1 text-[10px]">
                    {link.icon}
                    {link.title}
                  </Badge>
                </Link>
              ))}
            </div>
          )}
        </div>
        {location && (
          <p className="text-sm text-muted-foreground font-sans">{location}</p>
        )}
        {description && (
          <span className="font-sans text-sm text-muted-foreground">
            {description}
          </span>
        )}
      </div>
    </li>
  );
}
