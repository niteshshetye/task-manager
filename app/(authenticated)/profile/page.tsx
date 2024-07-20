import { Heading } from "@/app/components/Heading";
import { ProfileForm } from "@/app/components/ProfileForm";
import React from "react";

export default function ProfilePage() {
  return (
    <div>
      <Heading title={"My Profile"} />
      <ProfileForm />
    </div>
  );
}
