import { memo, useCallback } from 'react';
import areEqual from 'react-fast-compare';

// Components
import {
  Table,
  UserInfoCell,
  StatusCell,
  ActionsCell,
  TDataSource,
} from '@components/index';

// Types
import { TEmployee } from '@interfaces/user';

// Utils
import { getDataUser } from '@utils/index';

// Constants
import { STATUS_LABEL } from '@constants/status';

type TUsersProps = {
  users: TEmployee[];
};

type TStatus = keyof typeof STATUS_LABEL;

const UsersComponent = ({ users }: TUsersProps): JSX.Element => {
  const renderHead = useCallback((): JSX.Element => <></>, []);

  const columns = [
    {
      key: 'info',
      renderHead: renderHead,
      renderBody: ({
        name,
        image,
        position,
        lastPlace,
        lastActive,
      }: TDataSource): JSX.Element => (
        <UserInfoCell
          name={`${name}`}
          imageURL={`${image}`}
          address={`${lastPlace}`}
          time={`${lastActive}`}
          role={`${position}`}
        />
      ),
    },
    {
      key: 'workTime',
      renderHead,
      renderBody: ({ workTime }: TDataSource): JSX.Element => (
        <StatusCell
          variant={STATUS_LABEL[`${workTime}` as TStatus]}
          text={`${workTime}`}
        />
      ),
    },
    {
      key: 'level',
      renderHead,
      renderBody: ({ level }: TDataSource): JSX.Element => (
        <StatusCell
          variant={STATUS_LABEL[`${level}` as TStatus]}
          text={`${level}`}
        />
      ),
    },
    {
      key: 'actions',
      renderHead,
      renderBody: () => <ActionsCell />,
    },
  ];

  return (
    <Table
      variant="secondary"
      columns={columns}
      dataSource={getDataUser(users)}
    />
  );
};

const Users = memo(UsersComponent, areEqual);

export default Users;