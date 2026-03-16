import type { Meta, StoryObj } from '@storybook/angular';
import { FTSearchComponent } from './ft-search.component';

const meta: Meta<FTSearchComponent> = {
  title: 'Components/Search',
  component: FTSearchComponent,
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
    radius: {
      control: 'select',
      options: ['none-radius', 'xs-radius', 'sm-radius', 'md-radius', 'lg-radius', 'full-radius'],
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'tertiary', 'success', 'warning', 'danger'],
    },
  },
};

export default meta;
type Story = StoryObj<FTSearchComponent>;

export const Default: Story = {
  args: {
    placeholder: 'Search...',
    size: 'md-size',
    variant: 'faded',
    radius: 'full-radius',
    isClearable: true,
  },
};

export const Outlined: Story = {
  args: {
    ...Default.args,
    variant: 'outlined',
  },
};

export const Ghost: Story = {
  args: {
    ...Default.args,
    variant: 'ghost',
  },
};

export const Small: Story = {
  args: {
    ...Default.args,
    size: 'sm-size',
  },
};

export const Large: Story = {
  args: {
    ...Default.args,
    size: 'lg-size',
  },
};

export const ToggleControl: Story = {
  args: {
    ...Default.args,
    isOpen: true,
  },
};

export const Controlled: Story = {
  args: {
    ...Default.args,
    isOpen: true,
    autoCollapse: false,
  },
};

export const Secondary: Story = {
  args: {
    ...Default.args,
    color: 'secondary',
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};
