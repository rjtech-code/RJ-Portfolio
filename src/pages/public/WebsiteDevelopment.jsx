import { getService } from "../../data/services";
import { Section } from "../../Components/common/primitives";
import ServiceLayout, { CardGrid, ListPanel } from "../../Components/public/ServiceLayout";

const SLUG = "website-development";
const workflow = [
  { title: "Plan pages & content", desc: "Agree on the sitemap, key messages and calls to action." },
  { title: "Design", desc: "Wireframes and a visual design that reflects your brand." },
  { title: "Build & optimise", desc: "Responsive development, SEO basics and performance checks." },
  { title: "Launch", desc: "Domain, hosting, Search Console and a handover walkthrough." },
];

export default function WebsiteDevelopment() {
  const service = getService(SLUG);
  return (
    <ServiceLayout slug={SLUG} illustration="monitor">
      <Section>
        <div className="grid lg:grid-cols-2 gap-6">
          <ListPanel title="What we solve" items={service.problems} accent />
          <ListPanel title="What's included" items={service.features} />
        </div>
      </Section>
      <Section tone="light" eyebrow="Types of websites" title="Websites we build">
        <CardGrid items={service.offerings} spots={["website", "code", "chart", "rocket"]} />
      </Section>
      <Section eyebrow="Workflow" title="Our website development workflow">
        <CardGrid items={workflow} />
      </Section>
    </ServiceLayout>
  );
}
