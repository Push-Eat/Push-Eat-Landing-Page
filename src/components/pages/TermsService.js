import React from "react";
import TermsText from "../TermsText";
import ContentService from "../ContentService";

function Privacy() {
  return (
    <>
      <ContentService title="Terms of Service" lastUpdated="03/04/2025">
        <TermsText />
      </ContentService>
    </>
  );
}

export default Privacy;
