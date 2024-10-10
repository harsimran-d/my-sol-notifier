import SignOutButton from "./components/SignOutButton";
import UserEmail from "./components/UserEmail";

export default function DashboardNavBar() {
  return (
    <div>
      <UserEmail />
      <SignOutButton />
    </div>
  );
}
