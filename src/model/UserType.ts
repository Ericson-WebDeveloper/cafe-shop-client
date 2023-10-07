export interface IUserDetailType {
  _id: string;
  user: string | IUserType;
  avatar: string;
  address: string;
  token?: {
    code: string;
    date: Date;
  };
}

export interface IUserType {
  _id: string;
  name: string;
  email: string;
  password?: string;
  status: boolean;
  is_admin: boolean;
  details?: IUserDetailType | string;
}
