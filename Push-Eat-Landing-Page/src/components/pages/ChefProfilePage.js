import React, { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import styles from "./ChefProfilePage.module.css";

const establishedData = {
  chefName: "Oluwatosin Amara",
  handle: "@food_nuggets",
  kitchenName: "De food affairs",
  location: "Yaba, Lagos",
  specialty: "Abula & Pounded Yam",
  heroTitle: "De food affairs",
  heroSubtitle: "by Oluwatosin Amara",
  status: "Kitchen Live",
  rating: "4.9",
  reviews: "2.3k reviews",
  prep: "25",
  liveOrders: "12",
  bio1:
    "Nestled in the heart of Yaba, De food affairs has become the definitive 'Ghost Kitchen' for lovers of authentic Abula. Driven by data and passion, Chef Oluwatosin Amara specializes in high-volume, precision-cooked traditional soups that never compromise on depth or heritage.",
  bio2:
    "Operating exclusively through digital orders allows Chef Amara to focus entirely on ingredient sourcing. From the smoothest Gbegiri made from hand-picked beans to the fluffiest Amara stirred to perfection, every bowl is a testament to culinary discipline.",
  bio3:
    "With a daily queue of over 200 orders, De food affairs has mastered the art of delivering piping hot, restaurant-quality traditional meals directly to homes and offices across the mainland.",
  heroDesc:
    "Experience the authentic, smoky taste of Western Nigeria delivered straight to your door. Home of the famous \"Ghost Kitchen\" Abula.",
  heroImage:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBUii3Jp24n9vHEX4Gu4w21Y9R6Ja9CozGtporcvAtcrBk5un1FIMgZu5nSar28yI5L2NrL2p2yURdBQwA8L7nPt5aO4dbPPCHSCa8OhPbgNljMBct3W-cFzkNzc6U9Q936alJrLSzud8pCbxGjmfCJtJ8ohSnLUu7D3DeJrhqvc-fKrlIRW7BpH-hTBrzj-mpuOSShAlMBQv0u7NwFxLKGJqThHEL4DDMI25oYErIypo22sYOeM5ns19Ej71MWBRUY9Nm90PQsBIs",
  chefImage:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBPZ5jjHyYEa_UxhUP87MUMc8QNGMr1-m7WrLchNTIDmZUdZ7tYdsqRAf5RL-5W76VDjW4AAF5n3BzATdl-5XuPkCXN76lLCfOsd_NeZG5LS1oqi_VwG25rkpmE5xwVfvKRGrjkCMqsIyMRLA1BhQPoJ64P4wLK-P-89BW8ugnqApFcCEB75jyTaH5V0tuSKk3RsMogNxod326PAs9xf9-Duamsnf51vyn55sOtZOJWS83_XYjqFwGybbu1S5dLqicfE00lMHbIx_E",
  videoImage:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBPZ5jjHyYEa_UxhUP87MUMc8QNGMr1-m7WrLchNTIDmZUdZ7tYdsqRAf5RL-5W76VDjW4AAF5n3BzATdl-5XuPkCXN76lLCfOsd_NeZG5LS1oqi_VwG25rkpmE5xwVfvKRGrjkCMqsIyMRLA1BhQPoJ64P4wLK-P-89BW8ugnqApFcCEB75jyTaH5V0tuSKk3RsMogNxod326PAs9xf9-Duamsnf51vyn55sOtZOJWS83_XYjqFwGybbu1S5dLqicfE00lMHbIx_E",
  dishes: [
    {
      name: "Jollof Special",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAeETyC1RYvQ2XzwB7FJd1h8U3uqvXj0IeJdOwJpLKEz920alEqXSurFQK6L9jZoQ3fXAtjZ7ScE10PQ4DZjHjInRPTl9EBhf9foveTBg9uYC8BcjcGZr8-Xv5TdqkmluoB6G7CEyfAlqDBGaMtP6aOI5A_FzT4iuCv-iEsXTrBDunUWJRh0YUkQ6LR64ZnuBuVsSOAUF3Tk85r6CS8Y8vIH2WJpu9DsHqucJThmHlmzhNQ0i4GKyEoROIosndpxXntCp8-mIXCcN0"
    },
    {
      name: "Farm Salad",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD_vTxKPcHN70f9cNTngbXRw2Zc0V2kdYzYcFKqOUyeD5CPfH4AfmgVZl2FlqbVrPFyakfWn5fYUbvvB2rzNvRSCLKsWzkr95CZ7RNuyzEidQj_AzR0f0XoqaSBPLwGkx0DhaFB4bnhzAL_c2FAUp7iFwU6IOUGs109pNfvnAsGrWUKauWJn5BvZe0MnZhiThjU0jWirrToOrRNj7g9Kuv2KQSsu4PnOIJzmOMZJw1phMAemE5wZOdNELi0zB3oA2AVAwAjctvhzg8"
    },
    {
      name: "Grilled Catfish",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCFEiDLmrPlmkLjOZNsJ4zGMOKg3I-UNqlvJHED3ZYS65TY88AFzmxpxt3w5N_s1hci-iQBJhANAF1vecBxxDkKjvyjhoWLqDJ2OTEfv1b1nJMQe8RHgjtMgmmMtr14uKzQU1548PhNet2RPygVU1dHomtcWFNBVZE5ddqfMaXV6dZxyoj3tr14zvcFtty4EQT61ILKXKieWRsFk2wQOZhlscMyxoBXJGgPiSpdt-C0Q--pQaqdC9cIc8OcpEz-RPV2Y8e6h5l-W88"
    }
  ]
};

const newChefData = {
  chefName: "Titilayo Adebayo",
  handle: "@cheftiti_yaba",
  kitchenName: "Mama T's Kitchen",
  location: "Yaba, Lagos",
  specialty: "Abula & Pounded Yam",
  heroTitle: "The Amala",
  heroSubtitle: "Ghost Kitchen",
  status: "New Arrival",
  rating: "4.6",
  reviews: "joined recently",
  prep: "30 mins",
  liveOrders: "0",
  bio1:
    "Known locally as the \"Amala Queen,\" Chef Titilayo has built a silent empire in Yaba purely on word-of-mouth. Her 'Ghost Kitchen' model focuses exclusively on delivery, ensuring that every naira goes into the quality of ingredients rather than decor.",
  bio2:
    "Neighbors swear by her Efo Riro, often selling out before 2 PM daily.",
  heroImage:
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1800&q=80&auto=format&fit=crop",
  chefImage:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBPZ5jjHyYEa_UxhUP87MUMc8QNGMr1-m7WrLchNTIDmZUdZ7tYdsqRAf5RL-5W76VDjW4AAF5n3BzATdl-5XuPkCXN76lLCfOsd_NeZG5LS1oqi_VwG25rkpmE5xwVfvKRGrjkCMqsIyMRLA1BhQPoJ64P4wLK-P-89BW8ugnqApFcCEB75jyTaH5V0tuSKk3RsMogNxod326PAs9xf9-Duamsnf51vyn55sOtZOJWS83_XYjqFwGybbu1S5dLqicfE00lMHbIx_E",
  videoImage:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBUii3Jp24n9vHEX4Gu4w21Y9R6Ja9CozGtporcvAtcrBk5un1FIMgZu5nSar28yI5L2NrL2p2yURdBQwA8L7nPt5aO4dbPPCHSCa8OhPbgNljMBct3W-cFzkNzc6U9Q936alJrLSzud8pCbxGjmfCJtJ8ohSnLUu7D3DeJrhqvc-fKrlIRW7BpH-hTBrzj-mpuOSShAlMBQv0u7NwFxLKGJqThHEL4DDMI25oYErIypo22sYOeM5ns19Ej71MWBRUY9Nm90PQsBIs",
  dishes: [
    {
      name: "Smoky Jollof",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAeETyC1RYvQ2XzwB7FJd1h8U3uqvXj0IeJdOwJpLKEz920alEqXSurFQK6L9jZoQ3fXAtjZ7ScE10PQ4DZjHjInRPTl9EBhf9foveTBg9uYC8BcjcGZr8-Xv5TdqkmluoB6G7CEyfAlqDBGaMtP6aOI5A_FzT4iuCv-iEsXTrBDunUWJRh0YUkQ6LR64ZnuBuVsSOAUF3Tk85r6CS8Y8vIH2WJpu9DsHqucJThmHlmzhNQ0i4GKyEoROIosndpxXntCp8-mIXCcN0"
    },
    {
      name: "Farm Fresh Salad",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD_vTxKPcHN70f9cNTngbXRw2Zc0V2kdYzYcFKqOUyeD5CPfH4AfmgVZl2FlqbVrPFyakfWn5fYUbvvB2rzNvRSCLKsWzkr95CZ7RNuyzEidQj_AzR0f0XoqaSBPLwGkx0DhaFB4bnhzAL_c2FAUp7iFwU6IOUGs109pNfvnAsGrWUKauWJn5BvZe0MnZhiThjU0jWirrToOrRNj7g9Kuv2KQSsu4PnOIJzmOMZJw1phMAemE5wZOdNELi0zB3oA2AVAwAjctvhzg8"
    },
    {
      name: "Grilled Catfish",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCFEiDLmrPlmkLjOZNsJ4zGMOKg3I-UNqlvJHED3ZYS65TY88AFzmxpxt3w5N_s1hci-iQBJhANAF1vecBxxDkKjvyjhoWLqDJ2OTEfv1b1nJMQe8RHgjtMgmmMtr14uKzQU1548PhNet2RPygVU1dHomtcWFNBVZE5ddqfMaXV6dZxyoj3tr14zvcFtty4EQT61ILKXKieWRsFk2wQOZhlscMyxoBXJGgPiSpdt-C0Q--pQaqdC9cIc8OcpEz-RPV2Y8e6h5l-W88"
    }
  ]
};

const slugToTitle = (slug) => {
  if (!slug) return "Chef Profile";
  return slug
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const ChefProfilePage = ({ isNew = false }) => {
  const { slug } = useParams();
  const pageData = isNew ? newChefData : establishedData;

  const seoTitle = useMemo(() => {
    const chefLabel = slugToTitle(slug);
    return `${chefLabel} | ${pageData.specialty} in ${pageData.location} | Pusheat`;
  }, [slug, pageData.specialty, pageData.location]);

  const ctaHref = "https://apps.apple.com/ng/app/pusheat/id6749077010";

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta
          name="description"
          content={`${pageData.chefName} serves ${pageData.specialty} in ${pageData.location}.`}
        />
      </Helmet>

      <main className={styles.page}>
        {isNew ? (
          <>
            {/* --- NEW CHEF LAYOUT (Chef Titi) --- */}
            <section className={styles.newHeroSection}>
              <div className={styles.portraitWrapper}>
                <div className={styles.portraitCard}>
                  <img src={pageData.chefImage} alt={pageData.chefName} loading="eager" decoding="async" />
                  <div className={styles.portraitVignette} />
                </div>
              </div>

              <div className={styles.newHeroContent}>
                <div className={styles.heroTopRow}>
                  <span className={styles.metaChip}>
                    <span className={styles.dot}></span>
                    {pageData.status}
                  </span>
                </div>
                <h1 className={styles.combinedHeroTitle}>
                  {pageData.heroTitle} <br />
                  <span className={styles.ghostKitchenText}>{pageData.heroSubtitle}</span>
                </h1>

                <div className={styles.chefIdentityRow}>
                  <h2 className={styles.chefNameLine}>
                    {pageData.chefName}
                    <span className={styles.handleSpan}>{pageData.handle}</span>
                  </h2>
                  <p className={styles.kitchenTag}>{pageData.kitchenName}</p>
                </div>

                <blockquote className={styles.quoteBlock}>
                  "Redefining the Abula experience in Yaba. I specialize in slow-cooked Gbegiri and ultra-smooth Amala, sourcing organic yams directly from Oyo State to your doorstep."
                </blockquote>

                <div className={styles.tagRow}>
                  <span>Western Nigerian Cuisine</span>
                  <span>Cloud Kitchen</span>
                  <span>{pageData.location}</span>
                </div>

              </div>
            </section>

            <section className={styles.editorialGrid}>
              <article className={styles.editorialCard}>
                <div className={styles.cardWatermark}>
                  <span className="material-symbols-outlined">psychology</span>
                </div>
                <h3 className={styles.editorialHeading}>Neighborhood Reputation</h3>
                <div className={styles.editorialProse}>
                  <p>{pageData.bio1}</p>
                  <p>{pageData.bio2}</p>
                </div>
                <div className={styles.specialtyRow}>
                  <span className={styles.specLabel}>Specialty</span>
                  <span className={styles.specValue}>{pageData.specialty}</span>
                </div>
              </article>

              <article className={styles.signatureCard}>
                <div className={styles.sigImageWrapper}>
                  <img src={pageData.videoImage} alt="The Classic Abula" />
                  <div className={styles.sigOverlay} />
                </div>
                <div className={styles.sigContent}>
                  <span className={styles.sigPill}>Signature Dish</span>
                  <h3 className={styles.sigHeading}>The Classic Abula</h3>
                  <p className={styles.sigDesc}>Served with assorted meats and ponmo, cooked to perfection.</p>
                </div>
              </article>

              <article className={styles.comingSoonCard}>
                <div className={styles.csDots} />
                <div className={styles.csContent}>
                  <div className={styles.csIcon}>
                    <span className="material-symbols-outlined">timer</span>
                  </div>
                  <h3 className={styles.csHeading}>Deals Coming Soon</h3>
                  <p className={styles.csDesc}>
                    Chef Titilayo is currently curating exclusive launch offers. Download the app to get notified when her kitchen goes live with deals.
                  </p>
                  <a href={ctaHref} target="_blank" rel="noopener noreferrer" className={styles.btnNotify}>
                    Notify Me
                  </a>
                </div>
              </article>
            </section>

            <section className={styles.menuSection}>
              <div className={styles.menuHead}>
                <h3 className={styles.menuTitleH3}>Menu Highlights</h3>
                <span className={styles.menuSubText}>{pageData.dishes.length} Items Listed</span>
              </div>
              <div className={styles.menuGrid}>
                {pageData.dishes.map((dish) => (
                  <article className={styles.menuTile} key={`menu-${dish.name}`}>
                    <img src={dish.image} alt={dish.name} loading="lazy" decoding="async" />
                    <div className={styles.menuOverlay}>{dish.name}</div>
                  </article>
                ))}
                <button className={styles.fullMenuTile} type="button">
                  <span className="material-symbols-outlined">add_circle</span>
                  <span className={styles.fmtText}>Full Menu</span>
                </button>
              </div>
            </section>
          </>
        ) : (
          <>
            {/* --- ESTABLISHED CHEF LAYOUT (De food affairs Bento) --- */}
            <div className={styles.estMain}>
              <section className={styles.estHeroWrapper}>
                <div className={styles.estHeroBg} style={{ backgroundImage: `url(${pageData.heroImage})` }}></div>
                <div className={styles.estHeroOverlay}></div>
                <div className={styles.estHeroContent}>
                  <div className={styles.estHeroLeft}>
                    <div className={styles.estChips}>
                      <span className={styles.estChipTop}>Top Rated</span>
                      <span className={styles.estChipVerified}>
                        <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>verified</span>
                        Verified Chef
                      </span>
                      <span className={styles.estChipRating}>
                        <span className="material-symbols-outlined" style={{ color: "#facc15", fontSize: "16px" }}>star</span>
                        {pageData.rating} ({pageData.reviews})
                      </span>
                      <span className={styles.estChipHandle}>{pageData.handle}</span>
                    </div>
                    <h1 className={styles.estTitle}>
                      {pageData.heroTitle}
                      <span className={styles.estTitleSerif}>{pageData.heroSubtitle}</span>
                    </h1>
                    <p className={styles.estDesc}>{pageData.heroDesc}</p>
                  </div>
                  <div className={styles.estHeroRight}>
                    <div className={styles.estStatusBox}>
                      <div className={styles.estStatusRow}>
                        <span className={styles.estStatusLabel}>Status</span>
                        <div className={styles.estStatusDot}></div>
                      </div>
                      <div className={styles.estStatusText}>
                        <span className="material-symbols-outlined">skillet</span>
                        {pageData.status}
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <div className={styles.bentoGrid}>
                <div className={styles.bentoCol1}>
                  <div className={`${styles.bentoCard} ${styles.bentoStory}`}>
                    <div className={styles.bentoStoryWatermark}>
                      <span className="material-symbols-outlined">history_edu</span>
                    </div>
                    <h2 className={styles.bentoStoryTitle}>
                      The Story Behind<br /><span>The Flavor</span>
                    </h2>
                    <div className={styles.bentoStoryProse}>
                      <p>
                        Nestled in the heart of Yaba, <strong>{pageData.kitchenName}</strong> has become the definitive 'Ghost Kitchen' for lovers of authentic Abula. Driven by data and passion, Chef Oluwatosin Amara specializes in high-volume, precision-cooked traditional soups that never compromise on depth or heritage.
                      </p>
                      <p>
                        Operating exclusively through digital orders allows Chef Amara to focus entirely on ingredient sourcing. From the smoothest Gbegiri made from hand-picked beans to the fluffiest Amara stirred to perfection, every bowl is a testament to culinary discipline.
                      </p>
                      <div className={styles.bentoStoryQuote}>
                        "Modern logistics meets ancient recipes. We don't just cook; we engineer nostalgia for the modern Lagosian."
                      </div>
                      <p>{pageData.bio3}</p>
                    </div>
                    <div className={styles.bentoStoryMeta}>
                      <div className={styles.bentoMetaItem}>
                        <span className={styles.bentoMetaLabel}>Specialty</span>
                        <span className={styles.bentoMetaValue}>{pageData.specialty}</span>
                      </div>
                      <div className={styles.bentoMetaDivider}></div>
                      <div className={styles.bentoMetaItem}>
                        <span className={styles.bentoMetaLabel}>Location</span>
                        <span className={styles.bentoMetaValue}>{pageData.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.bentoCol2}>
                  <div className={styles.bentoStatsRow}>
                    <div className={`${styles.bentoCard} ${styles.bentoStatCard}`}>
                      <div className={styles.statIcon1}>
                        <span className="material-symbols-outlined">timelapse</span>
                      </div>
                      <p className={styles.statLabel}>Avg Prep Time</p>
                      <div className={styles.statValueRow}>
                        <span className={styles.statValue}>{pageData.prep}</span>
                        <span className={styles.statUnit}>mins</span>
                      </div>
                      <div className={styles.statProgressWrap}>
                        <div className={styles.statProgressLine} style={{ width: "45%" }}></div>
                      </div>
                      <p className={styles.statFastInfo}>
                        <span className="material-symbols-outlined" style={{ fontSize: "12px" }}>bolt</span> Fast
                      </p>
                    </div>

                    <div className={`${styles.bentoCard} ${styles.bentoStatCard}`}>
                      <div className={styles.statIcon2}>
                        <span className="material-symbols-outlined">local_fire_department</span>
                      </div>
                      <p className={styles.statLabel}>Live Orders</p>
                      <div className={styles.statValueRow}>
                        <span className={styles.statValue}>{pageData.liveOrders}</span>
                        <span className={styles.statUnit}>in queue</span>
                      </div>
                      <div className={styles.statQueueChart}>
                        <div className={`${styles.statQueueBar}`} style={{ height: "30%" }}></div>
                        <div className={`${styles.statQueueBar}`} style={{ height: "50%" }}></div>
                        <div className={`${styles.statQueueBar} ${styles["active-half"]}`} style={{ height: "40%" }}></div>
                        <div className={`${styles.statQueueBar} ${styles.active}`} style={{ height: "70%" }}></div>
                        <div className={`${styles.statQueueBar} ${styles.active}`} style={{ height: "60%" }}></div>
                      </div>
                    </div>
                  </div>

                  <div className={`${styles.bentoCard} ${styles.bentoVideoCard}`}>
                    <div className={styles.bentoVideoBg} style={{ backgroundImage: `url(${pageData.chefImage})` }}></div>
                    <div className={styles.bentoVideoOverlayCenter}>
                      <div className={styles.playCircle}>
                        <span className="material-symbols-outlined">play_arrow</span>
                      </div>
                    </div>
                    <div className={styles.bentoVideoOverlayBottom}>
                      <div className={styles.videoDealTag}>
                        <span className={styles.vdLive}>Live Deal</span>
                        <span className={styles.vdTime}>Ends in 02:14:05</span>
                      </div>
                      <h3 className={styles.videoTitle}>Watch: How we make the perfect Efo Riro</h3>
                    </div>
                  </div>
                </div>

                <div className={styles.bentoCol3}>
                  <div className={`${styles.bentoCard} ${styles.bentoDishes}`}>
                    <div className={styles.bentoDishesHead}>
                      <h3 className={styles.dishesTitleH3}>Signature Dishes</h3>
                      <a href="/" className={styles.dishesViewAll}>View All</a>
                    </div>
                    <div className={styles.bentoDishesGrid}>
                      {pageData.dishes.map((dish) => (
                        <div className={styles.bdTile} key={dish.name}>
                          <img src={dish.image} alt={dish.name} loading="lazy" decoding="async" />
                          <div className={styles.bdOverlay}>
                            <p className={styles.bdText}>{dish.name}</p>
                          </div>
                        </div>
                      ))}
                      <div className={styles.bdAddTile}>
                        <span className="material-symbols-outlined">add</span>
                        <p className={styles.bdAddText}>More</p>
                      </div>
                    </div>
                  </div>

                  <div className={`${styles.bentoCard} ${styles.bentoCta}`}>
                    <div className={styles.simpleIconWrap}>
                      <span className="material-symbols-outlined">shopping_bag</span>
                    </div>
                    <h3 className={styles.ctaTitle}>Hungry?</h3>
                    <p className={styles.ctaDesc}>Download the Pusheat app to order directly from Chef Amara's kitchen.</p>
                    <button className={styles.bentoBtnPrimary} onClick={() => window.open(ctaHref, "_blank")}>
                      Order Now
                      <span className="material-symbols-outlined">arrow_forward</span>
                    </button>
                    <div className={styles.ctaBottomInfo}>
                      <span className="material-symbols-outlined">check_circle</span>
                      <span>Available for delivery now</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default ChefProfilePage;
