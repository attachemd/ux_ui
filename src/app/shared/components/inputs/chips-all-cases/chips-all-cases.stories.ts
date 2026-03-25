import type { Meta, StoryObj } from '@storybook/angular';
import { ChipsAllCasesComponent } from './chips-all-cases.component';

const meta: Meta<ChipsAllCasesComponent> = {
  title: 'Core/Chips/Chips All Cases',
  component: ChipsAllCasesComponent,
  argTypes: {
    radius: {
      control: 'select',
      options: ['none-radius', 'xs-radius', 'sm-radius', 'md-radius', 'lg-radius', 'full-radius'],
    },
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
    isDescription: {
      control: 'boolean',
    },
    isClearable: {
      control: 'boolean',
    },
  },
  args: {
    radius: 'md-radius',
    size: 'md-size',
    color: 'primary',
    variant: 'flat',
    isDescription: false,
    isClearable: true,
  },
};

export default meta;
type Story = StoryObj<ChipsAllCasesComponent>;

export const Default: Story = {
  args: {},
};

