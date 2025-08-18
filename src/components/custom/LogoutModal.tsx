"use client";
import { useState } from "react";
import { LogOut } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { logout } from "@/app/logout/actions";

type LogoutModalProps = {
  children: React.ReactNode;
};

export default function LogoutModal({ children }: LogoutModalProps) {
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [logouting, setLogouting] = useState(false);

  return (
    <Sheet open={logoutModalOpen} onOpenChange={setLogoutModalOpen}>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md bg-white">
        <SheetHeader className="space-y-3 pb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-full">
              <LogOut className="h-6 w-6 text-red-600" />
            </div>
            <SheetTitle className="text-xl font-bold text-gray-800">Confirm Logout</SheetTitle>
          </div>
          <p className="text-gray-600 text-sm">Are you sure you want to log out?</p>
        </SheetHeader>
        <div className="flex gap-3 mt-8">
          <Button
            onClick={async () => {
              setLogouting(true);
              await logout();
            }}
            disabled={logouting}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white"
          >
            {logouting ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Yes, Logout"
            )}
          </Button>
          <Button
            variant="outline"
            onClick={() => setLogoutModalOpen(false)}
            disabled={logouting}
            className="px-6"
          >
            Cancel
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}