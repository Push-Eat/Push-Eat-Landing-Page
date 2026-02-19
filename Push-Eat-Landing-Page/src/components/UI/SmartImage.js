import React, { useState } from "react";

function SmartImage({ src, webpSrc, alt, ...rest }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div style={{ position: "relative", width: "100%", height: "auto" }}>
      {!loaded && (
        <div
          style={{
            backgroundColor: "#ccc",
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            borderRadius: "8px",
          }}
        />
      )}
      <picture>
        <source srcSet={webpSrc} type="image/webp" />
        <img
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          style={{
            display: "block",
            width: "100%",
            height: "auto",
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.5s ease-in",
          }}
          loading="eager"
          {...rest}
        />
      </picture>
    </div>
  );
}

export default SmartImage;
