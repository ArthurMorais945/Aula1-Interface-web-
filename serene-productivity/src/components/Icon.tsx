import {
  Briefcase,
  User,
  ShoppingBasket,
  Heart,
  Building,
  GraduationCap,
  Utensils,
  Dumbbell,
  PartyPopper,
  CreditCard,
  Search,
  Plus,
  EllipsisVertical,
  ChevronRight,
  Circle,
  CheckCircle2,
  ArrowLeft,
  Globe,
  Shield,
  Lock,
  Info,
  LogOut,
  Bell,
  Moon,
  Calendar,
  Settings,
  CheckSquare,
  ListTodo,
  BarChart3,
  Save,
  FileText,
  LayoutDashboard,
  LogIn,
  Trash2,
  Edit2,
  Clock,
  Bold,
  Menu,
  ChevronDown
} from 'lucide-react';

const iconMap: { [key: string]: any } = {
  Briefcase,
  User,
  ShoppingBasket,
  Heart,
  Building,
  GraduationCap,
  Utensils,
  Dumbbell,
  PartyPopper,
  CreditCard,
  Search,
  Plus,
  EllipsisVertical,
  ChevronRight,
  Circle,
  CheckCircle2,
  ArrowLeft,
  Globe,
  Shield,
  Lock,
  Info,
  LogOut,
  Bell,
  Moon,
  Calendar,
  Settings,
  CheckSquare,
  ListTodo,
  BarChart3,
  Save,
  FileText,
  LayoutDashboard,
  LogIn,
  Trash2,
  Edit2,
  Clock,
  Bold,
  Menu,
  ChevronDown
};

interface IconProps {
  name: string;
  className?: string;
  size?: number;
}

export default function Icon({ name, className = '', size = 20 }: IconProps) {
  const IconComponent = iconMap[name];
  if (!IconComponent) {
    // Return a safe fallback icon (like ListTodo)
    return <ListTodo className={className} size={size} />;
  }
  return <IconComponent className={className} size={size} />;
}
