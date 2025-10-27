import { authClient } from "@/lib/auth-client";
import type { Session } from "@/lib/auth";

import { Button } from "../ui/button";

export default function StopImpersonationBtn() {
  const cancelImpersonation = async () => {
    try {
      await authClient.admin.stopImpersonating();
      window.location.reload();
    } catch (error) {
      console.error("Failed to stop impersonation:", error);
    }
  };
  return (
    <div>
      <Button onClick={cancelImpersonation}>Stop Impersonation</Button>
    </div>
  );
}

// export default function StopImpersonation() {
//   const handleStopImpersonation = async () => {
//     try {
//       await authClient.admin.stopImpersonating();
//       window.location.reload();
//     } catch (error) {
//       console.error("Failed to stop impersonation:", error);
//     }
//   };
//     if (!authClient.) {
//       return null;
//     }
//   return(

//     <div>

//     </div>
//   );
// }
