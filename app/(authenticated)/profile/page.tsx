import { fetchProfile, updateProfile } from "@/app/actions/profile";
import { Heading } from "@/app/components/Heading";
import { ProfileForm } from "@/app/components/ProfileForm";
import React from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
}

export default async function ProfilePage() {
  const { isError, message, data } = await fetchProfile();

  return (
    <div>
      <Heading title={"My Profile"} />
      <ProfileForm
        isError={isError}
        message={message}
        user={data}
        onProfileUpdate={updateProfile}
      />
    </div>
  );
}
