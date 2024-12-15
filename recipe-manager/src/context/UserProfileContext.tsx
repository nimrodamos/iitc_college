import { createContext, useContext, useState, ReactNode } from "react";

interface Profile {
  name: string;
  email: string;
}

interface ProfileContextType {
  profile: Profile;
  updateProfile: (newProfile: Profile) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<Profile>({
    name: "Nimrod Amos",
    email: "nimrodamos@example.com",
  });

  const updateProfile = (newProfile: Profile) => {
    setProfile(newProfile);
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};
