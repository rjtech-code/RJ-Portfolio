// Which code-made illustration (src/Components/common/Spot.jsx) represents a portfolio category
const VARIANT_BY_CATEGORY = {
  Websites: "website",
  "Web Applications": "webapp",
  "SaaS Platforms": "saas",
  Dashboards: "chart",
  "E-Commerce": "ecommerce",
};

export const spotForCategory = (category) => VARIANT_BY_CATEGORY[category] || "code";
