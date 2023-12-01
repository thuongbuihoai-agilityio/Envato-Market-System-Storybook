import type { Meta, StoryObj } from '@storybook/react';

// Components
import Dropdown from './index';

const meta: Meta<typeof Dropdown> = {
  title: 'Custom Components/Dropdown',
  component: Dropdown,
  argTypes: {
    name: {
      description: 'This is username after login',
    },
    permission: {
      description: 'This is that persons right',
    },
  },
  parameters: {
    controls: {
      expanded: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
  args: {
    name: 'John Doe',
    permission: 'Super Admin',
  },
};
