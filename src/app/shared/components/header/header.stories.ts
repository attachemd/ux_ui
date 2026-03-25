import type { Meta, StoryObj } from '@storybook/angular';
import { FtHeaderComponent } from './header.component';

const meta: Meta<any> = {
  title: 'Components/Header',
  component: FtHeaderComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<any>;

export const Default: Story = {
  render: (args) => ({
    props: args,
  }),
};
