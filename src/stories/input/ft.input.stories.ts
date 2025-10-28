import {FTInputComponent} from './ft.input.component';
import type {Meta, StoryObj} from '@storybook/angular';

const meta: Meta<FTInputComponent> = {
  title: 'Form/Input',
  component: FTInputComponent,
  tags: ['autodocs'],
  argTypes: {
    prefixIconClass: {
      control: 'select',
      options: [
        'icon-search',
        'icon-menu',
        'icon-export'
      ],
      description: 'Select an icon class for the component',
    },
    suffix1IconClass: {
      control: 'select',
      options: [
        'icon-menu',
        'icon-export',
        'icon-close',
        'icon-arrow-down'
      ],
      description: 'Select an icon class for the component',
    },
    suffix2IconClass: {
      control: 'select',
      options: [
        'icon-menu',
        'icon-export',
        'icon-close',
        'icon-arrow-down'
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
      options: ['flat', 'ghost', 'faded', 'underlined'],
    },
    state: {
      control: 'select',
      options: ['hovered','focused','normal'],
    },
    radius: {
      control: 'select',
      options: ['none-radius', 'sm-radius', 'md-radius', 'lg-radius', 'full-radius'],
    },
    labelPlacement: {
      control: 'select',
      options: ['label-inside', 'label-outside', 'label-outside-left'],
    }
  },
  args: {
    isLabel: true,
    label: 'Label',
    labelPlacement: 'label-inside',
    content: 'content',
    size: 'md-size',
    radius: 'md-radius',
    state: 'normal',
    isPrefixIconClass: false,
    prefixIconClass: 'icon-search',
    isSuffix1IconClass: true,
    suffix1IconClass: 'icon-close',
    isSuffix2IconClass: true,
    suffix2IconClass: 'icon-arrow-down',
    invalid: false,
    errorMessage: 'error',
  }
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
    invalid: true,
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

export const UnderlinedVariant: Story = {
  args: {
    variant: 'underlined',
    label: 'Underlined Input',
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
    disabled: true,
    label: 'Disabled Input',
    content: 'Disabled',
  },
};

export const Readonly: Story = {
  args: {
    readonly: true,
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
    prefixIconClass: 'icon-search',
    label: 'With Prefix Icon',
  },
};

export const WithSuffixIcons: Story = {
  args: {
    isSuffix1IconClass: true,
    suffix1IconClass: 'icon-close',
    isSuffix2IconClass: true,
    suffix2IconClass: 'icon-arrow-down',
    label: 'With Suffix Icons',
  },
};

export const WithDescription: Story = {
  args: {
    description: 'This is a description.',
    label: 'With Description',
  },
};
