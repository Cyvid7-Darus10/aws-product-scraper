let chromium: any;
try {
  chromium = require('chrome-aws-lambda');
} catch (error) {
  console.error(error);
}
import {
  getRandomUserAgent,
  getFirstImageMatch,
  getFirstMatch,
  titleSelectors,
  priceSelectors,
  imageSelectors,
  parsePrice,
} from './utils';

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
  if (!chromium) return { title: 'No Chromium Loaded', price: null, image: null };
  if (!url) return { title: 'No Url Sent', price: null, image: null };
  let result = null;
  let browser = null;
  let error = null;

  try {
    browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
      ignoreHTTPSErrors: false,
    });

    const page = await browser.newPage();
    await page.setUserAgent(getRandomUserAgent());
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    const title = await getFirstMatch(titleSelectors, page);
    const price = parsePrice(await getFirstMatch(priceSelectors, page));
    const image = await getFirstImageMatch(imageSelectors, page);

    result = { title, price, image };
  } catch (err) {
    error = err;
  } finally {
    if (browser !== null) {
      await browser.close();
    } else {
      return {
        message: 'Error scraping product from URL.',
        error: 'Browser is null | ' + error,
      };
    }
    return result || { title: 'No title found', price: null, image: null };
  }
};

export { scrapeProductFromUrl };
