export const COMPANY_DETAILS = {
  name: "NZI Conduit",
  legalName: "NZI Conduit Inc.",
  address: {
    street: "12725 W Indian School Rd, Suite E-101",
    city: "Avondale",
    state: "AZ",
    zip: "85392",
    country: "US",
    formatted: "12725 W Indian School Rd, Suite E-101, Avondale, AZ 85392",
  },
  phone: "+1 (623) 696-0138",
  phoneRaw: "+16236960138",
  email: "start@nziconduit.com",
  mapUrl: "https://maps.google.com/?q=12725+W+Indian+School+Rd+Suite+E-101+Avondale+AZ+85392",
};

export const JSON_LD_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": COMPANY_DETAILS.name,
  "legalName": COMPANY_DETAILS.legalName,
  "url": "https://nziconduit.com",
  "logo": "https://nziconduit.com/logo.png",
  "telephone": COMPANY_DETAILS.phoneRaw,
  "email": COMPANY_DETAILS.email,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "12725 W Indian School Rd, Suite E-101",
    "addressLocality": "Avondale",
    "addressRegion": "AZ",
    "postalCode": "85392",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "33.4947",
    "longitude": "-112.3328"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "08:00",
    "closes": "18:00"
  },
  "sameAs": [
    "https://github.com",
    "https://twitter.com",
    "https://linkedin.com"
  ]
};
