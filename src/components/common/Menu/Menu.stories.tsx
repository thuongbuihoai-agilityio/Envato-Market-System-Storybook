import type { Meta, StoryObj } from '@storybook/react';

// components
import { Menu } from '@components/index';
import { MENU_ITEM_LIST } from '@constants/sidebar';

const meta: Meta<typeof Menu> = {
  title: 'Custom Components/Menu',
  tags: ['autodocs'],
  component: Menu,
  argTypes: {
    title: {
      description: 'The title of the Menu component',
    },

    listItem: {
      description: 'The list item of the menu',
    },

    isMinify: {
      description: 'Determine the mode of the menu in sidebar: expand or mini',
    },
  },
  parameters: {
    controls: {
      expanded: true,
    },
  },
};

export default meta;

type Story = StoryObj<typeof Menu>;

export const Epxand: Story = {
  args: {
    title: 'Expand Menu Component',
    listItem: MENU_ITEM_LIST,
  },
};

export const Minify: Story = {
  args: {
    title: 'Minify Menu Component',
    listItem: MENU_ITEM_LIST,
    isMinify: true,
  },
};
