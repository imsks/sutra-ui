/**
 * Curated icon set for Sutra, re-exported from `lucide-react` under
 * `@sutra_ui/ui/icons`. Icons keep lucide's API (`size`, `color`,
 * `strokeWidth`, `className`) and inherit `currentColor`, so they adopt Sutra
 * text color and token classes automatically.
 *
 * This is a deliberately small, product-relevant selection (civic + news). A
 * standalone `@sutra_ui/icons` package is a v0.1+ roadmap item; import paths here
 * are chosen to stay stable through that extraction.
 *
 * @example
 * import { Search, Check, Spinner } from "@sutra_ui/ui/icons";
 * <Search className="size-4 text-content-muted" aria-hidden />
 */

export type { LucideIcon, LucideProps } from "lucide-react";

export {
  // Navigation & chrome
  Menu,
  X,
  X as Close,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  Search,
  Filter,
  Settings,
  MoreHorizontal,
  Plus,
  Pencil,
  Trash2,
  Download,
  Eye,

  // Status & feedback
  Check,
  CircleCheck,
  TriangleAlert,
  CircleAlert,
  CircleX,
  Info,
  LoaderCircle,
  LoaderCircle as Spinner,

  // Civic & news
  User,
  Users,
  Building2,
  Landmark,
  FileText,
  Scale,
  Vote,
  Newspaper,
  Calendar,
  MapPin,
  Bookmark,
  Share2,
  Bell,
  TrendingUp,
  Link as LinkIcon,

  // Theme & locale
  Sun,
  Moon,
  Globe,
} from "lucide-react";
