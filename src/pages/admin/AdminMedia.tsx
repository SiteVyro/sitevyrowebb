import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Trash2, Upload, Copy } from "lucide-react";

type Media = {
  id: string;
  file_name: string;
  file_path: string;
  public_url: string;
  size_bytes: number | null;
  mime_type: string | null;
  created_at: string;
};

export default function AdminMedia() {
  const [items, setItems] = useState<Media[]>([]);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    const { data } = await supabase
      .from("media_files")
      .select("*")
      .order("created_at", { ascending: false });
    setItems((data as Media[]) ?? []);
  };

  useEffect(() => {
    load();
  }, []);

  const upload = async (files: FileList | null) => {
    if (!files?.length) return;
    setUploading(true);
    const u = (await supabase.auth.getUser()).data.user;
    for (const f of Array.from(files)) {
      const path = `${u?.id}/${Date.now()}-${f.name}`;
      const { error: upErr } = await supabase.storage.from("media").upload(path, f, {
        cacheControl: "3600",
        upsert: false,
      });
      if (upErr) {
        toast({ title: "Upload misslyckades", description: upErr.message, variant: "destructive" });
        continue;
      }
      const { data: pub } = supabase.storage.from("media").getPublicUrl(path);
      await supabase.from("media_files").insert({
        file_path: path,
        public_url: pub.publicUrl,
        file_name: f.name,
        mime_type: f.type,
        size_bytes: f.size,
        uploaded_by: u?.id,
      });
    }
    setUploading(false);
    if (inputRef.current) inputRef.current.value = "";
    toast({ title: "Uppladdning klar" });
    load();
  };

  const remove = async (m: Media) => {
    if (!confirm(`Ta bort ${m.file_name}?`)) return;
    await supabase.storage.from("media").remove([m.file_path]);
    await supabase.from("media_files").delete().eq("id", m.id);
    toast({ title: "Borttagen" });
    load();
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({ title: "URL kopierad" });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-bold">Mediabibliotek</h1>
          <p className="text-sm text-muted-foreground">Bilder och filer för webbplatsen.</p>
        </div>
        <div>
          <input
            ref={inputRef}
            type="file"
            multiple
            accept="image/*,.pdf,.svg"
            onChange={(e) => upload(e.target.files)}
            className="hidden"
          />
          <Button onClick={() => inputRef.current?.click()} disabled={uploading}>
            <Upload className="w-4 h-4 mr-2" />
            {uploading ? "Laddar upp..." : "Ladda upp"}
          </Button>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border/60 p-12 text-center text-muted-foreground">
          Inga filer ännu. Ladda upp din första bild.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((m) => (
            <div key={m.id} className="rounded-xl border border-border/60 bg-card overflow-hidden group">
              <div className="aspect-square bg-muted flex items-center justify-center overflow-hidden">
                {m.mime_type?.startsWith("image/") ? (
                  <img src={m.public_url} alt={m.file_name} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-xs text-muted-foreground p-2 text-center">{m.file_name}</div>
                )}
              </div>
              <div className="p-3 space-y-2">
                <div className="text-xs truncate" title={m.file_name}>
                  {m.file_name}
                </div>
                <div className="flex gap-1">
                  <Button size="sm" variant="outline" className="flex-1" onClick={() => copyUrl(m.public_url)}>
                    <Copy className="w-3 h-3 mr-1" /> URL
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => remove(m)}>
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
