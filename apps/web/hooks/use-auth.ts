"use client";

import { useEffect, useState } from "react";
import { getSession } from "@/lib/auth";

export function useAuth() {
  const [isReady, setReady] = useState(false);

  useEffect(() => {
    getSession().finally(() => setReady(true));
  }, []);

  return { isReady };
}
