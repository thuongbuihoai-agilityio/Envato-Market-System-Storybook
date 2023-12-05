import type { Meta, StoryObj } from '@storybook/react';

// components
import { MiniSidebar } from '@components/index';

const meta: Meta<typeof MiniSidebar> = {
  title: 'Custom Components/MiniSidebar',

  component: MiniSidebar,

  argTypes: {
    isOpen: {
      description: 'The state of the MiniSidebar component',
      defaultValue: true,
    },

    onClose: {
      description:
        'The callback function to close the MiniSidebar and open ExpandSidebar component',
    },
  },
};

export default meta;

type Story = StoryObj<typeof MiniSidebar>;

export const Primary: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
  },
};