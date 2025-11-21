import {FtRadioGroupComponent} from './ft.radio.group.component';
import type {Meta, StoryObj} from '@storybook/angular';

const meta: Meta<FtRadioGroupComponent> = {
  title: 'Form/Radio Group',
  component: FtRadioGroupComponent,
  tags: ['autodocs'],
  argTypes: {
    options: {
      control: "object"
    },
    flexDirection: {
      control: "select",
      options: ["flex-row", "flex-col"]
    }

  },
  args: {
    isLabel: true,
    options: [
      {
      isLabel: true,
      label: 'Option A',
      isDescription: true,
      description: 'Description for Option A'
    },
      {
      isLabel: true,
      label: 'Option B',
      isDescription: true,
      description: 'Description for Option B'
    },
      {
      isLabel: true,
      label: 'Option C',
      isDescription: true,
      description: 'Description for Option C'
    }
    ],
    flexDirection: "flex-row"
  }
};

export default meta;
type Story = StoryObj<FtRadioGroupComponent>;

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
