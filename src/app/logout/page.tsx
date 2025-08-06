import { Button } from "@/components/ui/button";
import { logout } from "./actions";

export default function LogoutPage() {
  return (
    <div>
      <h1>Logout</h1>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
}
