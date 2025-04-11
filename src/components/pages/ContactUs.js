import React from "react";
import HelpContent from "../HelpContent";
import ContentService from "../ContentService";

function Help() {
  return (
    <div>
      <ContentService title="How Can We Help?" lastUpdated="03/05/2025">
        <HelpContent />
      </ContentService>
    </div>
  );
}

export default Help;
