const API_BASE_URL = 'https://api.int.pusheat.co/api';
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
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(`${API_BASE_URL}/social/discover/deal-posts/${dealId}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Pusheat-WebPreview/1.0'
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        console.warn('🔐 API Authentication failed - token may be expired');
        throw new Error('TOKEN_EXPIRED');
      }
      throw new Error(`API responded with status: ${response.status}`);
    }

    const postData = await response.json();

    console.log('📊 Raw API Response:', JSON.stringify(postData, null, 2));

    const dealData = postData.deal || {};
    const chefData = postData.chef?.user || {};

    return {
      title: dealData.title || postData.title || 'Amazing Food Deal',
      caption: dealData.caption || postData.caption || 'Delicious food deal on Pusheat',
      thumbnailUrl: postData.thumbnail_url && postData.thumbnail_url !== 'None' ? postData.thumbnail_url : null,
      dealPrice: dealData.deal_price,
      worthPrice: dealData.worth_price,
      status: dealData.status,
      chef: {
        user: {
          username: chefData.username || 'Pusheat Chef',
          imageUrl: chefData.image_url && chefData.image_url !== 'None' ? chefData.image_url : null
        }
      }
    };
  } finally {
    clearTimeout(timeoutId);
  }
}

function generateDealHTML(deal, dealId) {
  const chefName = deal.chef?.user?.username || 'Pusheat Chef';
  const imageUrl = deal.thumbnailUrl || deal.chef?.user?.imageUrl || 'https://pusheat.co/images/default-deal.jpg';

  const formatPrice = (price) => {
    if (!price) return '';
    const numPrice = parseFloat(price);
    return `₦${numPrice.toLocaleString('en-NG', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  const priceText = deal.dealPrice ? ` - ${formatPrice(deal.dealPrice)}` : '';

  const getStatusInfo = (status) => {
    const statusMap = {
      'ongoing': {
        text: 'Order Now',
        availability: 'https://schema.org/InStock',
        color: '#28a745', // Green
        bgColor: '#d4edda',
        icon: '🔥'
      },
      'upcoming': {
        text: 'Coming Soon',
        availability: 'https://schema.org/PreOrder',
        color: '#007bff', // Blue
        bgColor: '#d1ecf1',
        icon: '⏰'
      },
      'successful': {
        text: 'Successfully Completed',
        availability: 'https://schema.org/SoldOut',
        color: '#28a745', // Green
        bgColor: '#d4edda',
        icon: '✅'
      },
      'completed': {
        text: 'Deal Closed',
        availability: 'https://schema.org/SoldOut',
        color: '#6c757d', // Gray
        bgColor: '#f8f9fa',
        icon: '📋'
      },
      'failed': {
        text: 'Expired',
        availability: 'https://schema.org/Discontinued',
        color: '#dc3545', // Red
        bgColor: '#f8d7da',
        icon: '❌'
      },
      'pre_failed': {
        text: 'Expired',
        availability: 'https://schema.org/Discontinued',
        color: '#dc3545', // Red
        bgColor: '#f8d7da',
        icon: '❌'
      },

      'C': {
        text: 'Deal Closed',
        availability: 'https://schema.org/SoldOut',
        color: '#6c757d', // Gray
        bgColor: '#f8f9fa',
        icon: '📋'
      },
      'O': {
        text: 'Order Now',
        availability: 'https://schema.org/InStock',
        color: '#28a745', // Green
        bgColor: '#d4edda',
        icon: '🔥'
      },
      'U': {
        text: 'Coming Soon',
        availability: 'https://schema.org/PreOrder',
        color: '#007bff', // Blue
        bgColor: '#d1ecf1',
        icon: '⏰'
      },
      'S': {
        text: 'Successfully Completed',
        availability: 'https://schema.org/SoldOut',
        color: '#28a745', // Green
        bgColor: '#d4edda',
        icon: '✅'
      },
      'F': {
        text: 'Expired',
        availability: 'https://schema.org/Discontinued',
        color: '#dc3545', // Red
        bgColor: '#f8d7da',
        icon: '❌'
      }
    };

    return statusMap[status] || {
      text: 'Check Availability',
      availability: 'https://schema.org/InStock',
      color: '#ff6b35',
      bgColor: '#fff3cd',
      icon: '📱'
    };
  };

  const statusInfo = getStatusInfo(deal.status);

  const baseDescription = deal.caption || `Delicious ${deal.title} by Chef ${chefName}`;
  const description = `${baseDescription} • ${statusInfo.text} • Pusheat Food Delivery`.slice(0, 155);

  const escapeHtml = (text) => {
    if (!text) return '';
    return text.toString()
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  };

  const optimizedTitle = `${deal.title}${priceText} | Pusheat`.slice(0, 57);
  const socialTitle = `${deal.title}${priceText}`.slice(0, 55);

  const safeTitle = escapeHtml(optimizedTitle);
  const safeSocialTitle = escapeHtml(socialTitle);
  const safeDescription = escapeHtml(description);
  const safeImageUrl = escapeHtml(imageUrl);
  const safeChefName = escapeHtml(chefName);
  const safeStatusText = escapeHtml(statusInfo.text);
  const safePriceText = escapeHtml(priceText);
  const safeStatusIcon = escapeHtml(statusInfo.icon);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
  <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
  <meta name="keywords" content="Nigerian food, ${deal.title}, ${safeChefName}, food delivery Nigeria, Pusheat, Nigerian cuisine" />
  
  <title>${safeTitle}</title>
  <meta name="description" content="${safeDescription}" />
  
  <meta name="author" content="${safeChefName}" />
  <meta name="theme-color" content="#ff6b35" />
  <meta name="msapplication-TileColor" content="#ff6b35" />
  
  <meta property="og:title" content="${safeSocialTitle}" />
  <meta property="og:description" content="${safeDescription}" />
  <meta property="og:image" content="${safeImageUrl}" />
  <meta property="og:url" content="https://pusheat.co/deal/${dealId}" />
  <meta property="og:type" content="product" />
  <meta property="og:site_name" content="Pusheat" />
  <meta property="og:locale" content="en_NG" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="${deal.title} - Nigerian food by Chef ${safeChefName}" />
  
  <meta property="product:price:amount" content="${deal.dealPrice || '0'}" />
  <meta property="product:price:currency" content="NGN" />
  <meta property="product:availability" content="${statusInfo.text.toLowerCase()}" />
  <meta property="article:author" content="${safeChefName}" />
  <meta property="article:section" content="Nigerian Food Delivery" />
  
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${safeSocialTitle}" />
  <meta name="twitter:description" content="${safeDescription}" />
  <meta name="twitter:image" content="${safeImageUrl}" />
  <meta name="twitter:site" content="@pusheat" />
  <meta name="twitter:creator" content="@${safeChefName.replace(/\s+/g, '')}" />
  
  <meta name="twitter:label1" content="Price" />
  <meta name="twitter:data1" content="${formatPrice(deal.dealPrice) || 'Contact for price'}" />
  <meta name="twitter:label2" content="Status" />
  <meta name="twitter:data2" content="${safeStatusText}" />
  
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
    "@type": ["Product", "FoodItem"],
    "name": "${deal.title}",
    "description": "${safeDescription}",
    "image": ["${safeImageUrl}"],
    "category": ["Nigerian Cuisine", "Food Delivery", "Ready Meals"],
    "brand": {
      "@type": "Brand",
      "name": "Pusheat",
      "description": "Nigerian Food Delivery Platform",
      "url": "https://pusheat.co"
    },
    "offers": {
      "@type": "Offer",
      "price": "${deal.dealPrice || '0'}",
      "priceCurrency": "NGN",
      "priceSpecification": {
        "@type": "PriceSpecification",
        "price": "${deal.dealPrice || '0'}",
        "priceCurrency": "NGN"
      },
      "availability": "${statusInfo.availability}",
      "seller": {
        "@type": ["Person", "Chef"],
        "name": "${safeChefName}",
        "image": "${deal.chef?.user?.imageUrl || ''}",
        "jobTitle": "Professional Chef",
        "worksFor": {
          "@type": "Organization",
          "name": "Pusheat"
        }
      },
      "areaServed": {
        "@type": "Country", 
        "name": "Nigeria"
      },
      "deliveryMethod": "DeliveryModeOwnFleet"
    },
    "manufacturer": {
      "@type": "Person",
      "name": "${safeChefName}"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.5",
      "bestRating": "5",
      "worstRating": "1",
      "reviewCount": "50"
    },
    "nutrition": {
      "@type": "NutritionInformation",
      "calories": "varies"
    },
    "suitableForDiet": "varies",
    "applicationCategory": "Food Delivery",
    "operatingSystem": ["Android", "iOS"],
    "url": "https://pusheat.co/deal/${dealId}",
    "sameAs": [
      "https://play.google.com/store/apps/details?id=ng.pushEats",
      "https://apps.apple.com/app/pusheat/id6749077010"
    ]
  }
  </script>
  
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Pusheat",
    "description": "Nigerian food delivery platform connecting customers with local chefs",
    "url": "https://pusheat.co",
    "telephone": "+234",
    "areaServed": {
      "@type": "Country",
      "name": "Nigeria"
    },
    "serviceType": "Food Delivery Service",
    "hasMenu": {
      "@type": "Menu",
      "hasMenuSection": {
        "@type": "MenuSection",
        "name": "Featured Deals",
        "hasMenuItem": {
          "@type": "MenuItem",
          "name": "${deal.title}",
          "offers": {
            "@type": "Offer",
            "price": "${deal.dealPrice || '0'}",
            "priceCurrency": "NGN"
          }
        }
      }
    }
  }
  </script>
  
  <style>
    body { 
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: linear-gradient(135deg, #21B537, #1a942b);
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
      color: #21B537; 
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
    
    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 12px 20px;
      border-radius: 25px;
      font-weight: 600;
      font-size: 0.95em;
      margin: 15px 0;
      border: 2px solid rgba(255, 255, 255, 0.3);
      backdrop-filter: blur(10px);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
    }
    
    .status-badge:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
    }
    
    .price-display {
      font-size: 1.8em;
      font-weight: bold;
      color: #fff;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
      margin: 15px 0;
    }
    
    .chef-info {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      margin: 15px 0;
      opacity: 0.9;
    }
    
    .chef-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 2px solid rgba(255, 255, 255, 0.5);
      object-fit: cover;
    }
    
    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">🍽️ Pusheat</div>
    <div class="spinner">⏳</div>
    
    <h1 class="deal-title">${deal.title}</h1>
    
    <div class="status-badge" style="
      background: linear-gradient(135deg, ${statusInfo.bgColor}dd, ${statusInfo.bgColor}aa);
      color: ${statusInfo.color};
      border-color: ${statusInfo.color}50;
    ">
      <span style="font-size: 1.1em;">${safeStatusIcon}</span>
      <span>${safeStatusText}</span>
    </div>
    
    ${deal.dealPrice ? `<div class="price-display">${formatPrice(deal.dealPrice)}</div>` : ''}
    
    <div class="chef-info">
      ${deal.chef?.user?.imageUrl ?
      `<img src="${deal.chef.user.imageUrl}" alt="${safeChefName}" class="chef-avatar" />` :
      '<div style="width: 40px; height: 40px; border-radius: 50%; background: rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center; font-size: 1.2em;">👨‍🍳</div>'
    }
      <span>by Chef ${safeChefName}</span>
    </div>
    
    <p class="deal-description" style="font-size: 0.95em; line-height: 1.4;">${deal.caption || `Delicious ${deal.title} prepared with love`}</p>
    
    <div style="margin-top: 25px;">
      <a href="pusheat://deal/${dealId}" class="cta-button" style="background: rgba(255, 255, 255, 0.95); color: #21B537;">🚀 Open in App</a>
      <a href="https://play.google.com/store/apps/details?id=ng.pushEats" class="cta-button" style="background: rgba(255, 255, 255, 0.8); color: #21B537;">📲 Get App</a>
    </div>
    
    <p style="margin-top: 2em; opacity: 0.8; font-size: 0.9em;">
      Redirecting to app automatically...
    </p>
  </div>

  <script>
    (function() {
      console.log('🔗 Deal page loaded for: ${dealId}');
      console.log('📱 User agent:', navigator.userAgent);
      
      const userAgent = navigator.userAgent || '';
      const isCrawler = /facebook|twitter|linkedin|whatsapp|telegram|bot|crawler|spider/i.test(userAgent);
      
      if (isCrawler) {
        console.log('🤖 Social media crawler detected, not redirecting');
        return;
      }
      
      const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      
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
      } else {
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
      background: linear-gradient(135deg, #21B537, #1a942b);
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
      color: #21B537; 
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