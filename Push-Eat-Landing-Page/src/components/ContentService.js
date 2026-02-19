import Styles from "./ContentService.module.css";

function ContentService({ title, subtitle, lastUpdated, children }) {
  return (
    <div className={Styles.wrapper}>
      <section className={Styles.pageHero}>
        <h1>{title}</h1>
        {subtitle && <p className={Styles.sub}>{subtitle}</p>}
        {lastUpdated && <p className={Styles.meta}>{lastUpdated}</p>}
      </section>
      <main className={Styles.content}>
        {children}
      </main>
      <footer className={Styles.ft}>
        <p>&copy; {new Date().getFullYear()} Pusheat. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default ContentService;
