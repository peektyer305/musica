import Metadata from "@/interfaces/metadata";
import * as cheerio from "cheerio";

const FETCH_TIMEOUT_MS = 8000;
export async function fetchMetadata(targetUrl: string) {
    const ac = new AbortController();
    const timeout = setTimeout(() => ac.abort(), FETCH_TIMEOUT_MS);

    try {
        const response = await fetch(targetUrl, {
            signal: ac.signal,
            redirect: 'follow',
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; MusicaBot/1.0; +https://musica.example.com/bot)'
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('text/html')) {
            throw new Error('Response is not HTML');
        }

        const html = await response.text();
        const $ = cheerio.load(html);
  const base = new URL(targetUrl).toString();

  const meta = (sel: string) => $(sel).attr("content")?.trim();
  const text = (sel: string) => $(sel).first().text().trim();

  const out: Metadata = {};

  out.title = meta("meta[property='og:title']") || text("title") || undefined;
  out.description =
    meta("meta[property='og:description']") ||
    $("meta[name='description']").attr("content")?.trim() ||
    undefined;
  const ogImage = meta("meta[property='og:image']");
  out.image = ogImage ? new URL(ogImage, base).toString() : undefined;
  out.url = meta("meta[property='og:url']") || targetUrl;

  return out;
    } catch (error) {
        console.error('Error fetching metadata:', error);
        return null;
    } finally {
        clearTimeout(timeout);
    }
}