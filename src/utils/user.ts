// Types
import { TDataSource } from '@components/index';
import { TEmployee } from '@interfaces/index';

// Mocks
import { TRANSACTIONS } from '@mocks/index';

export type TShowEmployee = Omit<
  TEmployee,
  'id' | 'createdAt' | 'lastName' | 'firstName' | 'avatarURL'
> &
  TDataSource & {
    name: string;
    image: string;
  };

/**
 *  Convert data for table user when render in User page
 * @param users
 * @returns
 */
export const getDataUser = (users: TEmployee[]): TShowEmployee[] =>
  users.map((user) => {
    const {
      id,
      firstName,
      lastName,
      level,
      workTime,
      avatarURL,
      position,
      lastActive,
      lastPlace,
    } = user;

    return {
      id,
      workTime,
      level,
      position,
      lastActive,
      lastPlace,
      name: `${firstName} ${lastName}`,
      image: avatarURL || TRANSACTIONS[0].customer.avatar,
    };
  });