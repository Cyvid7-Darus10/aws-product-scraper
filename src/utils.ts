const userAgents = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; rv:78.0) Gecko/20100101 Firefox/78.0',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:78.0) Gecko/20100101 Firefox/78.0',
  'Mozilla/5.0 (X11; Linux i686; rv:78.0) Gecko/20100101 Firefox/78.0',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:86.0) Gecko/20100101 Firefox/86.0',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Safari/605.1.15',
  'Mozilla/5.0 (Windows NT 10.0; Trident/7.0; rv:11.0) like Gecko',
  'Mozilla/5.0 (Windows NT 10.0; Trident/7.0; rv:11.0) like Gecko',
  'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)',
  'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)',
  'Mozilla/5.0 (compatible; MSIE 11.0; Windows NT 6.3; Trident/7.0)',
  'Mozilla/5.0 (iPad; CPU OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
  'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
  'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:54.0) Gecko/20100101 Firefox/54.0',
  'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:60.0) Gecko/20100101 Firefox/60.0',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36',
  'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:15.0) Gecko/20100101 Firefox/15.0.1',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.167 Safari/537.36',
  'Mozilla/5.0 (X11; Linux x86_64; rv:60.0) Gecko/20100101 Firefox/60.0',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36',
  'Mozilla/5.0 (X11; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0',
  'Mozilla/5.0 (X11; Linux x86_64; rv:45.0) Gecko/20100101 Firefox/45.0',
  'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2227.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2226.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2225.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2224.3 Safari/537.36',
  'Mozilla/5.0 (Windows NT 6.2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2225.0 Safari/537.36',
  'Mozilla/5.0 (X11; OpenBSD i386) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.125 Safari/537.36',
];

const getRandomUserAgent = (): string => {
  return userAgents[Math.floor(Math.random() * userAgents.length)];
};

const titleSelectors = [
  '.product-title',
  '#productTitle',
  '.product-intro__head-name', // Shein title selector
  '.wt-mb-xs-2', // Etsy title selector
  '.product-single__title', // Shopify title selector
  '.PdpMasterProductDetails__heading',
  '.typography--secondary-heading',
  'h1',
  'title',
];

const priceSelectors = [
  '.a-offscreen',
  '.price',
  '.offer-price',
  '.goods-price__from_has-discount span',
  '.x-price-primary span',
  '.x-price-original span',
  '.product-intro__head-price', // Shein price selector
  '.wt-text-title-03', // Etsy price selector
  '.product-single__price', // Shopify price selector
  '.product_title.entry-title',
  '.price.regular-price',
  '.Paragraph .PdpMasterProductDetails__paragraph',
  '.PdpMasterProductDetails__paragraph',
  '.product-price-value',
];

const imageSelectors = [
  '#landingImage',
  '.product-image',
  '.lazyload .fsp-element',
  '.ux-image-carousel-item.active.image img',
  '.swiper-slide img',
  '.image-wrapper img',
  '.image img',
  '.product-image-carousel-item.active img',
  '.product-slideshow__mainSlide-image .product-slideshow__slide-active img',
  '.wt-max-width-full.wt-horizontal-center', // Etsy image selector
  '.product-single__photo img', // Shopify image selector
  '.swiper-slide-active img', // Shein image selector
  '.product-slideshow__slide-active img',
  '.product-slideshow__slide-active',
  '.slick-slide.slick-current img',
  '.magnifier-image',
  '.ImageV2',
  '.lazy-image',
  'img',
];

const parsePrice = (price: string | null): string | null => {
  let completePriceWithCurrencySymbol = price;
  if (price) {
    // Get the numeric part (including any decimal points) from the price
    let numericPart = price?.replace(/[^0-9.]/g, '');

    // Remove unnecessary trailing zeroes after the decimal point, and the decimal point itself if needed
    numericPart = parseFloat(numericPart).toString();

    // Get the non-numeric part from the price
    let nonNumericPart = price?.replace(/[0-9.]/g, '');

    // Remove any alphabetic characters (like country codes) from the non-numeric part
    nonNumericPart = nonNumericPart?.replace(/[a-zA-Z]/g, '').trim();

    // Construct the price with the non-numeric (currency symbol) part followed by the numeric part
    completePriceWithCurrencySymbol = nonNumericPart + numericPart;
  }

  return completePriceWithCurrencySymbol;
};

const getFirstMatch = async (selectors: string[], page: any) => {
  for (let selector of selectors) {
    try {
      const match = await page.$eval(selector, (elem: any) => elem.textContent.trim());
      if (match) return match;
    } catch (error) {
      // This error occurs if the selector is not found on the page. We can ignore it and move to the next selector.
    }
  }
  return null;
};

export { getRandomUserAgent, getFirstMatch, titleSelectors, priceSelectors, imageSelectors, parsePrice };
