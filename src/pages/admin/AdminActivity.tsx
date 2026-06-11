import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";

export default function AdminActivity() {
  const [logs, setLogs] = useState<any[]>([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("activity_logs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(200);
      setLogs(data ?? []);
    })();
  }, []);

  const filtered = logs.filter(
    (l) =>
      !q ||
      l.action?.toLowerCase().includes(q.toLowerCase()) ||
      l.user_email?.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-heading font-bold">Aktivitetslogg</h1>
        <p className="text-sm text-muted-foreground">Granskningsspår för admin-händelser.</p>
      </div>
      <Input placeholder="Sök (åtgärd eller användare)..." value={q} onChange={(e) => setQ(e.target.value)} className="max-w-sm" />
      <div className="rounded-xl border border-border/60 bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-xs uppercase text-muted-foreground">
            <tr>
              <th className="text-left p-3">Tid</th>
              <th className="text-left p-3">Användare</th>
              <th className="text-left p-3">Åtgärd</th>
              <th className="text-left p-3 hidden md:table-cell">Detaljer</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={4} className="p-6 text-center text-muted-foreground">
                  Inga händelser.
                </td>
              </tr>
            )}
            {filtered.map((l) => (
              <tr key={l.id} className="border-t border-border/40">
                <td className="p-3 text-xs text-muted-foreground">
                  {new Date(l.created_at).toLocaleString("sv-SE")}
                </td>
                <td className="p-3">{l.user_email ?? "—"}</td>
                <td className="p-3">
                  <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-xs">
                    {l.action}
                  </span>
                </td>
                <td className="p-3 hidden md:table-cell text-xs text-muted-foreground">
                  {l.details && Object.keys(l.details).length ? JSON.stringify(l.details) : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
