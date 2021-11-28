export interface Link {
  href: string;
  label: string;
}

export const links: Link[] = [
  { href: "#about", label: "Simply Story" },
  { href: "#products", label: "Simply e-shop" },
  { href: "#contact", label: "Simply kontakt" },
];

export const legal: Link[] = [
  {
    href: "/odstupenie-od-kupnej-zmluvy",
    label: "Odstúpenie od kúpnej zmluvy",
  },
  {
    href: "/vseobecne-obchodne-podmienky",
    label: "Všeobecné obchodné podmienky",
  },
  {
    href: "/zasady-ochrany-osobnych-udajov",
    label: "Zásady ochrany osobných údajov",
  },
];

export const social: Link[] = [
  {
    href: "https://www.instagram.com/simplychocolate.sk/",
    label: "fab fa-instagram",
  },

  {
    href: "https://www.facebook.com/simplychocolate.sk",
    label: "fab fa-facebook-f",
  },

  { href: "mailto:info@simplychocolate.sk", label: "fas fa-envelope" },

  { href: "tel:+421904130824", label: "fas fa-phone-alt" },
];
