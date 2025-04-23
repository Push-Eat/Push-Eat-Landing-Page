import React from "react";
import ContentService from "../ContentService";
import PrivacyText from "../PrivacyText";

function Privacy() {
  return (
    <>
      <ContentService title={"Privacy\nPolicy"} lastUpdated="03/05/2025">
        <PrivacyText />
      </ContentService>
    </>
  );
}

export default Privacy;
