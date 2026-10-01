import { ALSO_SHIPPED, CONTACT, LENS_CARDS, LENSES, PROJECTS } from "@/data/site";
import { DESCRIPTION, SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

/*
 * llms.txt (llmstxt.org): the site as plain Markdown for AI tools and agents.
 * Built from the same data as the pages, so it can't drift from them.
 */
export function GET() {
  const projects = PROJECTS.map((p) => {
    const role = p.meta || p.mobileMeta;
    const head = `- [${p.name}](${SITE_URL}/#${p.id})${role ? ` (${role})` : ""}: ${p.description}`;
    return p.visit ? `${head} Website: ${p.visit}` : head;
  });

  const lenses = LENSES.map((l) =>
    [
      `## ${l.title}`,
      "",
      `[${l.seoTitle}](${SITE_URL}/${l.slug}): ${l.line}`,
      "",
      ...LENS_CARDS[l.slug].map((c) => `- ${c.title} (${c.project}): ${c.line}`),
    ].join("\n"),
  );

  const shipped = ALSO_SHIPPED.map((s) => `- [${s.name}](${s.href}) (${s.year}): ${s.line}`);

  const body = [
    "# Hasaam Bhatti",
    "",
    `> ${DESCRIPTION}`,
    "",
    "He builds software (web, iOS, Mac, AI agents) and sells physical products on Amazon, taking products from idea to shelf.",
    "",
    "## Featured work",
    "",
    ...projects,
    "",
    ...lenses.flatMap((l) => [l, ""]),
    "## Also shipped",
    "",
    ...shipped,
    "",
    "## Contact",
    "",
    `- Email: ${CONTACT.email}`,
    `- X: ${CONTACT.x}`,
    `- GitHub: ${CONTACT.github}`,
    `- LinkedIn: ${CONTACT.linkedin}`,
    "",
  ].join("\n");

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
