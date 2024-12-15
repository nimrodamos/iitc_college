import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useProfile } from "@/context/UserProfileContext";

const Profile = () => {
  const { profile, updateProfile } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);

  const handleSave = () => {
    updateProfile({ name, email });
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const handleCancel = () => {
    setName(profile.name);
    setEmail(profile.email);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white flex justify-center items-center p-8">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        {isEditing ? (
          <form className="space-y-4">
            <div>
              <label className="block font-semibold mb-2">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-gray-50 dark:bg-gray-700 text-black dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-gray-50 dark:bg-gray-700 text-black dark:text-white"
                required
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="bg-blue-500 hover:bg-blue-600"
              >
                Save
              </Button>
            </div>
          </form>
        ) : (
          <div>
            <p className="mb-4">
              <span className="font-semibold">Name:</span> {profile.name}
            </p>
            <p className="mb-4">
              <span className="font-semibold">Email:</span> {profile.email}
            </p>
            <Button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-500 hover:bg-yellow-600"
            >
              Edit Profile
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
