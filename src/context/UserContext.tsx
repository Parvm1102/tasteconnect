import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  avatar: string;
  location: string;
  specialty: string;
  preferences: Record<string, number>;
  interests: string[];
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  updateUser: (updates: Partial<User>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>({
    id: '1',
    name: 'Alex Thompson',
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    location: 'San Francisco, CA',
    specialty: 'Culinary Explorer',
    preferences: {
      spicy: 75,
      sweet: 60,
      adventurous: 85,
      healthy: 70,
      social: 80,
      budget: 65
    },
    interests: ['Local Food Explorers', 'Coffee Connoisseurs', 'Plant-Based Pioneers']
  });

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};