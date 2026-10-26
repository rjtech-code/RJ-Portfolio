import {
  SiAxios, SiChartdotjs, SiCloudinary, SiCss, SiCypress, SiDocker, SiEslint, SiExpress, SiFigma, SiFirebase, SiFramer,
  SiGit, SiGithub, SiGoogleanalytics, SiGooglesearchconsole, SiGraphql, SiHtml5, SiJavascript, SiJest, SiJsonwebtokens,
  SiLighthouse, SiMiro, SiMongodb, SiMongoose, SiMysql, SiNetlify, SiNextdotjs, SiNginx, SiNodedotjs, SiOpenai, SiPaypal,
  SiPostgresql, SiPostman, SiPrisma, SiPython, SiRazorpay, SiReact, SiReacthookform, SiReactquery, SiReactrouter, SiRedis,
  SiRedux, SiRender, SiShopify, SiSocketdotio, SiStorybook, SiStripe, SiSwagger, SiTailwindcss, SiThreedotjs, SiTypescript,
  SiVercel, SiVite, SiVitest, SiWoocommerce, SiZod, SiCanva,
} from "react-icons/si";
import { Code } from "lucide-react";

// Technology name -> brand logo + colour (logos from the react-icons package)
const LOGOS = {
  HTML5: [SiHtml5, "#E34F26"], CSS3: [SiCss, "#3B82F6"], JavaScript: [SiJavascript, "#F7DF1E"], TypeScript: [SiTypescript, "#3178C6"],
  Python: [SiPython, "#FFD43B"], SQL: [SiMysql, "#5DA9E9"], GraphQL: [SiGraphql, "#E10098"],
  React: [SiReact, "#61DAFB"], "Next.js": [SiNextdotjs, "#FFFFFF"], Vite: [SiVite, "#A78BFA"], "Tailwind CSS": [SiTailwindcss, "#38BDF8"],
  Redux: [SiRedux, "#764ABC"], "React Query": [SiReactquery, "#FF4154"], "React Router": [SiReactrouter, "#CA4245"],
  "React Hook Form": [SiReacthookform, "#EC5990"], Zod: [SiZod, "#3E67B1"], Axios: [SiAxios, "#8B5CF6"],
  "Framer Motion": [SiFramer, "#FFFFFF"], "Chart.js": [SiChartdotjs, "#FF6384"], "Three.js": [SiThreedotjs, "#FFFFFF"],
  "Node.js": [SiNodedotjs, "#5FA04E"], Express: [SiExpress, "#FFFFFF"], "Socket.io": [SiSocketdotio, "#FFFFFF"], JWT: [SiJsonwebtokens, "#FB015B"],
  MongoDB: [SiMongodb, "#47A248"], Mongoose: [SiMongoose, "#C53030"], MySQL: [SiMysql, "#5DA9E9"], PostgreSQL: [SiPostgresql, "#6CA0DC"],
  Prisma: [SiPrisma, "#FFFFFF"], Firebase: [SiFirebase, "#FFCA28"], Redis: [SiRedis, "#FF4438"], "REST APIs": [SiSwagger, "#85EA2D"],
  "OpenAI API": [SiOpenai, "#FFFFFF"], Stripe: [SiStripe, "#635BFF"], Razorpay: [SiRazorpay, "#3395FF"], PayPal: [SiPaypal, "#169BD7"],
  Shopify: [SiShopify, "#7AB55C"], WooCommerce: [SiWoocommerce, "#96588A"], Cloudinary: [SiCloudinary, "#3448C5"],
  Figma: [SiFigma, "#F24E1E"], Miro: [SiMiro, "#FFD02F"], Canva: [SiCanva, "#00C4CC"], Storybook: [SiStorybook, "#FF4785"],
  Git: [SiGit, "#F05032"], GitHub: [SiGithub, "#FFFFFF"], Postman: [SiPostman, "#FF6C37"], ESLint: [SiEslint, "#8080F2"],
  Jest: [SiJest, "#C21325"], Vitest: [SiVitest, "#6E9F18"], Cypress: [SiCypress, "#69D3A7"], Lighthouse: [SiLighthouse, "#F44B21"],
  Docker: [SiDocker, "#2496ED"], Nginx: [SiNginx, "#009639"], Vercel: [SiVercel, "#FFFFFF"], Netlify: [SiNetlify, "#00C7B7"],
  Render: [SiRender, "#FFFFFF"], "Google Analytics": [SiGoogleanalytics, "#E37400"], "Search Console": [SiGooglesearchconsole, "#458CF5"],
};

const GROUPS = [
  ["languages", "Languages"],
  ["frameworks", "Frameworks & libraries"],
  ["data", "Databases & APIs"],
  ["tools", "Tools & platforms"],
];

export const TechChip = ({ name }) => {
  const [Logo, color] = LOGOS[name] || [Code, "#F97316"];
  return (
    <li className="group flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-[var(--rj-panel-border)] bg-[var(--rj-navy-950)]/60 hover:border-white/25 hover:-translate-y-0.5 transition-all">
      <Logo size={18} style={{ color }} aria-hidden="true" className="shrink-0" />
      <span className="text-sm font-medium text-white whitespace-nowrap">{name}</span>
    </li>
  );
};

// Grouped technology stack for a service page
export default function TechStack({ stack }) {
  return (
    <div className="grid sm:grid-cols-2 gap-5">
      {GROUPS.filter(([key]) => stack[key]?.length).map(([key, label]) => (
        <div key={key} className="p-6 rounded-2xl border border-[var(--rj-panel-border)] bg-[var(--rj-panel)]">
          <h3 className="text-sm font-semibold text-[var(--rj-cyan)] mb-4">{label}</h3>
          <ul className="flex flex-wrap gap-2.5">
            {stack[key].map((name) => <TechChip key={name} name={name} />)}
          </ul>
        </div>
      ))}
    </div>
  );
}
