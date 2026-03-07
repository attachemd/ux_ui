import { Meta, StoryObj } from '@storybook/angular';
import { FTTextareaComponent } from './ft.textarea.component';

const meta: Meta<FTTextareaComponent> = {
  title: 'Inputs/Textarea',
  component: FTTextareaComponent,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs-size', 'sm-size', 'md-size', 'lg-size'],
    },
    variant: {
      control: 'select',
      options: ['flat', 'faded', 'outlined', 'ghost'],
    },
    state: {
      control: 'select',
      options: ['rest', 'hover', 'focus', 'readonly', 'disabled', 'invalid'],
    },
    radius: {
      control: 'select',
      options: ['none-radius', 'xs-radius', 'sm-radius', 'md-radius', 'lg-radius', 'full-radius'],
    },
    labelPlacement: {
      control: 'select',
      options: ['inside', 'top', 'left'],
    },
  },
  args: {
    label: 'Message',
    placeholder: 'Enter your message here...',
    size: 'md-size',
    radius: 'md-radius',
    state: 'rest',
    variant: 'flat',
    isClearable: true,
    rows: 4,
    value: 'Hello, this is a test message.',
    labelPlacement: 'inside'
  },
};

export default meta;
type Story = StoryObj<FTTextareaComponent>;

export const Default: Story = {
  args: {}
};

export const LabelTop: Story = {
  args: {
    labelPlacement: 'top'
  }
};

export const LabelLeft: Story = {
  args: {
    labelPlacement: 'left'
  }
};

export const Invalid: Story = {
  args: {
    state: 'invalid',
    errorMessage: 'This field is required'
  }
};

export const Disabled: Story = {
  args: {
    state: 'disabled'
  }
};
