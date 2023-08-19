let chromium: any;
try {
  chromium = require('chrome-aws-lambda');
} catch (error) {
  console.error(error);
}
import { getRandomUserAgent, getFirstMatch, titleSelectors, priceSelectors, imageSelectors, parsePrice } from './utils';

interface Product {
  title?: string | null;
  price?: string | null;
  image?: string | null;
}

interface Error {
  message: string;
  error: unknown;
}

const scrapeProductFromUrl = async (url: string | undefined): Promise<Product | Error> => {
  if (!chromium) return { title: null, price: null, image: null };
  if (!url) return { title: null, price: null, image: null };
  const browser = await chromium.puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
    ignoreHTTPSErrors: false,
  });
  let result = null;

  try {
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    const title = await getFirstMatch(titleSelectors, page);
    const price = parsePrice(await getFirstMatch(priceSelectors, page));
    const image = await getFirstMatch(imageSelectors, page);

    result = { title, price, image };
  } catch (error) {
    return {
      message: 'Error scraping product from URL.',
      error: error,
    };
  } finally {
    await browser.close();
    return result || { title: null, price: null, image: null };
  }
};

export { scrapeProductFromUrl };
