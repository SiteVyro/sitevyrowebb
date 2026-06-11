import { useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Eye, Save, Send, History, Loader2, RotateCcw } from "lucide-react";

type Section = {
  id: string;
  section_key: string;
  label: string;
  published_content: any;
  draft_content: any;
  status: string;
  updated_at: string;
  updated_by: string | null;
};

export default function AdminContent() {
  const [sections, setSections] = useState<Section[]>([]);
  const [activeKey, setActiveKey] = useState<string>("");
  const [draft, setDraft] = useState<any>({});
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [preview, setPreview] = useState(false);
  const [versions, setVersions] = useState<any[]>([]);
  const [showVersions, setShowVersions] = useState(false);
  const autoSaveTimer = useRef<number | undefined>();

  const active = useMemo(
    () => sections.find((s) => s.section_key === activeKey),
    [sections, activeKey]
  );

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("site_content")
        .select("*")
        .order("label");
      setSections((data as Section[]) ?? []);
      if (data?.[0]) setActiveKey(data[0].section_key);
    })();
  }, []);

  useEffect(() => {
    if (active) {
      setDraft(active.draft_content ?? {});
      setDirty(false);
    }
  }, [active?.id]);

  // Autosave every 30s if dirty
  useEffect(() => {
    if (!dirty) return;
    autoSaveTimer.current = window.setTimeout(() => handleSave(true), 30_000);
    return () => clearTimeout(autoSaveTimer.current);
  }, [draft, dirty]);

  useEffect(() => {
    if (!active) return;
    (async () => {
      const { data } = await supabase
        .from("content_versions")
        .select("*")
        .eq("section_key", active.section_key)
        .order("created_at", { ascending: false })
        .limit(20);
      setVersions(data ?? []);
    })();
  }, [active?.id]);

  const setField = (key: string, value: any) => {
    setDraft((d: any) => ({ ...d, [key]: value }));
    setDirty(true);
  };

  const handleSave = async (silent = false) => {
    if (!active) return;
    setSaving(true);
    const { error } = await supabase
      .from("site_content")
      .update({ draft_content: draft, status: "draft" })
      .eq("id", active.id);
    setSaving(false);
    if (error) return toast({ title: "Fel", description: error.message, variant: "destructive" });
    setDirty(false);
    if (!silent) toast({ title: "Utkast sparat" });
    refreshSections();
  };

  const handlePublish = async () => {
    if (!active) return;
    setPublishing(true);
    // version snapshot of current published
    await supabase.from("content_versions").insert({
      section_key: active.section_key,
      content: active.published_content,
      note: "Auto snapshot before publish",
    });
    const { error } = await supabase
      .from("site_content")
      .update({
        published_content: draft,
        draft_content: draft,
        status: "published",
      })
      .eq("id", active.id);
    setPublishing(false);
    if (error) return toast({ title: "Fel", description: error.message, variant: "destructive" });
    const u = (await supabase.auth.getUser()).data.user;
    await supabase.from("activity_logs").insert({
      user_id: u?.id,
      user_email: u?.email,
      action: "publish",
      details: { section_key: active.section_key },
    });
    toast({ title: "Publicerat" });
    setDirty(false);
    refreshSections();
  };

  const refreshSections = async () => {
    const { data } = await supabase.from("site_content").select("*").order("label");
    setSections((data as Section[]) ?? []);
  };

  const restore = async (v: any) => {
    setDraft(v.content);
    setDirty(true);
    toast({ title: "Version laddad i utkast", description: "Spara eller publicera för att tillämpa." });
  };

  if (!sections.length) {
    return <div className="text-muted-foreground"><Loader2 className="w-5 h-5 animate-spin" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-bold">Innehåll</h1>
          <p className="text-sm text-muted-foreground">Redigera webbplatsens sektioner.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => setPreview((p) => !p)}>
            <Eye className="w-4 h-4 mr-2" />
            {preview ? "Redigera" : "Förhandsvisa"}
          </Button>
          <Button variant="outline" onClick={() => setShowVersions((s) => !s)}>
            <History className="w-4 h-4 mr-2" /> Historik
          </Button>
          <Button variant="outline" onClick={() => handleSave()} disabled={!dirty || saving}>
            <Save className="w-4 h-4 mr-2" />
            {saving ? "Sparar..." : "Spara utkast"}
          </Button>
          <Button onClick={handlePublish} disabled={publishing}>
            <Send className="w-4 h-4 mr-2" />
            {publishing ? "Publicerar..." : "Publicera"}
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[220px_1fr] gap-6">
        {/* Section list */}
        <aside className="rounded-xl border border-border/60 bg-card p-2 h-fit">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveKey(s.section_key)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center justify-between ${
                activeKey === s.section_key
                  ? "bg-primary/15 text-primary"
                  : "hover:bg-muted text-muted-foreground"
              }`}
            >
              <span>{s.label}</span>
              <span
                className={`text-[10px] uppercase px-1.5 py-0.5 rounded ${
                  s.status === "published"
                    ? "bg-green-500/15 text-green-500"
                    : "bg-amber-500/15 text-amber-500"
                }`}
              >
                {s.status === "published" ? "live" : "utkast"}
              </span>
            </button>
          ))}
        </aside>

        {/* Editor / Preview */}
        <div className="space-y-4">
          {active && (
            <>
              <div className="text-xs text-muted-foreground">
                Senast uppdaterad: {new Date(active.updated_at).toLocaleString("sv-SE")}
                {dirty && <span className="ml-2 text-amber-500">• osparade ändringar</span>}
              </div>

              {preview ? (
                <pre className="rounded-xl border border-border/60 bg-card p-5 text-xs overflow-auto">
                  {JSON.stringify(draft, null, 2)}
                </pre>
              ) : (
                <div className="rounded-xl border border-border/60 bg-card p-5 space-y-4">
                  {Object.keys(draft).length === 0 && (
                    <p className="text-sm text-muted-foreground">
                      Tom sektion. Lägg till fält nedan.
                    </p>
                  )}
                  {Object.entries(draft).map(([k, v]) => (
                    <FieldEditor key={k} fieldKey={k} value={v} onChange={(val) => setField(k, val)} />
                  ))}
                  <AddFieldRow onAdd={(k) => setField(k, "")} />
                </div>
              )}

              {showVersions && (
                <div className="rounded-xl border border-border/60 bg-card p-5">
                  <h3 className="font-semibold mb-3 text-sm">Versionshistorik</h3>
                  {versions.length === 0 && (
                    <p className="text-xs text-muted-foreground">Inga versioner ännu.</p>
                  )}
                  <ul className="space-y-2">
                    {versions.map((v) => (
                      <li
                        key={v.id}
                        className="flex items-center justify-between text-xs border border-border/40 rounded p-2"
                      >
                        <span>{new Date(v.created_at).toLocaleString("sv-SE")} — {v.note ?? "snapshot"}</span>
                        <Button size="sm" variant="ghost" onClick={() => restore(v)}>
                          <RotateCcw className="w-3 h-3 mr-1" /> Återställ
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function FieldEditor({
  fieldKey,
  value,
  onChange,
}: {
  fieldKey: string;
  value: any;
  onChange: (v: any) => void;
}) {
  if (typeof value === "string") {
    const multiline = value.length > 60 || value.includes("\n");
    return (
      <div>
        <Label className="text-xs">{fieldKey}</Label>
        {multiline ? (
          <Textarea value={value} rows={4} onChange={(e) => onChange(e.target.value)} />
        ) : (
          <Input value={value} onChange={(e) => onChange(e.target.value)} />
        )}
      </div>
    );
  }
  // For arrays/objects show JSON editor
  return (
    <div>
      <Label className="text-xs">{fieldKey} (JSON)</Label>
      <Textarea
        rows={6}
        value={JSON.stringify(value, null, 2)}
        onChange={(e) => {
          try {
            onChange(JSON.parse(e.target.value));
          } catch {
            // ignore parse errors
          }
        }}
        className="font-mono text-xs"
      />
    </div>
  );
}

function AddFieldRow({ onAdd }: { onAdd: (k: string) => void }) {
  const [k, setK] = useState("");
  return (
    <div className="flex gap-2 pt-2 border-t border-border/40">
      <Input
        placeholder="Nytt fältnamn"
        value={k}
        onChange={(e) => setK(e.target.value)}
        className="flex-1"
      />
      <Button
        variant="outline"
        onClick={() => {
          if (!k.trim()) return;
          onAdd(k.trim());
          setK("");
        }}
      >
        Lägg till fält
      </Button>
    </div>
  );
}
