import {
  Atom, Circle, ClipboardList, Cloud, Code, FileText, LifeBuoy, Layers, Lightbulb, MessageSquare,
  Monitor, Palette, Phone, Rocket, Search, Server, ShieldCheck, ShoppingCart, Target, Users,
} from "lucide-react";

// Icons referenced by name from JSX-free data files (src/data/*)
const icons = {
  Atom, ClipboardList, Cloud, Code, FileText, LifeBuoy, Layers, Lightbulb, MessageSquare,
  Monitor, Palette, Phone, Rocket, Search, Server, ShieldCheck, ShoppingCart, Target, Users,
};

export const Icon = ({ name, ...props }) => {
  const Component = icons[name] || Circle;
  return <Component aria-hidden="true" {...props} />;
};
