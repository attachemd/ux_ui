import type { Meta, StoryObj } from '@storybook/angular';
import { InputAllCasesComponent } from './input-all-cases.component';

const meta: Meta<InputAllCasesComponent> = {
  title: 'Core/Inputs/Input All Cases',
  component: InputAllCasesComponent,
  argTypes: {
    size: {
      control: 'select',
      options: ['xs-size', 'sm-size', 'md-size', 'lg-size'],
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'tertiary', 'success', 'warning', 'danger'],
    },
    variant: {
      control: 'select',
      options: ['flat', 'faded', 'outlined', 'ghost'],
    },
    radius: {
      control: 'select',
      options: ['none-radius', 'xs-radius', 'sm-radius', 'md-radius', 'lg-radius', 'full-radius'],
    },
    inputType: {
      control: 'select',
      options: ['text', 'password'],
    },
  },
  args: {
    size: 'md-size',
    color: 'primary',
    variant: 'flat',
    radius: 'md-radius',
    placeholder: 'Enter your username',
    prefixIconClass: '',
    isPrefixIconClass: false,
    suffix1IconClass: 'visibility',
    isSuffix1IconClass: false,
    suffix2IconClass: 'search',
    isSuffix2IconClass: false,
    inputType: 'text',
    isDescription: false,
    showContent: false,
  },
};

export default meta;
type Story = StoryObj<InputAllCasesComponent>;

export const Default: Story = {
  args: {},
};
