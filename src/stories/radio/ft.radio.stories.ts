import {FtRadioComponent} from './ft.radio.component';
import type {Meta, StoryObj} from '@storybook/angular';

const meta: Meta<FtRadioComponent> = {
  title: 'Form/Radio',
  component: FtRadioComponent,
  tags: ['autodocs'],
  argTypes: {

  },
  args: {
    isLabel: true,
  }
};

export default meta;
type Story = StoryObj<FtRadioComponent>;

export const Default: Story = {
  args: {

  }
};
