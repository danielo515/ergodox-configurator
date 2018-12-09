import React from "react";
import wrapWithProvider from "./wrap-with-provider";
export const wrapRootElement = wrapWithProvider;

export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents([
    <noscript key="noscript">
      This page works better with javascript enabled
    </noscript>
  ]);
};
