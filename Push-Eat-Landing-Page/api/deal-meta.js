export const config = {
  runtime: 'edge',
};

const API_BASE_URL = 'https://dev.pusheat.co/api';
const CACHE_DURATION = 300; // 5 minutes

export default async function handler(request) {
  const { pathname, searchParams } = new URL(request.url);
  const dealId = pathname.split('/deal/')[1];

  if (!dealId || !pathname.startsWith('/deal/')) {
    return fetch(request);
  }

  console.log(`🔗 Processing deal meta for ID: ${dealId}`);

  try {
    const dealData = await fetchDealData(dealId);
    
    const response = await fetch(request);
    const html = await response.text();
    
    const modifiedHtml = injectDealMetaTags(html, dealData, dealId);
    
    return new Response(modifiedHtml, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': `public, s-maxage=${CACHE_DURATION}, stale-while-revalidate=86400`,
        'X-Edge-Function': 'deal-meta',
      },
    });
    
  } catch (error) {
    console.error('❌ Error processing deal meta:', error);
    
    const response = await fetch(request);
    const html = await response.text();
    const fallbackHtml = injectFallbackMetaTags(html, dealId);
    
    return new Response(fallbackHtml, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=60',
      },
    });
  }
}

async function fetchDealData(dealId) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(`${API_BASE_URL}/deal/get-deal-details/${dealId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Pusheat-WebPreview/1.0',
        'Accept': 'application/json',
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    const dealData = data.data || data;
    
    return {
      title: dealData.title || 'Amazing Food Deal',
      caption: dealData.caption || dealData.title || 'Delicious food deal on Pusheat',
      thumbnailUrl: dealData.thumbnailUrl !== 'None' ? dealData.thumbnailUrl : null,
      dealPrice: dealData.dealPrice,
      worthPrice: dealData.worthPrice,
      requiredCustomers: dealData.requiredCustomers,
      status: dealData.status,
      chef: {
        user: {
          username: dealData.chef?.user?.username || 'Pusheat Chef',
          imageUrl: dealData.chef?.user?.imageUrl !== 'None' ? dealData.chef?.user?.imageUrl : null
        }
      }
    };
  } finally {
    clearTimeout(timeoutId);
  }
}

function injectDealMetaTags(html, deal, dealId) {
  const chefName = deal.chef?.user?.username || 'Pusheat Chef';
  const imageUrl = deal.thumbnailUrl || 'https://pusheat.co/images/default-deal.jpg';
  const description = deal.caption || `Delicious ${deal.title} by ${chefName}. Order now on Pusheat!`;
  
  let discountText = '';
  if (deal.worthPrice && deal.dealPrice) {
    const worth = parseInt(deal.worthPrice);
    const dealPrice = parseInt(deal.dealPrice);
    const discount = Math.round(((worth - dealPrice) / worth) * 100);
    if (discount > 0) {
      discountText = ` (${discount}% OFF!)`;
    }
  }

  const metaTags = `
    <title>${deal.title} - Pusheat</title>
    <meta name="description" content="${description}" />
    
    <meta property="og:title" content="${deal.title}${discountText}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${imageUrl}" />
    <meta property="og:url" content="https://pusheat.co/deal/${dealId}" />
    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="Pusheat" />
    <meta property="og:locale" content="en_NG" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${deal.title} - Delicious food by ${chefName}" />
    
    <meta property="article:author" content="${chefName}" />
    <meta property="article:section" content="Food & Dining" />
    <meta property="og:price:amount" content="${deal.dealPrice || '0'}" />
    <meta property="og:price:currency" content="NGN" />
    
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${deal.title}${discountText}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${imageUrl}" />
    <meta name="twitter:site" content="@pusheat" />
    <meta name="twitter:creator" content="@${chefName.replace(/\s+/g, '')}" />
    
    <meta property="al:android:package" content="ng.pushEats" />
    <meta property="al:android:url" content="pusheat://deal/${dealId}" />
    <meta property="al:android:app_name" content="Pusheat" />
    <meta property="al:ios:app_store_id" content="6749077010" />
    <meta property="al:ios:url" content="pusheat://deal/${dealId}" />
    <meta property="al:ios:app_name" content="Pusheat" />
    
    <link rel="canonical" href="https://pusheat.co/deal/${dealId}" />
    
    <script>
      (function() {
        if (typeof window !== 'undefined' && window.location.pathname.includes('/deal/')) {
          const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
          if (isMobile) {
            console.log('📱 Mobile user detected, attempting app redirect...');
            window.location.href = 'pusheat://deal/${dealId}';
            setTimeout(function() {
              const isAndroid = /Android/i.test(navigator.userAgent);
              const appStoreUrl = isAndroid 
                ? 'https://play.google.com/store/apps/details?id=ng.pushEats'
                : 'https://apps.apple.com/app/pusheat/id6749077010';
              console.log('🏪 Redirecting to app store:', appStoreUrl);
              window.location.href = appStoreUrl;
            }, 2500);
          }
        }
      })();
    </script>
  `;

  const headTagEnd = html.indexOf('</head>');
  if (headTagEnd !== -1) {
    return html.substring(0, headTagEnd) + metaTags + html.substring(headTagEnd);
  }
  
  return html;
}

function injectFallbackMetaTags(html, dealId) {
  const fallbackTags = `
    <title>Food Deal - Pusheat</title>
    <meta name="description" content="Discover amazing food deals on Pusheat! Order from verified chefs and save money." />
    <meta property="og:title" content="Amazing Food Deal - Pusheat" />
    <meta property="og:description" content="Discover amazing food deals on Pusheat! Order from verified chefs and save money." />
    <meta property="og:image" content="https://pusheat.co/images/default-deal.jpg" />
    <meta property="og:url" content="https://pusheat.co/deal/${dealId}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Pusheat" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Amazing Food Deal - Pusheat" />
    <meta name="twitter:description" content="Discover amazing food deals on Pusheat! Order from verified chefs and save money." />
    <meta name="twitter:image" content="https://pusheat.co/images/default-deal.jpg" />
  `;

  const headTagEnd = html.indexOf('</head>');
  if (headTagEnd !== -1) {
    return html.substring(0, headTagEnd) + fallbackTags + html.substring(headTagEnd);
  }
  
  return html;
}