import { ReactNode, useEffect, useState } from "react";
import { Navigate, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import {
  LayoutDashboard,
  FileEdit,
  Image as ImageIcon,
  ScrollText,
  Settings,
  LogOut,
  Moon,
  Sun,
  Bell,
  Search,
  Loader2,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const NAV = [
  { to: "/admin", label: "Översikt", icon: LayoutDashboard, end: true },
  { to: "/admin/content", label: "Innehåll", icon: FileEdit },
  { to: "/admin/media", label: "Media", icon: ImageIcon },
  { to: "/admin/activity", label: "Aktivitet", icon: ScrollText },
  { to: "/admin/settings", label: "Inställningar", icon: Settings },
];

export default function AdminLayout() {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [dark, setDark] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [dark]);

  useEffect(() => setOpen(false), [location.pathname]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }
  if (!user) return <Navigate to="/" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;

  const handleLogout = async () => {
    await supabase.from("activity_logs").insert({
      user_id: user.id,
      user_email: user.email,
      action: "logout",
    });
    await signOut();
    toast({ title: "Utloggad" });
    navigate("/");
  };

  return (
    <div className="min-h-screen flex w-full bg-background text-foreground">
      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-40 w-64 border-r border-border/60 bg-card/50 backdrop-blur transform transition-transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="h-16 flex items-center justify-between px-5 border-b border-border/60">
          <span className="font-heading font-bold text-lg">
            Site<span className="text-primary">vyro</span>
          </span>
          <button className="md:hidden" onClick={() => setOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="p-3 space-y-1">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`
              }
            >
              <n.icon className="w-4 h-4" />
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="absolute bottom-0 inset-x-0 p-3 border-t border-border/60">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logga ut
          </button>
        </div>
      </aside>

      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-border/60 flex items-center gap-3 px-4 md:px-6 sticky top-0 bg-background/80 backdrop-blur z-20">
          <button className="md:hidden" onClick={() => setOpen(true)}>
            <Menu className="w-5 h-5" />
          </button>
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Sök innehåll..." className="pl-9 h-9" />
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={() => setDark(!dark)} title="Tema">
              {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            <Button variant="ghost" size="icon" title="Notiser">
              <Bell className="w-4 h-4" />
            </Button>
            <div className="hidden sm:flex items-center gap-2 ml-2 pl-3 border-l border-border/60">
              <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-xs font-semibold text-primary">
                {user.email?.[0]?.toUpperCase()}
              </div>
              <span className="text-xs text-muted-foreground truncate max-w-[150px]">
                {user.email}
              </span>
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export function AdminCard({ title, value, hint, icon }: { title: string; value: ReactNode; hint?: string; icon?: ReactNode }) {
  return (
    <div className="rounded-xl border border-border/60 bg-card p-5">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-muted-foreground">{title}</span>
        {icon}
      </div>
      <div className="text-2xl font-bold">{value}</div>
      {hint && <div className="text-xs text-muted-foreground mt-1">{hint}</div>}
    </div>
  );
}
