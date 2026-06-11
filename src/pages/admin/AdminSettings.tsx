import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

export default function AdminSettings() {
  const { user } = useAuth();
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [saving, setSaving] = useState(false);

  const changePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPw.length < 8) return toast({ title: "Minst 8 tecken", variant: "destructive" });
    if (newPw !== confirmPw) return toast({ title: "Lösenorden matchar inte", variant: "destructive" });
    setSaving(true);
    const { error } = await supabase.auth.updateUser({ password: newPw });
    setSaving(false);
    if (error) return toast({ title: "Fel", description: error.message, variant: "destructive" });
    await supabase.from("activity_logs").insert({
      user_id: user?.id,
      user_email: user?.email,
      action: "password_change",
    });
    setNewPw("");
    setConfirmPw("");
    toast({ title: "Lösenord uppdaterat" });
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl md:text-3xl font-heading font-bold">Inställningar</h1>
        <p className="text-sm text-muted-foreground">Profil och säkerhet.</p>
      </div>

      <section className="rounded-xl border border-border/60 bg-card p-5 space-y-3">
        <h2 className="font-semibold">Profil</h2>
        <div>
          <Label className="text-xs">E-post</Label>
          <Input value={user?.email ?? ""} disabled />
        </div>
        <div>
          <Label className="text-xs">Användar-ID</Label>
          <Input value={user?.id ?? ""} disabled className="font-mono text-xs" />
        </div>
      </section>

      <section className="rounded-xl border border-border/60 bg-card p-5">
        <h2 className="font-semibold mb-4">Byt lösenord</h2>
        <form onSubmit={changePassword} className="space-y-3">
          <div>
            <Label className="text-xs">Nytt lösenord</Label>
            <Input type="password" value={newPw} onChange={(e) => setNewPw(e.target.value)} />
          </div>
          <div>
            <Label className="text-xs">Bekräfta lösenord</Label>
            <Input type="password" value={confirmPw} onChange={(e) => setConfirmPw(e.target.value)} />
          </div>
          <Button type="submit" disabled={saving}>
            {saving ? "Sparar..." : "Uppdatera lösenord"}
          </Button>
        </form>
      </section>
    </div>
  );
}
