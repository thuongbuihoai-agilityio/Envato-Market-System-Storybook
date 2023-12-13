export interface IUserBase {
  id: string;
  firstName: string;
  lastName: string;
  createdAt: number;
  avatarURL: string;
  email: string;
}

export type TEmployee = Omit<IUserBase, 'email'> & {
  lastActive: string;
  lastPlace: string;
  workTime: string;
  level: string;
  position: string;
};

export type TCustomer = Pick<IUserBase, 'id' | 'email'> & {
  name: string;
  avatar: string;
  location: string;
};

export type TUserDetail = Omit<IUserBase, 'avatarURL'> & {
  avatarURL?: string;
  password: string;
  phoneNumber: string;
  country: string;
  city: string;
  address: string;
  postalCode: string;
  facebookURL?: string;
  twitterURL?: string;
  linkedinURL?: string;
  youtubeURL?: string;
};
