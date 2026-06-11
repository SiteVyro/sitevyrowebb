import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Props {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}

// Simple in-memory rate limit (per browser tab)
let attempts = 0;
let lockUntil = 0;

export default function AdminLoginModal({ open, onOpenChange }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (Date.now() < lockUntil) {
      const s = Math.ceil((lockUntil - Date.now()) / 1000);
      toast({ title: "För många försök", description: `Försök igen om ${s}s`, variant: "destructive" });
      return;
    }
    setSubmitting(true);
    const { data, error } = await signIn(email, password);
    setSubmitting(false);
    if (error || !data.user) {
      attempts++;
      if (attempts >= 5) {
        lockUntil = Date.now() + 60_000;
        attempts = 0;
      }
      toast({ title: "Inloggning misslyckades", description: error?.message ?? "Fel inloggning", variant: "destructive" });
      return;
    }
    // Verify admin role server-side
    const { data: role } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", data.user.id)
      .eq("role", "admin")
      .maybeSingle();
    if (!role) {
      await supabase.auth.signOut();
      toast({ title: "Åtkomst nekad", description: "Inte en admin", variant: "destructive" });
      return;
    }
    await supabase.from("activity_logs").insert({
      user_id: data.user.id,
      user_email: data.user.email,
      action: "login",
    });
    attempts = 0;
    onOpenChange(false);
    navigate("/admin");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" /> Admin-inloggning
          </DialogTitle>
          <DialogDescription>Endast behöriga administratörer.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="adminEmail">E-post</Label>
            <Input
              id="adminEmail"
              type="email"
              required
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="adminPw">Lösenord</Label>
            <Input
              id="adminPw"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" disabled={submitting} className="w-full">
            {submitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />} Logga in
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
