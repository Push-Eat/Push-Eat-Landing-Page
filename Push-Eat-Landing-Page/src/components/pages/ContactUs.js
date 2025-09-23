import React from "react";
import HelpContent from "../HelpContent";
import ContentService from "../ContentService";

function Help() {
  return (
    <div>
      <ContentService title={"How can\nwe help?"}>
        <HelpContent />
      </ContentService>
    </div>
  );
}

export default Help;
