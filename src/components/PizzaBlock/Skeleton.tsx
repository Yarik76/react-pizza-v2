import React from "react";
import ContentLoader from "react-content-loader";

export const Skeleton: React.FC = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 470"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="-2" y="276" rx="10" ry="10" width="280" height="25" /> 
    <rect x="0" y="321" rx="10" ry="10" width="280" height="88" />
    <rect x="0" y="429" rx="10" ry="10" width="95" height="30" />
    <circle cx="140" cy="135" r="120" />
    <rect x="127" y="423" rx="30" ry="30" width="152" height="45" />
  </ContentLoader>
);
