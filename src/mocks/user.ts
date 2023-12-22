import { TEmployee } from '@app/interfaces';

export const USER_MOCK: TEmployee = {
  avatarURL: 'https://cdn-icons-png.flaticon.com/512/5556/5556468.png',
  firstName: 'Abdur',
  lastName: 'Rohman',
  lastActive: '2 days ago',
  workTime: 'Full Time',
  level: 'Senior Level',
  position: 'Finance managers',
  lastPlace: 'Jakarta, Indonesia',
  id: '1',
  createdAt: 3123123,
  salary: 1234,
};

export const USERS_MOCK = [
  {
    avatarURL: 'https://cdn-icons-png.flaticon.com/512/5556/5556468.png',
    firstName: 'Abdur',
    lastName: 'Rohman',
    lastActive: '2 days ago',
    workTime: 'Full Time',
    level: 'Senior Level',
    position: 'Finance managers',
    lastPlace: 'Jakarta, Indonesia',
    id: '1',
    createdAt: 3123123,
    salary: 1234,
  },
  {
    avatarURL: 'https://cdn-icons-png.flaticon.com/512/5556/5556468.png',
    firstName: 'Devon',
    lastName: 'Rohman',
    lastActive: '4 days ago',
    workTime: 'Full Time',
    level: 'Senior Level',
    position: 'Finance managers',
    lastPlace: 'Jakarta, Indonesia',
    id: '2',
    createdAt: 132312321,
    salary: 1234,
  },
];

export const INITIAL_USER = {
  avatarURL: '',
  firstName: '',
  lastName: '',
  lastActive: '',
  workTime: '',
  level: '',
  position: '',
  lastPlace: '',
  id: '',
  createdAt: 0,
  salary: 0,
};

export const MOCK_USER_DATA = {
  user: {
    firstName: 'Duong',
    lastName: 'Pham',
    email: 'duong.pham2@asnet.com.vn',
    creatAt: 1703059988,
    avatarURL: '/images/avatar-sign-up.webp',
    phoneNumber: 'phoneNumber 20',
    country: 'country 20',
    postalCode: 'postalCode 20',
    facebookURL: 'facebookURL 20',
    twitterURL: 'twitterURL 20',
    linkedinURL: 'linkedinURL 20',
    youtubeURL: 'youtubeURL 20',
    id: '20',
    createdAt: 1703061187583,
  },
  isRemember: false,
  date: 1703210585.219,
};
