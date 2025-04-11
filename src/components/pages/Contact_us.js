import React from "react";
import Help_content from "../Help_content";
import Content_service from "../Content_service";

function Help() {
  return (
    <div>
      <Content_service title="How Can We Help?" lastUpdated="03/05/2025">
        <Help_content />
      </Content_service>
    </div>
  );
}

export default Help;
