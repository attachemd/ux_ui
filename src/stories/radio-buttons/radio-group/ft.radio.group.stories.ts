import {FtRadioGroupComponent} from './ft.radio.group.component';
import type {Meta, StoryObj} from '@storybook/angular';

const meta: Meta<FtRadioGroupComponent> = {
  title: 'Radio Buttons/Radio Group',
  component: FtRadioGroupComponent,
  tags: ['autodocs'],
  argTypes: {
    options: {
      control: "object"
    },
    flexDirection: {
      control: "select",
      options: ["flex-row", "flex-col"]
    },
    isDescription: {
      control: "boolean",
      options: [true, false],
    },
    invalid: {
      control: "boolean",
      options: [true, false],
    },
    inactive: {
      control: "boolean",
      // options: [true, false],
    }

  },
  args: {
    isLabel: true,
    label: 'Radio Group',
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
    flexDirection: "flex-row",
    isDescription: false,
    invalid: false,
    inactive: false,
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

  }
};

export const Description: Story = {
  args: {
    isDescription: true,
    description: "Description for Radio Group"
  }
};

export const Invalid: Story = {
  args: {
    invalid: true,
    errorMessage: "An error occurred",
  }
};

