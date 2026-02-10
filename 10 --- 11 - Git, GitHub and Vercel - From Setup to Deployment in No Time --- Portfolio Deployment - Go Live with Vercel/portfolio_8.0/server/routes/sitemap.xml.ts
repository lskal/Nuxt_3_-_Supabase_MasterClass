import { SitemapStream, streamToPromise } from "sitemap";

export default defineEventHandler(async (event) => {
  setHeader(event, "content-type", "application/xml");

  const config = useRuntimeConfig();
  const hostname = config.public?.siteUrl || "http://localhost:3000"; //manage different hostnames in local and prod urls

  const items = await queryCollection(event, "pagesSiteMap").all();

  if (!items?.length) {
    throw createError({
      statusCode: 404,
      statusMessage: "No sitemap items found",
    });
  }

  // Optional: filter out routes you don't want
  const urls = items.map((i) => i.path).filter(Boolean);
  //.filter((p) => p !== "/blog"); // example: remove blog listing page

  const sitemap = new SitemapStream({ hostname });

  for (const url of urls) {
    sitemap.write({
      url,
      changefreq: "monthly",
    });
  }

  sitemap.end();

  const xml = await streamToPromise(sitemap);
  return xml;
});
