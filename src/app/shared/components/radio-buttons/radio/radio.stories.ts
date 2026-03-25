import {FtRadioComponent} from './radio.component';
import type {Meta, StoryObj} from '@storybook/angular';

const meta: Meta<any> = {
  title: 'Core/Radio/Radio',
  component: FtRadioComponent,
  tags: ['autodocs'],
  parameters: {
    order: 1,  // Lower number = appears earlier
  },
  argTypes: {

  },
  args: {
    isLabel: true,
  }
};

export default meta;
type Story = StoryObj<any>;

export const Default: Story = {
  args: {

  }
};

export const Hover: Story = {
  args: {
    state: "hover"
  }
};

export const Select: Story = {
  args: {
    select: true
  }
};

export const SelectAndHover: Story = {
  args: {
    select: true,
    state: "hover"
  }
};

