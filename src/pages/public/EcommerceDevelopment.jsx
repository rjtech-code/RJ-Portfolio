import { CreditCard, LayoutGrid, Package, ShoppingCart } from "lucide-react";
import { getService } from "../../data/services";
import { Section } from "../../Components/common/primitives";
import ServiceLayout, { ListPanel } from "../../Components/public/ServiceLayout";
import { HeroIllustration } from "../../Components/public/Illustrations";

const SLUG = "ecommerce-development";
const storeFeatures = [
  { icon: LayoutGrid, title: "Product catalogue", desc: "Categories, filters and search so customers find products quickly." },
  { icon: Package, title: "Product details", desc: "Images, variants, pricing and stock shown clearly on every product page." },
  { icon: ShoppingCart, title: "Cart & checkout", desc: "A short, mobile-friendly checkout with clear totals." },
  { icon: CreditCard, title: "Payments", desc: "Integration with a payment gateway that suits your customers." },
];
const adminTools = ["Add and edit products, prices and stock", "View and update orders", "Customer list and order history", "Sales and order reports"];

export default function EcommerceDevelopment() {
  const service = getService(SLUG);
  return (
    <ServiceLayout slug={SLUG} illustration="store">
      <Section eyebrow="Key features" title="Everything an online store needs">
        <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {storeFeatures.map(({ icon: FeatureIcon, title, desc }) => (
            <li key={title} className="p-6 rounded-2xl border border-[var(--rj-panel-border)] bg-[var(--rj-panel)] hover:border-[#F97316]/40 transition-colors">
              <FeatureIcon size={24} className="text-[#F97316] mb-4" aria-hidden="true" />
              <h3 className="text-white font-bold mb-2">{title}</h3>
              <p className="text-[#94A3B8] text-sm leading-relaxed">{desc}</p>
            </li>
          ))}
        </ul>
      </Section>
      <Section tone="light" eyebrow="Store management" title="An admin panel for your team">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <ListPanel title="Manage your store" items={adminTools} accent />
          <HeroIllustration variant="dashboard" />
        </div>
      </Section>
      <Section>
        <div className="grid lg:grid-cols-2 gap-6">
          <ListPanel title="Problems we solve" items={service.problems} />
          <ListPanel title="Also included" items={service.features} />
        </div>
      </Section>
    </ServiceLayout>
  );
}
