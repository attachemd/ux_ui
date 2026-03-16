import type { Meta, StoryObj } from '@storybook/angular';
import { FTHeaderComponent } from './ft-header.component';

const meta: Meta<FTHeaderComponent> = {
  title: 'Components/Header',
  component: FTHeaderComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<FTHeaderComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
  }),
};
