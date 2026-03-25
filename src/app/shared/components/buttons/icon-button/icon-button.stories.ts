import { FtIconButtonComponent } from './icon-button.component';
import type {Meta, StoryObj} from '@storybook/angular';

const meta: Meta<any> = {
  title: 'Core/Icon Button/Icon Button',
  component: FtIconButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    iconClass: {
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
      options: ['flat', 'ghost', 'faded', 'outlined', 'icon'],
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
    size: 'md-size',
    radius: 'md-radius',
    state: 'rest',
    iconClass: 'face',
  },
};

export default meta;
type Story = StoryObj<any>;

export const Default: Story = {
  args: {
    label: "Label"
  }
};

