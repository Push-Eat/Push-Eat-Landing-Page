const API_BASE_URL = 'https://dev.pusheat.co/api';
const CACHE_DURATION = 300;

exports.handler = async (event, context) => {
  console.log('📧 Event:', JSON.stringify(event, null, 2));
  console.log('🌍 Context:', JSON.stringify(context, null, 2));

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
      }
    };
  }

  try {
    let dealId = null;
    if (event.path && event.path.includes('/deal/')) {
      dealId = event.path.split('/deal/')[1];
    }
    
    if (!dealId && event.queryStringParameters && event.queryStringParameters.dealId) {
      dealId = event.queryStringParameters.dealId;
    }

    console.log(`🔗 Processing deal meta for ID: ${dealId}`);

    if (!dealId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Deal ID is required' })
      };
    }

    const dealData = await fetchDealData(dealId);
    
    const html = generateDealHTML(dealData, dealId);
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': `public, s-maxage=${CACHE_DURATION}, stale-while-revalidate=86400`,
        'X-Netlify-Function': 'deal-meta',
        'Access-Control-Allow-Origin': '*'
      },
      body: html
    };
    
  } catch (error) {
    console.error('❌ Error processing deal meta:', error);
    
    const dealId = event.path?.split('/deal/')[1] || 'unknown';
    const fallbackHtml = generateFallbackHTML(dealId);
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=60',
      },
      body: fallbackHtml
    };
  }
};

async function fetchDealData(dealId) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

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

function generateDealHTML(deal, dealId) {
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

  const escapeHtml = (text) => {
    if (!text) return '';
    return text.toString()
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  };

  const safeTitle = escapeHtml(deal.title);
  const safeDescription = escapeHtml(description);
  const safeImageUrl = escapeHtml(imageUrl);
  const safeChefName = escapeHtml(chefName);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <title>${safeTitle} - Pusheat</title>
  <meta name="description" content="${safeDescription}" />
  
  <meta property="og:title" content="${safeTitle}${escapeHtml(discountText)}" />
  <meta property="og:description" content="${safeDescription}" />
  <meta property="og:image" content="${safeImageUrl}" />
  <meta property="og:url" content="https://pusheat.co/deal/${dealId}" />
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="Pusheat" />
  <meta property="og:locale" content="en_NG" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="${safeTitle} - Delicious food by ${safeChefName}" />
  
  <meta property="article:author" content="${safeChefName}" />
  <meta property="article:section" content="Food & Dining" />
  <meta property="og:price:amount" content="${deal.dealPrice || '0'}" />
  <meta property="og:price:currency" content="NGN" />
  
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${safeTitle}${escapeHtml(discountText)}" />
  <meta name="twitter:description" content="${safeDescription}" />
  <meta name="twitter:image" content="${safeImageUrl}" />
  <meta name="twitter:site" content="@pusheat" />
  <meta name="twitter:creator" content="@${safeChefName.replace(/\s+/g, '')}" />
  
  <meta property="al:android:package" content="ng.pushEats" />
  <meta property="al:android:url" content="pusheat://deal/${dealId}" />
  <meta property="al:android:app_name" content="Pusheat" />
  <meta property="al:ios:app_store_id" content="6749077010" />
  <meta property="al:ios:url" content="pusheat://deal/${dealId}" />
  <meta property="al:ios:app_name" content="Pusheat" />
  
  <link rel="canonical" href="https://pusheat.co/deal/${dealId}" />
  
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "${safeTitle}",
    "description": "${safeDescription}",
    "image": "${safeImageUrl}",
    "offers": {
      "@type": "Offer",
      "price": "${deal.dealPrice || '0'}",
      "priceCurrency": "NGN",
      "availability": "${deal.status === 'active' ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock'}",
      "seller": {
        "@type": "Person",
        "name": "${safeChefName}"
      }
    },
    "brand": {
      "@type": "Brand",
      "name": "Pusheat"
    },
    "category": "Food",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.5",
      "reviewCount": "50"
    }
  }
  </script>
  
  <style>
    body { 
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: linear-gradient(135deg, #ff6b35, #ff8c42);
      color: white;
      margin: 0;
      padding: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      text-align: center;
    }
    .container { max-width: 600px; }
    .logo { font-size: 2em; margin-bottom: 1em; }
    .deal-title { font-size: 1.5em; margin: 0.5em 0; }
    .deal-description { opacity: 0.9; margin-bottom: 1em; }
    .cta-button { 
      background: white; 
      color: #ff6b35; 
      padding: 15px 30px; 
      text-decoration: none; 
      border-radius: 25px; 
      font-weight: bold;
      display: inline-block;
      margin: 10px;
      transition: transform 0.2s;
    }
    .cta-button:hover { transform: scale(1.05); }
    .spinner { 
      animation: spin 1s linear infinite; 
      display: inline-block; 
      font-size: 2em;
      margin: 1em 0;
    }
    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">🍽️ Pusheat</div>
    <div class="spinner">⏳</div>
    <h1 class="deal-title">${safeTitle}</h1>
    <p class="deal-description">${safeDescription}</p>
    <p>by Chef ${safeChefName}</p>
    
    <div>
      <a href="pusheat://deal/${dealId}" class="cta-button">🚀 Open in App</a>
      <a href="https://play.google.com/store/apps/details?id=ng.pushEats" class="cta-button">📲 Get App</a>
    </div>
    
    <p style="margin-top: 2em; opacity: 0.8; font-size: 0.9em;">
      Redirecting to app automatically...
    </p>
  </div>

  <script>
    (function() {
      console.log('🔗 Deal page loaded for: ${dealId}');
      console.log('📱 User agent:', navigator.userAgent);
      
      // Detect social media crawlers - don't redirect them
      const userAgent = navigator.userAgent || '';
      const isCrawler = /facebook|twitter|linkedin|whatsapp|telegram|bot|crawler|spider/i.test(userAgent);
      
      if (isCrawler) {
        console.log('🤖 Social media crawler detected, not redirecting');
        return;
      }
      
      // Mobile app redirect logic
      const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      
      if (isMobile) {
        console.log('📱 Mobile user detected, attempting app redirect...');
        
        // Try app deep link first
        window.location.href = 'pusheat://deal/${dealId}';
        
        // Fallback to app store after delay
        setTimeout(function() {
          const isAndroid = /Android/i.test(navigator.userAgent);
          const appStoreUrl = isAndroid 
            ? 'https://play.google.com/store/apps/details?id=ng.pushEats'
            : 'https://apps.apple.com/app/pusheat/id6749077010';
          
          console.log('🏪 Redirecting to app store:', appStoreUrl);
          window.location.href = appStoreUrl;
        }, 2500);
      } else {
        // Desktop - redirect to main website
        setTimeout(function() {
          window.location.href = 'https://pusheat.co';
        }, 3000);
      }
    })();
  </script>
</body>
</html>`;
}

function generateFallbackHTML(dealId) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- Fallback meta tags -->
  <title>Amazing Food Deal - Pusheat</title>
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
  
  <style>
    body { 
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: linear-gradient(135deg, #ff6b35, #ff8c42);
      color: white;
      margin: 0;
      padding: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      text-align: center;
    }
    .container { max-width: 600px; }
    .logo { font-size: 2em; margin-bottom: 1em; }
    .cta-button { 
      background: white; 
      color: #ff6b35; 
      padding: 15px 30px; 
      text-decoration: none; 
      border-radius: 25px; 
      font-weight: bold;
      display: inline-block;
      margin: 10px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">🍽️ Pusheat</div>
    <h1>Amazing Food Deal</h1>
    <p>Discover amazing food deals on Pusheat!</p>
    <div>
      <a href="pusheat://deal/${dealId}" class="cta-button">🚀 Open in App</a>
      <a href="https://play.google.com/store/apps/details?id=ng.pushEats" class="cta-button">📲 Get App</a>
    </div>
  </div>
  
  <script>
    setTimeout(function() {
      const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      if (isMobile) {
        window.location.href = 'pusheat://deal/${dealId}';
      } else {
        window.location.href = 'https://pusheat.co';
      }
    }, 2000);
  </script>
</body>
</html>`;
}