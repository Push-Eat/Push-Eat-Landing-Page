import React from "react";
import TermsText from "../TermsText";
import ContentService from "../ContentService";

function Privacy() {
  return (
    <>
      <ContentService title={"Terms of\nService"} lastUpdated="03/04/2025">
        <TermsText />
      </ContentService>
    </>
  );
}

export default Privacy;
