export type LoginFormValues = {
  email: string;
  password: string;
};

export type RegisterFormValues = {
  username: string;
  email: string;
  password: string;
  height: string;
  weight: string;
  age: string;
  birthday: string;
};

export type AuthApiPayload = {
  username?: string;
  email: string;
  password: string;
  firebaseUid?: string;
  height?: number;
  weight?: number;
  age?: number;
  birthday?: string;
};

export type AuthApiResponse = {
  message: string;
  phase: string;
  user: {
    id?: number;
    email: string;
    firebaseUid?: string;
    username?: string;
    createdAt?: string;
  };
};
