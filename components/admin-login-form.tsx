"use client";

import { useActionState } from "react";
import { signInAdmin } from "@/app/admin/actions";

export function AdminLoginForm() {
  const [state, action, pending] = useActionState(signInAdmin, { error: "" });

  return <form action={action} className="admin-form">
    <label>Email<input autoComplete="email" name="email" required type="email" /></label>
    <label>Password<input autoComplete="current-password" name="password" required type="password" /></label>
    {state.error && <p className="form-error" role="alert">{state.error}</p>}
    <button className="button-primary" disabled={pending} type="submit">{pending ? "Signing in…" : "Sign in"}</button>
  </form>;
}
