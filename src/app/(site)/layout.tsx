import { Footer } from "@/components/site/footer";
import { Nav } from "@/components/site/nav";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col pb-10 pt-4 lg:px-8 lg:pt-6">
      <div className="px-4 lg:px-0">
        <Nav />
      </div>
      <main className="flex-1">{children}</main>
      <div className="px-4 lg:px-0">
        <Footer />
      </div>
    </div>
  );
}
