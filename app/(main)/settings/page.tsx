import { Deactivate } from "@/app/components/settings/deactivate";
import { ManageSubscription } from "@/app/components/settings/manage-subscription";
import { NotificationSettings } from "@/app/components/settings/notification-settings";
import { ProfileCard } from "@/app/components/settings/profile-card";
import { UpdatePassword } from "@/app/components/settings/update-password";

export default function SettingsPage() {
  return (
    <main className="mx-auto max-w-[680px] px-8 py-8">
      <h1 className="mb-8 font-display text-[26px] font-extrabold tracking-[-0.8px] text-text">
        Settings
      </h1>

      <ProfileCard />

      {/* Notifications */}
      <NotificationSettings />

      {/* Security */}
      <UpdatePassword />

      {/* Subscription */}
      <ManageSubscription />

      {/* Danger zone */}
      <Deactivate />
    </main>
  );
}
