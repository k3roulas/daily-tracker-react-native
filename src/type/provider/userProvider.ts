export type UserContextType = {
  user: User | null;
  error: string | null;
  signOut: () => void;
} | null;

export type User = {
  id: string;
  name: string | null;
  email: string;
  photo: string | null;
  familyName: string | null;
  givenName: string | null;
};
