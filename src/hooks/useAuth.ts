import { AxiosResponse } from 'axios';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Constants
import { END_POINTS, SEARCH_PARAM, ERROR_MESSAGES } from '@constants/index';

// Services
import { UsersHttpService } from '@services/index';

// Types
import { TUser } from '@interfaces/user';

// Utils
import { getCurrentTime } from '@utils/index';

type TSignUpErrorField = Partial<
  Record<keyof Omit<TUser, 'id' | 'createdAt'>, string>
>;

export type TUserInfo = Omit<TUser, 'password'> | null;

export type TUseAuth = {
  user: TUserInfo;
  isRemember: boolean;
  startDate: number;
  signIn: (
    {
      email,
      password,
    }: {
      email: string;
      password: string;
    },
    isRemember?: boolean,
  ) => Promise<void>;
  signUp: (userInfo: Omit<TUser, 'id' | 'createdAt'>) => Promise<{
    errors?: TSignUpErrorField;
  }>;
  signOut: () => void;
};

export const useAuth = create(
  persist<TUseAuth>(
    (set) => ({
      user: null,
      isRemember: false,
      startDate: 0,
      signIn: async ({ email, password }, isRemember) => {
        const { data = [] }: AxiosResponse<TUser[] | undefined> =
          await UsersHttpService.get<TUser[] | undefined>(
            `${END_POINTS.USERS}?${SEARCH_PARAM.EMAIL}=${email}&${SEARCH_PARAM.PASSWORD}=${password}`,
          );

        // Because search by params working incorrect
        const user: TUser | undefined = data.find(
          (user) => user.email === email && user.password === password,
        );

        if (!user) {
          throw new Error(ERROR_MESSAGES.AUTH_INCORRECT);
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: pass, ...userInfo } = user;

        return set({ user: userInfo, isRemember, startDate: getCurrentTime() });
      },
      signUp: async (userInfo) => {
        const { email, password } = userInfo;
        const { data = [] }: AxiosResponse<TUser[] | undefined> =
          await UsersHttpService.get<TUser[] | undefined>(
            `${END_POINTS.USERS}?${SEARCH_PARAM.EMAIL}=${email}&${SEARCH_PARAM.PASSWORD}=${password}`,
          );
        // Because search by params working incorrect
        const user: TUser | undefined = data.find(
          (user) => user.email === email,
        );

        if (user) {
          return {
            errors: {
              email: ERROR_MESSAGES.ACCOUNT_ALREADY_EXISTS,
            },
          };
        }

        // Send request add new user
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: responsePassword, ...response }: TUser =
          await UsersHttpService.post<TUser>(
            END_POINTS.USERS,
            {
              ...userInfo,
              createdAt: Date.now(),
            },
            {},
          ).then((res) => res.data);

        // Save user into store
        set({ user: response, startDate: getCurrentTime() });

        return {};
      },
      signOut: () => set({ user: null, isRemember: false, startDate: 0 }),
    }),
    { name: 'authentication' },
  ),
);
