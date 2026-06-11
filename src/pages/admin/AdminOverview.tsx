import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AdminCard } from "@/components/admin/AdminLayout";
import { FileEdit, Image as ImageIcon, ScrollText, Users } from "lucide-react";
import { Link } from "react-router-dom";

export default function AdminOverview() {
  const [stats, setStats] = useState({ content: 0, media: 0, activity: 0, admins: 0 });
  const [recent, setRecent] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const [c, m, a, r, recent] = await Promise.all([
        supabase.from("site_content").select("*", { count: "exact", head: true }),
        supabase.from("media_files").select("*", { count: "exact", head: true }),
        supabase.from("activity_logs").select("*", { count: "exact", head: true }),
        supabase.from("user_roles").select("*", { count: "exact", head: true }).eq("role", "admin"),
        supabase.from("activity_logs").select("*").order("created_at", { ascending: false }).limit(8),
      ]);
      setStats({
        content: c.count ?? 0,
        media: m.count ?? 0,
        activity: a.count ?? 0,
        admins: r.count ?? 0,
      });
      setRecent(recent.data ?? []);
    })();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-heading font-bold">Översikt</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Välkommen tillbaka till admin-panelen.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <AdminCard title="Innehållssektioner" value={stats.content} icon={<FileEdit className="w-4 h-4 text-primary" />} />
        <AdminCard title="Mediefiler" value={stats.media} icon={<ImageIcon className="w-4 h-4 text-primary" />} />
        <AdminCard title="Aktivitet" value={stats.activity} icon={<ScrollText className="w-4 h-4 text-primary" />} />
        <AdminCard title="Administratörer" value={stats.admins} icon={<Users className="w-4 h-4 text-primary" />} />
      </div>

      <div className="rounded-xl border border-border/60 bg-card p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">Senaste aktivitet</h2>
          <Link to="/admin/activity" className="text-xs text-primary hover:underline">
            Visa alla
          </Link>
        </div>
        <ul className="divide-y divide-border/60">
          {recent.length === 0 && (
            <li className="py-6 text-sm text-muted-foreground text-center">Ingen aktivitet ännu.</li>
          )}
          {recent.map((r) => (
            <li key={r.id} className="py-3 flex items-center justify-between text-sm">
              <div>
                <span className="font-medium">{r.action}</span>
                <span className="text-muted-foreground ml-2">{r.user_email}</span>
              </div>
              <span className="text-xs text-muted-foreground">
                {new Date(r.created_at).toLocaleString("sv-SE")}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl border border-border/60 bg-card p-5">
        <h2 className="font-semibold mb-2">Analys</h2>
        <p className="text-sm text-muted-foreground">
          Besökaranalys är inte aktiverad ännu. Lägg till Plausible, Umami eller liknande för
          trafikgrafer, sessionsdata och enhetsfördelning.
        </p>
      </div>
    </div>
  );
}
