import { useEffect } from "react";

import { Toaster, toast } from "@siplist/ui/components/sonner";

export function Default() {
  useEffect(() => {
    toast.success("Added to your library");
    toast.message("Now playing", { description: "Midnight City — M83" });
  }, []);
  return (
    <div style={{ position: "relative", minHeight: 160, width: 380 }}>
      <Toaster position="top-center" />
    </div>
  );
}
