import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Profile from '@components/Profile';

test('Profile component renders correctly', () => {
  const { container } = render(<Profile />);
  expect(container).toMatchSnapshot();
});
