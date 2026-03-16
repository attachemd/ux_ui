import { FTInputComponent } from './ft.input.component';
import type { Meta, StoryObj } from '@storybook/angular';

const meta: Meta<FTInputComponent> = {
  title: 'Core/Inputs/Input',
  component: FTInputComponent,
  tags: [],
  argTypes: {
    // Styling Category
    size: {
      control: 'select',
      options: ['xs-size', 'sm-size', 'md-size', 'lg-size'],
      table: { category: 'Styling' },
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'tertiary', 'success', 'warning', 'danger'],
      table: { category: 'Styling' },
    },
    variant: {
      control: 'select',
      options: ['flat', 'faded', 'outlined', 'ghost'],
      table: { category: 'Styling' },
    },
    radius: {
      control: 'select',
      options: ['none-radius', 'xs-radius', 'sm-radius', 'md-radius', 'lg-radius', 'full-radius'],
      table: { category: 'Styling' },
    },
    labelPlacement: {
      control: 'select',
      options: ['label-inside', 'label-outside', 'label-outside-left'],
      table: { category: 'Styling' },
    },

    // Content Category
    label: { table: { category: 'Content' } },
    isLabel: { table: { category: 'Content' } },
    placeholder: { table: { category: 'Content' } },
    content: { table: { category: 'Content' } },
    description: { table: { category: 'Content' } },
    isDescription: { table: { category: 'Content' } },
    startContent: { table: { category: 'Content' } },
    endContent: { table: { category: 'Content' } },
    errorMessage: { table: { category: 'Content' } },

    // Icons Category
    isPrefixIconClass: { table: { category: 'Icons' } },
    prefixIconClass: {
      control: 'text',
      table: { category: 'Icons' },
    },
    isSuffix1IconClass: { table: { category: 'Icons' } },
    suffix1IconClass: {
      control: 'text',
      table: { category: 'Icons' },
    },
    isSuffix2IconClass: { table: { category: 'Icons' } },
    suffix2IconClass: {
      control: 'text',
      table: { category: 'Icons' },
    },

    // State Category
    state: {
      control: 'select',
      options: ['rest', 'hover', 'press', 'focus', 'readonly', 'disabled', 'invalid', 'content'],
      table: { category: 'State' },
    },
    disabled: { table: { category: 'State' } },
    readonly: { table: { category: 'State' } },
    required: { table: { category: 'State' } },
    invalid: { table: { category: 'State' } },
    isClearable: { table: { category: 'State' } },

    // Configuration
    inputType: {
      control: 'select',
      options: ['text', 'password'],
      table: { category: 'Configuration' },
    },
    showContent: { table: { category: 'Configuration' } },
  },
  args: {
    isLabel: true,
    label: 'Label',
    labelPlacement: 'label-inside',
    content: '',
    size: 'md-size',
    radius: 'md-radius',
    state: 'rest',
    isPrefixIconClass: false,
    prefixIconClass: 'person',
    isSuffix1IconClass: false,
    suffix1IconClass: '',
    isSuffix2IconClass: false,
    suffix2IconClass: '',
    isDescription: false,
    errorMessage: 'Field is required',
    placeholder: 'Enter value...',
    inputType: 'text',
    isClearable: false,
  },
};

export default meta;
type Story = StoryObj<FTInputComponent>;

export const Default: Story = {
  args: {
    label: "Label"
  }
};

export const WithError: Story = {
  args: {
    placeholder: 'Email',
    content: '',
    state: 'invalid',
    errorMessage: 'Invalid email address',
  }
};

export const WithClear: Story = {
  args: {
    label: "Search",
    isClearable: true,
  }
};

export const SmallSize: Story = {
  args: {
    size: 'sm-size',
    label: 'Small Input',
  },
};

export const MediumSize: Story = {
  args: {
    size: 'md-size',
    label: 'Medium Input',
  },
};

export const LargeSize: Story = {
  args: {
    size: 'lg-size',
    label: 'Large Input',
  },
};

export const PrimaryColor: Story = {
  args: {
    color: 'primary',
    label: 'Primary Input',
  },
};

export const SecondaryColor: Story = {
  args: {
    color: 'secondary',
    label: 'Secondary Input',
  },
};

export const FlatVariant: Story = {
  args: {
    variant: 'flat',
    label: 'Flat Input',
  },
};

export const FadedVariant: Story = {
  args: {
    variant: 'faded',
    label: 'Faded Input',
  },
};

export const OutlinedVariant: Story = {
  args: {
    variant: 'outlined',
    label: 'Outlined Input',
  },
};

export const GhostVariant: Story = {
  args: {
    variant: 'ghost',
    label: 'Ghost Input',
  },
};

export const NoRadius: Story = {
  args: {
    radius: 'none-radius',
    label: 'No Radius',
  },
};

export const SmallRadius: Story = {
  args: {
    radius: 'sm-radius',
    label: 'Small Radius',
  },
};

export const MediumRadius: Story = {
  args: {
    radius: 'md-radius',
    label: 'Medium Radius',
  },
};

export const LargeRadius: Story = {
  args: {
    radius: 'lg-radius',
    label: 'Large Radius',
  },
};

export const FullRadius: Story = {
  args: {
    radius: 'full-radius',
    label: 'Full Radius',
  },
};

export const Disabled: Story = {
  args: {
    state: 'disabled',
    label: 'Disabled Input',
    content: 'Disabled',
  },
};

export const Readonly: Story = {
  args: {
    state: 'readonly',
    label: 'Readonly Input',
    content: 'Readonly',
  },
};

export const Required: Story = {
  args: {
    required: true,
    label: 'Required Input',
  },
};

export const LabelOutside: Story = {
  args: {
    labelPlacement: 'label-outside',
    label: 'Label Outside',
  },
};

export const LabelOutsideLeft: Story = {
  args: {
    labelPlacement: 'label-outside-left',
    label: 'Label Outside Left',
  },
};

export const WithPrefixIcon: Story = {
  args: {
    isPrefixIconClass: true,
    prefixIconClass: 'search',
    label: 'Search Input',
    placeholder: 'Type to search...',
  },
};

export const WithSuffixIcons: Story = {
  args: {
    isSuffix1IconClass: false,
    isSuffix2IconClass: false,
    label: 'No Suffix Icons',
  },
};

export const WithDescription: Story = {
  args: {
    isDescription: true,
    description: 'This is a description.',
    label: 'With Description',
  },
};

export const WithStartContent: Story = {
  args: {
    label: 'Price',
    startContent: '$',
    placeholder: 'Amount',
  },
};

export const WithEndContent: Story = {
  args: {
    label: 'Email',
    endContent: '@gmail.com',
    placeholder: 'username',
  },
};

export const WithStartAndEndContent: Story = {
  args: {
    label: 'Website',
    startContent: 'https://',
    endContent: '.org',
    placeholder: 'firehis',
  },
};

export const PasswordInput: Story = {
  args: {
    label: 'Password',
    inputType: 'password',
    placeholder: 'Enter your password',
    isSuffix1IconClass: false,
    isSuffix2IconClass: false,
    isClearable: true,
  },
};

