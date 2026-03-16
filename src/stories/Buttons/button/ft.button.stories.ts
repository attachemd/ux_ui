import { FtButtonComponent } from './ft.button.component';
import type { Meta, StoryObj } from '@storybook/angular';

const meta: Meta<FtButtonComponent> = {
  title: 'Core/Button/Button',
  component: FtButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    prefixIconClass: {
      control: 'select',
      options: [
        'person',
        'menu',
        'output'
      ],
      description: 'Select an icon class for the component',
    },
    suffixIconClass: {
      control: 'select',
      options: [
        'face',
        'menu',
        'output',
        'close',
        'expand_more'
      ],
      description: 'Select an icon class for the component',
    },

    size: {
      control: 'select',
      options: ['xs-size', 'sm-size', 'md-size', 'lg-size'],
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary'],
    },
    variant: {
      control: 'select',
      options: ['flat', 'ghost', 'faded', 'outlined'],
    },
    state: {
      control: 'select',
      options: ['rest', 'hover', 'press', 'focus', 'disabled'],
    },
    radius: {
      control: 'select',
      options: ['none-radius', 'xs-radius', 'sm-radius', 'md-radius', 'lg-radius', 'full-radius'],
    },
  },
  args: {
    isLabel: true,
    label: 'Label',
    size: 'md-size',
    radius: 'md-radius',
    state: 'rest',
    isPrefixIconClass: true,
    prefixIconClass: 'person',
    isSuffixIconClass: true,
    suffixIconClass: 'face',
  },
};

export default meta;
type Story = StoryObj<FtButtonComponent>;

export const Default: Story = {
  args: {
    label: "Label"
  }
};

