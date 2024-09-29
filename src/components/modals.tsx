"use client";

import { SubscriptionModal } from "@/features/subscriptions/components/subscription-modal";
import { useEffect, useState } from "react";
import { FailModal } from "@/features/subscriptions/components/fail-modal";
export const Modals = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <FailModal />
      <SubscriptionModal />
    </>
  );
};
