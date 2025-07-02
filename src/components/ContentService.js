import frame from "../assets/frame.webp";
import Styles from "./ContentService.module.css";
import Navbar from "./Navbar";

function ContentService({ title, lastUpdated, titleClass, children }) {
  return (
    <div>
      <section className={Styles.service_wrapper}>
        <div className={Styles.services}>
          <div className={Styles.imageContainer}>
            <picture>
              <source srcSet="/frame.webp" type="image/webp" />
              <img
                src={frame}
                alt="services"
                loading="eager"
                width="5760"
                height="1712"
              />
            </picture>
          </div>
        </div>

        <div className={Styles.navbar}>
          <Navbar />
        </div>
        <div className={Styles.service_content}>
          <div className={Styles.content}>
            <h1
              className={[Styles.last_update, titleClass && Styles[titleClass]]
                .filter(Boolean)
                .join(" ")}
            >
              {title}
            </h1>

            {lastUpdated && (
              <p>
                Last Updated: <span>{lastUpdated}</span>
              </p>
            )}
          </div>
        </div>
      </section>
      {children}
    </div>
  );
}

export default ContentService;
