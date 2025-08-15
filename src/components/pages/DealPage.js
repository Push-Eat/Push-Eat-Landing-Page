import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './DealPage.module.css';

const DealPage = () => {
  const { dealId } = useParams();
  const navigate = useNavigate();
  const [deal, setDeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Mobile app redirect logic
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
    
    if (isMobile) {
      console.log('📱 Mobile user detected, attempting app redirect...');
      
      // Try app deep link first
      window.location.href = `pusheat://deal/${dealId}`;
      
      // Fallback to app store after 2.5 seconds if app doesn't open
      setTimeout(() => {
        const isAndroid = /Android/i.test(navigator.userAgent);
        const appStoreUrl = isAndroid 
          ? 'https://play.google.com/store/apps/details?id=ng.pushEats'
          : 'https://apps.apple.com/app/pusheat/id6749077010';
        
        console.log('🏪 Redirecting to app store:', appStoreUrl);
        window.location.href = appStoreUrl;
      }, 2500);
    }

    // Fetch deal data for display
    fetchDealData();
  }, [dealId]);

  const fetchDealData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://dev.pusheat.co/api/deal/get-deal-details/${dealId}`);
      
      if (!response.ok) {
        throw new Error('Deal not found');
      }
      
      const data = await response.json();
      const dealData = data.data || data;
      
      setDeal({
        title: dealData.title || 'Amazing Food Deal',
        caption: dealData.caption || dealData.title || 'Delicious food deal on PushEat',
        thumbnailUrl: dealData.thumbnailUrl !== 'None' ? dealData.thumbnailUrl : null,
        dealPrice: dealData.dealPrice,
        worthPrice: dealData.worthPrice,
        requiredCustomers: dealData.requiredCustomers,
        status: dealData.status,
        chef: {
          user: {
            username: dealData.chef?.user?.username || 'PushEat Chef',
            imageUrl: dealData.chef?.user?.imageUrl !== 'None' ? dealData.chef?.user?.imageUrl : null
          }
        }
      });
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
  const chefName = deal.chef?.user?.username || 'PushEat Chef';

  return (
    <div className="deal-page">
      <div className="deal-header">
        <h2>🍽️ PushEat</h2>
        <p>Social Food Delivery</p>
      </div>

      <div className="deal-content">
        <div className="deal-image-container">
          <img 
            src={deal.thumbnailUrl || '/images/default-deal.jpg'} 
            alt={deal.title}
            className="deal-image"
            onError={(e) => {
              e.target.src = '/images/default-deal.jpg';
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
          <h3>📱 Order on PushEat App</h3>
          <p>Get the full PushEat experience! Order this deal and discover thousands of other amazing food deals from verified chefs.</p>
          
          <div className="cta-buttons">
            <button
              onClick={() => window.location.href = `pusheat://deal/${dealId}`}
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
  );
};

export default DealPage;