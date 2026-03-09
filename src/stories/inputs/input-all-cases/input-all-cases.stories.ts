import type { Meta, StoryObj } from '@storybook/angular';
import { InputAllCasesComponent } from './input-all-cases.component';

const meta: Meta<InputAllCasesComponent> = {
  title: 'Inputs/Input All Cases',
  component: InputAllCasesComponent,
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
    showContent: {
      control: 'boolean',
    },
    placeholder: {
      control: 'text',
    },
    isPrefixIconClass: {
      control: 'boolean',
    },
    startContent: {
      control: 'text',
    },
    endContent: {
      control: 'text',
    },
    isSuffix1IconClass: {
      control: 'boolean',
    },
    suffix1IconClass: {
      control: 'select',
      options: ['visibility', 'visibility_off', 'close_small', 'search', 'edit', 'check'],
    },
    isSuffix2IconClass: {
      control: 'boolean',
    },
    suffix2IconClass: {
      control: 'select',
      options: ['search', 'keyboard_arrow_down', 'calendar_today', 'tune', 'filter_list'],
    },
    inputType: {
      control: 'select',
      options: ['text', 'password'],
    },
  },
  args: {
    isPrefixIconClass: false,
    radius: 'md-radius',
    size: 'md-size',
    color: 'primary',
    variant: 'flat',
    isDescription: false,
    showContent: false,
    placeholder: 'Enter your username',
    isSuffix1IconClass: false,
    suffix1IconClass: 'edit',
    isSuffix2IconClass: false,
    suffix2IconClass: 'search',
    inputType: 'text',
  },
};

export default meta;
type Story = StoryObj<InputAllCasesComponent>;

export const Default: Story = {
  args: {},
};

export const WithContent: Story = {
  args: {
    showContent: true,
  },
};

export const WithStartContent: Story = {
  args: {
    startContent: '$',
  },
};

export const WithEndContent: Story = {
  args: {
    endContent: '@gmail.com',
  },
};

export const WithStartAndEndContent: Story = {
  args: {
    startContent: 'https://',
    endContent: '.org',
  },
};

export const PasswordType: Story = {
  args: {
    inputType: 'password',
    isPrefixIconClass: true,
    prefixIconClass: 'lock',
  },
};

export const WithPrefixIcon: Story = {
  args: {
    isPrefixIconClass: true,
  },
};

export const WithSuffixIcons: Story = {
  args: {
    isSuffix1IconClass: true,
    suffix1IconClass: 'edit',
    isSuffix2IconClass: true,
    suffix2IconClass: 'search',
  },
};

export const FullyLoaded: Story = {
  args: {
    showContent: true,
    isPrefixIconClass: true,
    isSuffix1IconClass: true,
    suffix1IconClass: 'edit',
    isSuffix2IconClass: true,
    suffix2IconClass: 'search',
    startContent: 'https://',
    endContent: '.com',
  },
};

