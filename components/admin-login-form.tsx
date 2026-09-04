"use client";

import { useActionState, useState } from "react";
import { signInAdmin, signUpAdmin } from "@/app/admin/actions";

export function AdminLoginForm() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [signInState, signInAction, signInPending] = useActionState(signInAdmin, { error: "" });
  const [signUpState, signUpAction, signUpPending] = useActionState(signUpAdmin, { error: "", success: "" });
  const pending = mode === "signin" ? signInPending : signUpPending;
  const state = mode === "signin" ? signInState : signUpState;

  return <div className="admin-auth-card">
    <div className="auth-tabs" role="tablist" aria-label="Admin account access">
      <button className={mode === "signin" ? "auth-tab active" : "auth-tab"} onClick={() => setMode("signin")} role="tab" type="button" aria-selected={mode === "signin"}>Sign in</button>
      <button className={mode === "signup" ? "auth-tab active" : "auth-tab"} onClick={() => setMode("signup")} role="tab" type="button" aria-selected={mode === "signup"}>Create account</button>
    </div>
    <form action={mode === "signin" ? signInAction : signUpAction} className="admin-form">
      <label>Email<input autoComplete="email" name="email" required type="email" /></label>
      <label>Password<input autoComplete={mode === "signin" ? "current-password" : "new-password"} minLength={8} name="password" required type="password" /></label>
      {state.error && <p className="form-error" role="alert">{state.error}</p>}
      {mode === "signup" && signUpState.success && <p className="form-success" role="status">{signUpState.success}</p>}
      <button className="button-primary" disabled={pending} type="submit">{pending ? (mode === "signin" ? "Signing in…" : "Creating account…") : (mode === "signin" ? "Sign in" : "Create account")}</button>
    </form>
    {mode === "signup" && <p className="auth-note">Creating an account does not grant admin access automatically.</p>}
  </div>;
}
