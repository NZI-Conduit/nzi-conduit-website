import Icon from "./Icon";
import React from "react";

// Official brand SVG vector logos
const LOGO_MAP = {
  react: (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <ellipse cx="12" cy="12" rx="10" ry="4.5" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(0 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4.5" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4.5" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(120 12 12)" />
      <circle cx="12" cy="12" r="2" fill="#61DAFB" />
    </svg>
  ),
  typescript: (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width="24" height="24" rx="4" fill="#3178C6" />
      <path d="M11.5 13.5H9.5V8.5H7.5V7H13.5V8.5H11.5V13.5Z" fill="white" />
      <path d="M18.5 8.25C18.1 7.8 17.4 7.5 16.5 7.5C15.1 7.5 14.3 8.3 14.3 9.4C14.3 11.5 17.5 11.1 17.5 12.6C17.5 13.2 16.9 13.6 16.1 13.6C15.1 13.6 14.3 13 13.9 12.2L12.5 13.1C13.2 14.4 14.5 15.1 16.1 15.1C17.8 15.1 19 14.1 19 12.6C19 10.3 15.7 10.8 15.7 9.4C15.7 8.9 16.2 8.6 16.8 8.6C17.5 8.6 18.1 9 18.4 9.6L18.5 8.25Z" fill="white" />
    </svg>
  ),
  vite: (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M21.5 4.5L12.5 21L3.5 4.5L7.5 4L12 12.5L16.5 4L21.5 4.5Z" fill="url(#vite-grad1)" />
      <path d="M16.5 3L11.5 13.5L8.5 7.5L4 4L12 21L20 4L16.5 3Z" fill="url(#vite-grad2)" />
      <defs>
        <linearGradient id="vite-grad1" x1="3.5" y1="4" x2="21.5" y2="21" gradientUnits="userSpaceOnUse">
          <stop stopColor="#41D1FF" />
          <stop offset="1" stopColor="#BD34FE" />
        </linearGradient>
        <linearGradient id="vite-grad2" x1="4" y1="3" x2="20" y2="21" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFEA83" />
          <stop offset="1" stopColor="#FFDD35" />
        </linearGradient>
      </defs>
    </svg>
  ),
  tailwind: (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M12 6C9.6 6 8.1 7.2 7.5 9.6C8.4 8.4 9.4 8.1 10.5 8.7C11.13 9.06 11.58 9.71 12.09 10.44C12.92 11.63 13.9 13.03 16.5 13.03C18.9 13.03 20.4 11.83 21 9.43C20.1 10.63 19.1 10.93 18 10.33C17.37 9.97 16.92 9.32 16.41 8.59C15.58 7.4 14.6 6 12 6ZM7.5 13.03C5.1 13.03 3.6 14.23 3 16.63C3.9 15.43 4.9 15.13 6 15.73C6.63 16.09 7.08 16.74 7.59 17.47C8.42 18.66 9.4 20.06 12 20.06C14.4 20.06 15.9 18.86 16.5 16.46C15.6 17.66 14.6 17.96 13.5 17.36C12.87 17 12.42 16.35 11.91 15.62C11.08 14.43 10.1 13.03 7.5 13.03Z" fill="#06B6D4" />
    </svg>
  ),
  node: (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M12 2L2.5 7.5V18.5L12 24L21.5 18.5V7.5L12 2Z" fill="#339933" />
      <path d="M12 4.5L19 8.55V16.45L12 20.5L5 16.45V8.55L12 4.5Z" fill="#43853D" />
      <path d="M12 8.5V15.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  cloudflare: (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M17.5 16.5H6.5C4.01 16.5 2 14.49 2 12C2 9.74 3.66 7.87 5.86 7.56C6.73 5.46 8.79 4 11.2 4C14.07 4 16.47 6.13 16.89 8.94C18.68 9.21 20 10.74 20 12.6C20 14.75 18.25 16.5 16.1 16.5H17.5Z" fill="#F38020" />
      <path d="M16.5 16.5L19 12L17.5 16.5Z" fill="#FAAD3F" />
    </svg>
  ),
  "cloudflare-waf": (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M12 2L4 5V11C4 16.55 7.4 21.74 12 23C16.6 21.74 20 16.55 20 11V5L12 2Z" fill="#F38020" opacity="0.2" />
      <path d="M12 2L4 5V11C4 16.55 7.4 21.74 12 23C16.6 21.74 20 16.55 20 11V5L12 2Z" stroke="#F38020" strokeWidth="2" />
      <path d="M15 10L10.5 14.5L8.5 12.5" stroke="#F38020" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "search-console": (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" fill="#4285F4" opacity="0.15" />
      <path d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z" fill="#4285F4" />
      <path d="M7 10H12M9.5 7.5V12.5" stroke="#34A853" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  lighthouse: (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M12 2L8 8H16L12 2Z" fill="#F44B20" />
      <path d="M9 8L7 22H17L15 8H9Z" fill="#F44B20" />
      <path d="M12 4L4 7M12 4L20 7" stroke="#FFCC00" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="10" y="11" width="4" height="4" rx="1" fill="#FFFFFF" />
    </svg>
  ),
  ahrefs: (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M3 17L9 5L15 17H12L9.5 11.5L7 17H3Z" fill="#0055FF" />
      <path d="M13 17L16.5 10L20 17H17.5L16.5 14.8L15.5 17H13Z" fill="#0055FF" opacity="0.8" />
    </svg>
  ),
  schema: (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width="24" height="24" rx="5" fill="#712AE2" />
      <path d="M8 8L5 12L8 16M16 8L19 12L16 16M13.5 6L10.5 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  ga4: (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x="3" y="14" width="4" height="7" rx="1.5" fill="#F9AB00" />
      <rect x="10" y="9" width="4" height="12" rx="1.5" fill="#E37400" />
      <rect x="17" y="3" width="4" height="18" rx="1.5" fill="#EA4335" />
    </svg>
  ),
  owasp: (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M12 2L3 6V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V6L12 2Z" fill="#0037B0" />
      <path d="M12 6L17 9V12C17 15.3 14.9 18.4 12 19.3C9.1 18.4 7 15.3 7 12V9L12 6Z" fill="white" opacity="0.3" />
      <path d="M12 9V15M9.5 12.5H14.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  tls: (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x="4" y="10" width="16" height="11" rx="3" fill="#059669" />
      <path d="M8 10V7C8 4.79 9.79 3 12 3C14.21 3 16 4.79 16 7V10" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="12" cy="15.5" r="1.5" fill="white" />
    </svg>
  ),
  oauth: (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="9" cy="12" r="5" stroke="#EB5424" strokeWidth="2" />
      <path d="M13 12H20M17 12V15M20 12V14" stroke="#EB5424" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  docker: (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x="2" y="13" width="3" height="3" rx="0.5" fill="#2496ED" />
      <rect x="6" y="13" width="3" height="3" rx="0.5" fill="#2496ED" />
      <rect x="10" y="13" width="3" height="3" rx="0.5" fill="#2496ED" />
      <rect x="14" y="13" width="3" height="3" rx="0.5" fill="#2496ED" />
      <rect x="6" y="9" width="3" height="3" rx="0.5" fill="#2496ED" />
      <rect x="10" y="9" width="3" height="3" rx="0.5" fill="#2496ED" />
      <rect x="14" y="9" width="3" height="3" rx="0.5" fill="#2496ED" />
      <rect x="10" y="5" width="3" height="3" rx="0.5" fill="#2496ED" />
      <path d="M1.5 17C1.5 17 3.5 21 11.5 21C19.5 21 22.5 16 22.5 16C22.5 16 21 15 18 15.5C15 16 1.5 17 1.5 17Z" fill="#2496ED" />
    </svg>
  ),
  "burp-suite": (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width="24" height="24" rx="4" fill="#FF6600" />
      <path d="M6 6H13C15.2 6 17 7.8 17 10C17 11.5 16.2 12.8 15 13.5C16.5 14.2 17.5 15.7 17.5 17.5C17.5 19.7 15.7 21.5 13.5 21.5H6V6Z" fill="white" opacity="0.2" />
      <path d="M7 6L14 12L7 18V6Z" fill="white" />
    </svg>
  ),
};

export function TechLogo({ id, fallbackIcon = "terminal", className = "w-7 h-7" }) {
  const normalizedId = id ? String(id).toLowerCase().trim() : "";
  const SVGComponent = LOGO_MAP[normalizedId];

  if (SVGComponent) {
    return <SVGComponent className={`${className} object-contain`} aria-hidden="true" />;
  }

  return (
    <Icon name={fallbackIcon} className={`${className} text-primary`} />
  );
}
