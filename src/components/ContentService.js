import React from "react";
import Styles from "./ContentService.module.css";
import Navbar from "./Navbar";
import frame from "../assets/frame.png";

function ContentService({ title, lastUpdated, children }) {
  return (
    <div>
      <section className={Styles.services_wrapper}>
        <div className={Styles.services}>
          <img src={frame} alt="services" />
        </div>
        <div className={Styles.navbar}>
          <Navbar />
        </div>
        <div className={Styles.service_content}>
          <div className={Styles.content}>
            <h1 className={Styles.last_update}>{title}</h1>
            <p>{lastUpdated}</p>
          </div>
        </div>
      </section>
      {children}
    </div>
  );
}

export default ContentService;
