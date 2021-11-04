export type User = {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
};

export type UserWithPasswordHash = User & {
  passwordHash: string;
};

export type Session = {
  id: number;
  token: string;
  expiry: Date;
  userId: number;
};

export type Errors = { message: string }[];
