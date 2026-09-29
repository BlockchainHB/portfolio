/*
 * Structured data, server-rendered into the HTML so crawlers that don't run
 * JavaScript still read it. `<` is escaped so no string can close the tag.
 */
export function JsonLd({ graph }: { graph: object[] }) {
  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
