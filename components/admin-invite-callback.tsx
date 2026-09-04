"use client";

import { useEffect, useRef } from "react";
import { completeAdminInvite } from "@/app/admin/actions";

export function AdminInviteCallback() {
  const started = useRef(false);

  useEffect(() => {
    const hash = new URLSearchParams(window.location.hash.slice(1));
    const accessToken = hash.get("access_token");
    const refreshToken = hash.get("refresh_token");
    if (!accessToken || !refreshToken || started.current) return;

    started.current = true;
    const formData = new FormData();
    formData.set("accessToken", accessToken);
    formData.set("refreshToken", refreshToken);
    void completeAdminInvite(formData);
  }, []);

  return null;
}
