import { Plane, Ship, Truck, MapPin, Waves, PackageCheck } from "lucide-react";

const badges = [
  { label: "Air", icon: Plane, className: "transport-badge badge-air" },
  { label: "Sea", icon: Ship, className: "transport-badge badge-sea" },
  { label: "Road", icon: Truck, className: "transport-badge badge-road" },
];

export function HeroArt() {
  return (
    <div className="hero-art" aria-hidden="true">
      <div className="hero-art-panel">
        <div className="hero-art-grid" />
        <div className="hero-sea sea-caspian" />
        <div className="hero-sea sea-persian" />

        <svg className="iran-map" viewBox="0 0 600 520" role="presentation">
          <defs>
            <linearGradient id="iranFill" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#d8e6da" />
              <stop offset="100%" stopColor="#aec5b1" />
            </linearGradient>
            <linearGradient id="routeStroke" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f2d8a5" />
              <stop offset="100%" stopColor="#d0b071" />
            </linearGradient>
          </defs>
          <path
            className="iran-shape"
            d="M191 70l47-24 68 7 53 27 54 6 49 45-8 47 21 43-16 53-38 34-24 60-42 28-82 7-62-26-26-43-47-8-55-32-20-53 14-42-18-57 27-37 60-10 45-32z"
          />
          <path className="route route-air" d="M208 180 C 255 125, 337 108, 404 130 S 497 191, 523 170" />
          <path className="route route-road" d="M186 240 C 237 267, 296 290, 350 308 S 463 340, 500 365" />
          <path className="route route-sea" d="M232 364 C 275 382, 337 392, 404 386 S 490 369, 528 346" />
        </svg>

        <div className="city-dot dot-tehran"><span />Tehran</div>
        <div className="city-dot dot-tabriz"><span />Tabriz</div>
        <div className="city-dot dot-bandar"><span />Bandar Abbas</div>
        <div className="city-dot dot-bushehr"><span />Bushehr</div>
        <div className="city-dot dot-mashhad"><span />Mashhad</div>

        <div className="moving-icon moving-plane">
          <Plane size={18} />
        </div>
        <div className="moving-icon moving-truck">
          <Truck size={18} />
        </div>
        <div className="moving-icon moving-ship">
          <Ship size={18} />
        </div>

        {badges.map(({ label, icon: Icon, className }) => (
          <div className={className} key={label}>
            <Icon size={15} />
            <span>{label}</span>
          </div>
        ))}

        <div className="hero-info-card card-route">
          <MapPin size={16} />
          <div>
            <b>Iran-focused sourcing</b>
            <span>Routes visualized across land, sea, and air</span>
          </div>
        </div>
        <div className="hero-info-card card-flow">
          <PackageCheck size={16} />
          <div>
            <b>Inquiry → validation → coordination</b>
            <span>Clearer next steps for buyers</span>
          </div>
        </div>
        <div className="hero-info-card card-sea">
          <Waves size={16} />
          <div>
            <b>Persian Gulf access</b>
            <span>Sea routes framed from southern ports</span>
          </div>
        </div>
      </div>
    </div>
  );
}
