import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import './DealPage.module.css';

const sanitizeDealId = (id) => {
  if (!id || typeof id !== 'string') return null;
  const sanitized = id.replace(/[^a-zA-Z0-9\-_]/g, '');
  return sanitized.length > 0 && sanitized.length <= 50 ? sanitized : null;
};

const safeRedirect = (url) => {
  try {
    if (!url || typeof url !== 'string') return false;
    
    const allowedPatterns = [
      /^pusheat:\/\/deal\/[a-zA-Z0-9\-_]+$/,
      /^https:\/\/play\.google\.com\/store\/apps\/details\?id=ng\.pushEats$/,
      /^https:\/\/apps\.apple\.com\/app\/pusheat\/id6749077010$/
    ];
    
    const isAllowed = allowedPatterns.some(pattern => pattern.test(url));
    
    if (isAllowed) {
      window.location.href = url;
      return true;
    } else {
      console.warn('Blocked unsafe redirect to:', url);
      return false;
    }
  } catch (error) {
    console.error('Error in safeRedirect:', error);
    return false;
  }
};

const sanitizeApiResponse = (data) => {
  if (!data || typeof data !== 'object') return null;
  
  const sanitizeText = (text, maxLength = 200) => {
    if (!text || typeof text !== 'string') return null;
    const cleaned = text
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<[^>]*>/g, '')
      .replace(/javascript:/gi, '')
      .trim();
    return cleaned.slice(0, maxLength);
  };
  
  return {
    title: sanitizeText(data.title, 200) || 'Amazing Food Deal',
    caption: sanitizeText(data.caption, 500),
    thumbnailUrl: isValidImageUrl(data.thumbnailUrl) ? data.thumbnailUrl : null,
    dealPrice: isValidPrice(data.dealPrice) ? data.dealPrice : null,
    worthPrice: isValidPrice(data.worthPrice) ? data.worthPrice : null,
    requiredCustomers: isValidNumber(data.requiredCustomers) ? data.requiredCustomers : null,
    status: sanitizeText(data.status, 20),
    chef: {
      user: {
        username: sanitizeText(data.chef?.user?.username, 50) || 'Pusheat Chef',
        imageUrl: isValidImageUrl(data.chef?.user?.imageUrl) 
          ? data.chef.user.imageUrl 
          : null
      }
    }
  };
};

const isValidImageUrl = (url) => {
  if (!url || typeof url !== 'string' || url === 'None') {
    console.log('❌ Invalid image URL:', url);
    return false;
  }
  
  try {
    const parsedUrl = new URL(url);
    console.log('🔍 Checking image URL:', url);
    console.log('🏠 Hostname:', parsedUrl.hostname);
    
    const allowedDomains = [
      'pusheat.co',
      'dev.pusheat.co', 
      'staging.pusheat.co',
      'api.pusheat.co',
      'cdn.pusheat.co',
      
      'cloudinary.com',
      'res.cloudinary.com',
      'amazonaws.com',
      's3.amazonaws.com',
      'googleusercontent.com',
      'firebasestorage.googleapis.com',
      
      'imgur.com',
      'unsplash.com',
      'pexels.com',
      'images.unsplash.com',
      
      'blob.core.windows.net',
      
      'digitaloceanspaces.com',
      'cdn.digitaloceanspaces.com',
    ];
    
    const isHttps = parsedUrl.protocol === 'https:';
    
    const isDomainAllowed = allowedDomains.some(domain => 
      parsedUrl.hostname === domain || 
      parsedUrl.hostname.endsWith('.' + domain)
    );
    
    const hasValidExtension = /\.(jpg|jpeg|png|webp|gif|svg)(\?|$)/i.test(parsedUrl.pathname);
    
    console.log('🔒 HTTPS:', isHttps);
    console.log('✅ Domain allowed:', isDomainAllowed);
    console.log('📁 Valid extension:', hasValidExtension);
    
    const isValid = isHttps && isDomainAllowed && hasValidExtension;
    
    if (!isValid) {
      if (!isHttps) console.warn('🚫 Blocked: Non-HTTPS URL');
      if (!isDomainAllowed) console.warn('🚫 Blocked: Untrusted domain');
      if (!hasValidExtension) console.warn('🚫 Blocked: Invalid file extension');
    } else {
      console.log('✅ Image URL validation passed');
    }
    
    return isValid;
    
  } catch (error) {
    console.error('❌ Error parsing image URL:', url, error);
    return false;
  }
};

const isValidPrice = (price) => {
  if (!price) return false;
  const num = parseInt(price);
  return !isNaN(num) && num >= 0 && num <= 1000000;
};

const isValidNumber = (num) => {
  if (!num) return false;
  const parsed = parseInt(num);
  return !isNaN(parsed) && parsed >= 1 && parsed <= 1000;
};

const DealPage = () => {
  const { dealId } = useParams();
  const navigate = useNavigate();
  const [deal, setDeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Validate dealId to prevent injection attacks
    const sanitizedDealId = sanitizeDealId(dealId);
    if (!sanitizedDealId) {
      setError(true);
      return;
    }

    // Mobile app redirect logic
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
    
    if (isMobile) {
      console.log('📱 Mobile user detected, attempting app redirect...');
      
      // Try app deep link first with validated ID
      safeRedirect(`pusheat://deal/${sanitizedDealId}`);
      
      // Fallback to app store after 2.5 seconds if app doesn't open
      setTimeout(() => {
        const isAndroid = /Android/i.test(navigator.userAgent);
        const appStoreUrl = isAndroid 
          ? 'https://play.google.com/store/apps/details?id=ng.pushEats'
          : 'https://apps.apple.com/app/pusheat/id6749077010';
        
        console.log('🏪 Redirecting to app store:', appStoreUrl);
        safeRedirect(appStoreUrl);
      }, 2500);
    }

    // Fetch deal data for display
    fetchDealData(sanitizedDealId);
  }, [dealId]);

  const fetchDealData = async (validatedDealId) => {
    try {
      setLoading(true);
      
      // Additional API security - use AbortController for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await fetch(`https://dev.pusheat.co/api/deal/get-deal-details/${validatedDealId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Pusheat-WebPreview/1.0',
          'Accept': 'application/json'
        },
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error('Deal not found');
      }
      
      const data = await response.json();
      const dealData = data.data || data;
      
      console.log('📊 Raw API Response:', JSON.stringify(data, null, 2));
      console.log('🔍 Deal Data:', JSON.stringify(dealData, null, 2));
      console.log('🖼️ Original thumbnailUrl:', dealData.thumbnailUrl);
      
      // Sanitize all API response data
      const sanitizedDeal = sanitizeApiResponse(dealData);
      
      console.log('🧹 Sanitized Deal:', JSON.stringify(sanitizedDeal, null, 2));
      console.log('🖼️ Final thumbnailUrl:', sanitizedDeal.thumbnailUrl);
      
      if (!sanitizedDeal) {
        throw new Error('Invalid deal data');
      }
      
      setDeal(sanitizedDeal);
    } catch (error) {
      console.error('Error fetching deal:', error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    if (!price) return 'N/A';
    const numPrice = parseInt(price);
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(numPrice);
  };

  const calculateDiscount = () => {
    if (!deal?.worthPrice || !deal?.dealPrice) return null;
    const worth = parseInt(deal.worthPrice);
    const dealPr = parseInt(deal.dealPrice);
    const discount = Math.round(((worth - dealPr) / worth) * 100);
    return discount > 0 ? discount : null;
  };

  if (loading) {
    return (
      <div className="deal-page-loading">
        <div className="loading-spinner">🍽️</div>
        <p>Loading amazing deal...</p>
      </div>
    );
  }

  if (error || !deal) {
    return (
      <div className="deal-page-error">
        <div className="error-content">
          <h1>🍽️ Deal Not Found</h1>
          <p>This deal is no longer available or has expired.</p>
          <button onClick={() => navigate('/')} className="back-button">
            Discover More Deals
          </button>
        </div>
      </div>
    );
  }

  const discount = calculateDiscount();
  const chefName = deal.chef?.user?.username || 'Pusheat Chef';

  return (
    <>
      <Helmet>
        <title>{deal.title} - Pusheat Food Deal</title>
        <meta
          name="description"
          content={`${deal.caption} - Order this amazing food deal by Chef ${chefName} on Pusheat. ${formatPrice(deal.dealPrice)} ${deal.worthPrice ? `(was ${formatPrice(deal.worthPrice)})` : ''}`}
        />
        <meta property="og:title" content={`${deal.title} - Pusheat`} />
        <meta property="og:description" content={deal.caption} />
        <meta property="og:image" content={deal.thumbnailUrl || 'https://pusheat1.netlify.app/Logo.png'} />
        <meta property="og:url" content={`https://pusheat1.netlify.app/deal/${dealId}`} />
        <link rel="canonical" href={`https://pusheat1.netlify.app/deal/${dealId}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": deal.title,
            "description": deal.caption,
            "image": deal.thumbnailUrl || 'https://pusheat1.netlify.app/Logo.png',
            "offers": {
              "@type": "Offer",
              "price": deal.dealPrice,
              "priceCurrency": "NGN",
              "availability": deal.status === 'active' ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
              "seller": {
                "@type": "Person",
                "name": chefName
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
          })}
        </script>
      </Helmet>
      <div className="deal-page">
      <div className="deal-header">
        <h2>🍽️ Pusheat</h2>
        <p>Social Food Delivery</p>
      </div>

      <div className="deal-content">
        <div className="deal-image-container">
          <img 
            src={deal.thumbnailUrl || '/Logo.png'} 
            alt={deal.title}
            className="deal-image"
            onError={(e) => {
              console.log('❌ Image failed to load:', e.target.src);
              // Try fallback images in order
              if (e.target.src.includes('/Logo.png')) {
                e.target.src = '/carousel1.webp';
              } else if (e.target.src.includes('/carousel1.webp')) {
                e.target.src = 'https://pusheat1.netlify.app/Logo.png';
              } else {
                // Final fallback - create a placeholder
                e.target.style.display = 'none';
                const placeholder = document.createElement('div');
                placeholder.style.cssText = `
                  width: 100%; 
                  height: 400px; 
                  background: linear-gradient(45deg, #ff6b35, #ff8c42);
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  color: white;
                  font-size: 24px;
                  font-weight: bold;
                `;
                placeholder.textContent = '🍽️ ' + deal.title;
                e.target.parentNode.appendChild(placeholder);
              }
            }}
            onLoad={(e) => {
              console.log('✅ Image loaded successfully:', e.target.src);
            }}
          />
        </div>
        
        <div className="deal-info">
          <div className="chef-info">
            {deal.chef?.user?.imageUrl ? (
              <img
                src={deal.chef.user.imageUrl}
                alt={chefName}
                className="chef-avatar"
              />
            ) : (
              <div className="chef-avatar-placeholder">👨‍🍳</div>
            )}
            <div>
              <p className="chef-name">Chef {chefName}</p>
              <p className="chef-label">Verified Chef</p>
            </div>
          </div>

          <h1 className="deal-title">{deal.title}</h1>
          
          {deal.caption && (
            <p className="deal-description">{deal.caption}</p>
          )}

          <div className="pricing">
            <div className="price-row">
              <span className="deal-price">{formatPrice(deal.dealPrice)}</span>
              {deal.worthPrice && (
                <>
                  <span className="original-price">{formatPrice(deal.worthPrice)}</span>
                  {discount && (
                    <span className="discount-badge">{discount}% OFF</span>
                  )}
                </>
              )}
            </div>
            {deal.requiredCustomers && (
              <p className="min-customers">
                Minimum {deal.requiredCustomers} customers required
              </p>
            )}
          </div>

          {deal.status && (
            <div className="status-badge">
              <span className={`status ${deal.status.toLowerCase()}`}>
                {deal.status.charAt(0).toUpperCase() + deal.status.slice(1)}
              </span>
            </div>
          )}
        </div>
        
        <div className="cta-section">
          <h3>📱 Order on Pusheat App</h3>
          <p>Get the full Pusheat experience! Order this deal and discover thousands of other amazing food deals from verified chefs.</p>
          
          <div className="cta-buttons">
            <button
              onClick={() => safeRedirect(`pusheat://deal/${sanitizeDealId(dealId)}`)}
              className="cta-button primary"
            >
              🚀 Open in App
            </button>
            <a
              href="https://play.google.com/store/apps/details?id=ng.pushEats"
              className="cta-button secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              📲 Get on Play Store
            </a>
          </div>
          
          <div className="features">
            <div className="feature">
              <div className="feature-icon">🎥</div>
              <strong>Video Reviews</strong>
              <p>See every dish before you order</p>
            </div>
            <div className="feature">
              <div className="feature-icon">💰</div>
              <strong>Group Deals</strong>
              <p>Save more when ordering with friends</p>
            </div>
            <div className="feature">
              <div className="feature-icon">🚚</div>
              <strong>Fast Delivery</strong>
              <p>Fresh food delivered to your doorstep</p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default DealPage;