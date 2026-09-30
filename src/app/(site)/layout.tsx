import { Footer } from "@/components/site/footer";
import { MobileFilter } from "@/components/site/lens-enter";
import { Nav } from "@/components/site/nav";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col pb-10 pt-4 lg:px-8 lg:pt-6">
      <div className="px-4 lg:px-0">
        <Nav />
      </div>
      <main className="flex flex-1 flex-col">
        {children}
        <MobileFilter />
      </main>
      <div className="px-4 lg:px-0">
        <Footer />
      </div>
    </div>
  );
}
