import SignOutButton from "./components/SignOutButton";
import UserEmail from "./components/UserEmail";

export default function DashboardNavBar() {
  return (
    <div className="flex justify-end space-x-4 bg-blue-500 p-4 text-white">
      <UserEmail />
      <SignOutButton />
    </div>
  );
}
