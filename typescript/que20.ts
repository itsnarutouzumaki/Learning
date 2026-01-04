// Use Pick<T, K> to extract specific properties from a type.

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

// Create a new type for a public profile, excluding sensitive info
type PublicUser = Pick<User, 'id' | 'name'>;

const userProfile: PublicUser = {
  id: 123,
  name: 'John Doe',
  // Trying to add 'email' or 'password' here would cause a TypeScript error
};
