import React from "react";
import {
  Accessibility,
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  Ban,
  BarChart3,
  Blocks,
  Box,
  Briefcase,
  Bug,
  Building2,
  CheckCircle2,
  ChevronDown,
  Clock,
  Cloud,
  Code2,
  Compass,
  Database,
  Gavel,
  Gauge,
  Globe,
  HardHat,
  Headphones,
  Home,
  Key,
  Laptop,
  LayoutGrid,
  Lock,
  LockOpen,
  Mail,
  MailQuestion,
  MapPin,
  Menu,
  MessageSquare,
  Network,
  Package,
  Palette,
  PenTool,
  Phone,
  Receipt,
  Rocket,
  Search,
  SearchX,
  Send,
  Server,
  Share2,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sliders,
  Smartphone,
  Star,
  Terminal,
  TrendingUp,
  Triangle,
  Tv,
  User,
  UserCheck,
  Wrench,
  X,
  Zap,
} from "lucide-react";

export const ICON_MAP = {
  // Navigation & UI
  menu: Menu,
  close: X,
  expand_more: ChevronDown,
  arrow_forward: ArrowRight,
  check_circle: CheckCircle2,
  verified: BadgeCheck,
  verified_user: UserCheck,
  warning: AlertTriangle,
  block: Ban,

  // Services, Dev, Tech
  code: Code2,
  code_blocks: Blocks,
  database: Database,
  dns: Server,
  cloud: Cloud,
  cloud_done: Cloud,
  hub: Network,
  schema: Network,
  terminal: Terminal,
  architecture: Building2,
  engineering: HardHat,
  build: Wrench,
  draw: PenTool,
  style: Palette,
  view_in_ar: Box,
  change_history: Triangle,

  // SEO, Growth, Metrics
  analytics: BarChart3,
  speed: Gauge,
  trending_up: TrendingUp,
  travel_explore: Compass,
  search: Search,
  search_off: SearchX,
  key: Key,
  mobile_friendly: Smartphone,
  devices: Laptop,
  accessibility_new: Accessibility,
  smart_display: Tv,
  rocket_launch: Rocket,
  bolt: Zap,

  // Security
  security: Shield,
  shield_lock: ShieldCheck,
  enhanced_encryption: ShieldCheck,
  health_and_safety: ShieldAlert,
  bug_report: Bug,
  gavel: Gavel,
  lock: Lock,
  lock_open: LockOpen,

  // Contact, People, Communication
  mail: Mail,
  mark_email_unread: MailQuestion,
  call: Phone,
  chat: MessageSquare,
  send: Send,
  support_agent: Headphones,
  share: Share2,
  person: User,
  location_on: MapPin,
  language: Globe,
  home: Home,
  work: Briefcase,
  schedule: Clock,
  tune: Sliders,
  receipt_long: Receipt,
  grid_view: LayoutGrid,
  inventory_2: Package,
  star: Star,
};

export function Icon({ name, className = "", size = 20, strokeWidth = 2, ...props }) {
  if (!name) return null;
  const Component = ICON_MAP[name] || Star;
  return (
    <Component
      size={size}
      strokeWidth={strokeWidth}
      className={`inline-block shrink-0 align-middle ${className}`}
      aria-hidden="true"
      {...props}
    />
  );
}

export default Icon;
