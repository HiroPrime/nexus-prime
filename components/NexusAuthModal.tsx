"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

type AuthView = "landing" | "login" | "signup" | "forgot" | "update_password" | "onboarding";
type Message = { type: "" | "error" | "info" | "success" | "success_action"; text: string };

const GoogleIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden>
    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

const DiscordIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 127.14 96.36" aria-hidden>
    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a67.58,67.58,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.31,60,73.31,53s5-12.74,11.43-12.74S96.33,46,96.22,53,91.08,65.69,84.69,65.69Z" />
  </svg>
);

type Props = {
  open: boolean;
  onClose: () => void;
  user: User | null;
  onUserChange: (user: User | null) => void;
};

export function NexusAuthModal({ open, onClose, user, onUserChange }: Props) {
  const [view, setView] = useState<AuthView>("landing");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<Message>({ type: "", text: "" });

  const resetForm = useCallback(() => {
    setEmail("");
    setPassword("");
    setConfirm("");
    setUsername("");
    setAvatarUrl("");
    setNewsletter(false);
    setMessage({ type: "", text: "" });
  }, []);

  const evaluateSession = useCallback(
    async (sessionUser: User | null) => {
      if (!sessionUser) {
        onUserChange(null);
        return;
      }
      onUserChange(sessionUser);
      const metaUsername = sessionUser.user_metadata?.username as string | undefined;
      const supabase = createClient();
      const { data: profile } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", sessionUser.id)
        .maybeSingle();
      if (!profile?.username && !metaUsername) {
        setView("onboarding");
        setUsername("");
      }
    },
    [onUserChange]
  );

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      void evaluateSession(session?.user ?? null);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_e, session) => {
      void evaluateSession(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, [evaluateSession]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = window.location.href;
    if (url.includes("type=recovery") || url.includes("reset=true")) {
      setView("update_password");
    }
  }, []);

  const handleAuth = async (
    action: "login" | "signup" | "reset" | "update_password",
    provider?: "google" | "discord"
  ) => {
    setLoading(true);
    setMessage({ type: "", text: "" });
    const supabase = createClient();
    try {
      if (provider) {
        const oauthOptions: { queryParams?: { prompt: string } } = {};
        if (provider === "discord" && action === "login") {
          oauthOptions.queryParams = { prompt: "none" };
        }
        const { error } = await supabase.auth.signInWithOAuth({ provider, options: oauthOptions });
        if (error) throw error;
        return;
      }
      if (action === "signup") {
        if (password !== confirm) throw new Error("Passwords do not match.");
        if (!username.trim()) throw new Error("Hero name is required.");
        setMessage({ type: "info", text: "Forging save file..." });
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              username: username.trim(),
              avatar_url: avatarUrl || undefined,
              newsletter_opt_in: newsletter,
            },
          },
        });
        if (error) throw error;
        if (data.user?.identities?.length === 0) throw new Error("Email already registered.");
        if (data.session && data.user) {
          const { error: profileError } = await supabase.from("profiles").upsert({
            id: data.user.id,
            email,
            username: username.trim(),
            avatar_url: avatarUrl || null,
            newsletter_opt_in: newsletter,
          });
          if (profileError) throw new Error(profileError.message);
          onUserChange(data.user);
          onClose();
          setView("landing");
          resetForm();
        } else {
          setMessage({ type: "success", text: "Check your inbox to confirm." });
        }
      } else if (action === "login") {
        if (!email || !password) throw new Error("Email and password required.");
        setMessage({ type: "info", text: "Loading party..." });
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        if (data.session) {
          onUserChange(data.user);
          onClose();
          setView("landing");
          resetForm();
        }
      } else if (action === "reset") {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/?reset=true`,
        });
        if (error) throw error;
        setMessage({ type: "success", text: "Reset scroll sent." });
      } else if (action === "update_password") {
        if (password !== confirm) throw new Error("Passwords do not match.");
        if (password.length < 6) throw new Error("Password must be at least 6 characters.");
        const { error } = await supabase.auth.updateUser({ password });
        if (error) throw error;
        setMessage({ type: "success_action", text: "Password updated. Adventure continues!" });
        setPassword("");
        setConfirm("");
      }
    } catch (err) {
      setMessage({ type: "error", text: err instanceof Error ? err.message : "Auth failed" });
    } finally {
      setLoading(false);
    }
  };

  const handleOnboarding = async (e: FormEvent) => {
    e.preventDefault();
    if (!user || !username.trim()) return;
    setLoading(true);
    const supabase = createClient();
    try {
      await supabase.auth.updateUser({
        data: { username: username.trim(), newsletter_opt_in: newsletter },
      });
      const { error } = await supabase.from("profiles").upsert({
        id: user.id,
        email: user.email,
        username: username.trim(),
        avatar_url: avatarUrl || user.user_metadata?.avatar_url || null,
        newsletter_opt_in: newsletter,
      });
      if (error) throw error;
      setView("landing");
      onClose();
      resetForm();
    } catch (err) {
      setMessage({ type: "error", text: err instanceof Error ? err.message : "Save failed" });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await createClient().auth.signOut();
    onUserChange(null);
    onClose();
    setView("landing");
    resetForm();
  };

  const show = open || (view === "onboarding" && !!user);
  if (!show) return null;

  const input =
    "w-full bg-black/60 border-2 border-[#8b30d3]/50 px-3 py-2.5 text-white font-body text-sm outline-none focus:border-[#20ff00]";
  const btn =
    "w-full bg-[#20ff00] text-black font-pixel text-[0.55rem] tracking-[0.12em] px-4 py-3 border-2 border-black hover:opacity-85 disabled:opacity-50";
  const btnGhost =
    "w-full bg-[#8b30d3]/30 text-white font-pixel text-[0.55rem] tracking-[0.12em] px-4 py-3 border-2 border-[#fe9dfe]/60 hover:bg-[#8b30d3]/50";

  return (
    <div className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center p-4">
      <div className="relative w-full max-w-md border-4 border-[#20ff00] bg-[#12081f] p-6 shadow-[8px_8px_0_#8b30d3]">
        {view !== "onboarding" && (
          <button
            type="button"
            onClick={() => {
              onClose();
              setView("landing");
              setMessage({ type: "", text: "" });
            }}
            className="absolute top-3 right-3 font-pixel text-[0.45rem] text-[#fe9dfe] tracking-widest"
          >
            [X]
          </button>
        )}

        {message.text && message.type !== "success_action" && (
          <p
            className={`mb-4 font-pixel text-[0.45rem] tracking-wide text-center ${
              message.type === "error" ? "text-red-400" : message.type === "info" ? "text-[#20ff00]" : "text-[#fe9dfe]"
            }`}
          >
            {message.text}
          </p>
        )}

        {message.type === "success_action" && (
          <div className="text-center py-4">
            <p className="font-pixel text-[0.7rem] text-[#20ff00] mb-4 tracking-wider">QUEST COMPLETE</p>
            <p className="font-body text-sm text-white/70 mb-6">{message.text}</p>
            <button
              type="button"
              className={btn}
              onClick={() => {
                onClose();
                setView("landing");
                setMessage({ type: "", text: "" });
              }}
            >
              Continue
            </button>
          </div>
        )}

        {view === "landing" && message.type !== "success_action" && (
          <div className="text-center py-2">
            <p className="font-pixel text-[0.45rem] text-[#fe9dfe] tracking-[0.2em] mb-2">NEXUS PRIME</p>
            <h2 className="font-pixel text-[0.75rem] text-[#20ff00] tracking-wider mb-3">
              {user ? "PARTY MEMBER" : "NEW GAME+"}
            </h2>
            <p className="font-body text-xs text-white/60 mb-6">
              {user
                ? `Logged in as ${user.user_metadata?.username || user.email}`
                : "Create a hero save to roam the hub."}
            </p>
            {user ? (
              <button type="button" className={btnGhost} onClick={handleLogout}>
                Log Out
              </button>
            ) : (
              <>
                <button type="button" className={`${btn} mb-3`} onClick={() => setView("login")}>
                  Continue
                </button>
                <button type="button" className={btnGhost} onClick={() => setView("signup")}>
                  New Save
                </button>
              </>
            )}
          </div>
        )}

        {view === "login" && message.type !== "success_action" && (
          <div>
            <h2 className="font-pixel text-[0.7rem] text-[#20ff00] text-center tracking-wider mb-4">LOAD GAME</h2>
            <div className="space-y-3 mb-3">
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className={input} />
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className={input} />
            </div>
            <button type="button" className="font-pixel text-[0.4rem] text-[#fe9dfe] mb-4" onClick={() => setView("forgot")}>
              Forgot password?
            </button>
            <button type="button" disabled={loading} className={`${btn} mb-4`} onClick={() => handleAuth("login")}>
              {loading ? "..." : "Login"}
            </button>
            <OAuthRow onGoogle={() => handleAuth("login", "google")} onDiscord={() => handleAuth("login", "discord")} />
            <p className="mt-4 text-center font-body text-xs text-white/50">
              No save?{" "}
              <button type="button" className="text-[#20ff00]" onClick={() => setView("signup")}>
                New Game
              </button>
            </p>
          </div>
        )}

        {view === "signup" && message.type !== "success_action" && (
          <div className="max-h-[75vh] overflow-y-auto">
            <h2 className="font-pixel text-[0.7rem] text-[#20ff00] text-center tracking-wider mb-4">NEW SAVE</h2>
            <div className="space-y-3 mb-3">
              <input type="text" placeholder="Hero name *" maxLength={32} value={username} onChange={(e) => setUsername(e.target.value)} className={input} />
              <input type="url" placeholder="Avatar URL (optional)" value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} className={input} />
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className={input} />
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className={input} />
              <input type="password" placeholder="Confirm" value={confirm} onChange={(e) => setConfirm(e.target.value)} className={input} />
            </div>
            <label className="flex gap-2 items-start mb-4 font-body text-xs text-white/55">
              <input type="checkbox" checked={newsletter} onChange={(e) => setNewsletter(e.target.checked)} className="mt-0.5 accent-[#20ff00]" />
              Quest mail updates (optional)
            </label>
            <button type="button" disabled={loading} className={`${btn} mb-4`} onClick={() => handleAuth("signup")}>
              {loading ? "..." : "Create"}
            </button>
            <OAuthRow onGoogle={() => handleAuth("signup", "google")} onDiscord={() => handleAuth("signup", "discord")} />
          </div>
        )}

        {view === "forgot" && message.type !== "success_action" && (
          <div>
            <h2 className="font-pixel text-[0.7rem] text-[#20ff00] text-center tracking-wider mb-4">PASSWORD SCROLL</h2>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className={`${input} mb-4`} />
            <button type="button" disabled={loading || !email} className={`${btn} mb-3`} onClick={() => handleAuth("reset")}>
              Send
            </button>
            <button type="button" className="w-full font-pixel text-[0.4rem] text-white/50" onClick={() => setView("login")}>
              Back
            </button>
          </div>
        )}

        {view === "update_password" && message.type !== "success_action" && (
          <div>
            <h2 className="font-pixel text-[0.7rem] text-[#20ff00] text-center tracking-wider mb-4">NEW PASSWORD</h2>
            <input type="password" placeholder="New password" value={password} onChange={(e) => setPassword(e.target.value)} className={`${input} mb-3`} />
            <input type="password" placeholder="Confirm" value={confirm} onChange={(e) => setConfirm(e.target.value)} className={`${input} mb-4`} />
            <button type="button" disabled={loading} className={btn} onClick={() => handleAuth("update_password")}>
              Save
            </button>
          </div>
        )}

        {view === "onboarding" && user && (
          <form onSubmit={handleOnboarding}>
            <h2 className="font-pixel text-[0.7rem] text-[#20ff00] text-center tracking-wider mb-4">NAME YOUR HERO</h2>
            <input type="text" required maxLength={32} value={username} onChange={(e) => setUsername(e.target.value)} className={`${input} mb-4`} placeholder="Hero name" />
            <button type="submit" disabled={loading || !username.trim()} className={btn}>
              {loading ? "..." : "Start"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function OAuthRow({ onGoogle, onDiscord }: { onGoogle: () => void; onDiscord: () => void }) {
  return (
    <div className="flex gap-2">
      <button type="button" onClick={onGoogle} className="flex-1 flex items-center justify-center gap-2 border-2 border-white/20 py-2 text-white font-pixel text-[0.4rem] hover:border-[#20ff00]">
        <GoogleIcon /> Google
      </button>
      <button type="button" onClick={onDiscord} className="flex-1 flex items-center justify-center gap-2 border-2 border-white/20 py-2 text-white font-pixel text-[0.4rem] hover:border-[#5865F2]">
        <DiscordIcon /> Discord
      </button>
    </div>
  );
}

export function NexusAuthTrigger({ user, onOpen }: { user: User | null; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="font-pixel text-[clamp(0.45rem,0.75vw,0.55rem)] tracking-[0.1em] text-[#20ff00] uppercase border-2 border-[#20ff00] px-2 py-1 hover:bg-[#20ff00]/15"
    >
      {user ? user.user_metadata?.username || "Account" : "Login"}
    </button>
  );
}
