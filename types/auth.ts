export type RegisterPayload = {
  name: string;
  username: string;
  email: string;
  password: string;
};

export type LoginPayload = {
  emailOrUsername: string;
  password: string;
};

export type UserLite = {
  id: string;
  name: string;
  username: string;
  email: string;
  created_at: string;
  updated_at: string;
};

export type RegisterResponse = {
  status: "Success";
  message: string;
  data: UserLite;
};
