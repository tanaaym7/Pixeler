"use client";

import { useSubscriptionModal } from "@/features/subscriptions/store/use-subscription-modal";
import { useCheckout } from "../api/use-checkout";
import Image from "next/image";

import { CheckCircle2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";

export const SubscriptionModal = () => {
  const mutation = useCheckout();
  const { isOpen, onClose } = useSubscriptionModal();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <div className="bg-gradient-to-br from-blue-100/30 to-purple-100/30 rounded-2xl backdrop-blur-md bg-opacity-70 shadow-lg border border-white/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-white/50 filter blur-xl"></div>
          <div className="relative z-10">
            <DialogHeader className="flex flex-col items-center space-y-6 p-8">
              <div className="rounded-full bg-white p-2 shadow-inner">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={48}
                  height={48}
                  className="drop-shadow-md"
                />
              </div>
              <DialogTitle className="text-3xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                Elevate Your Experience
              </DialogTitle>
              <DialogDescription className="text-center text-gray-600 max-w-md">
                Unlock a world of premium features and take your creativity to
                new heights
              </DialogDescription>
            </DialogHeader>
            <Separator className="bg-gradient-to-r from-blue-200/50 to-purple-200/50" />
            <ul className="space-y-4 p-8">
              {[
                "Unlimited projects",
                "Unlimited templates",
                "AI Background removal",
                "AI Image generation",
              ].map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center space-x-3 transition-all duration-300 hover:translate-x-1"
                >
                  <div className="bg-blue-100 rounded-full p-1 shadow-inner">
                    <CheckCircle2 className="size-5 text-blue-500" />
                  </div>
                  <p className="text-sm font-medium text-gray-700">{feature}</p>
                </li>
              ))}
            </ul>
            <DialogFooter className="p-8">
              <Button
                className="w-full"
                onClick={() => mutation.mutate()}
                disabled={mutation.isPending}
              >
                Upgrade
              </Button>
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
