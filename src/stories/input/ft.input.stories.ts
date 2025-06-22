import {FTInputComponent} from './ft.input.component';
import type {Meta, StoryObj} from '@storybook/angular';

const meta: Meta<FTInputComponent> = {
  title: 'Form/flat/Input',
  component: FTInputComponent,
  tags: ['autodocs'],
  argTypes: {
    prefixIconClass: {
      control: 'select',
      options: [
        'icon-menu',
        'icon-export'
      ],
      description: 'Select an icon class for the component',
      // defaultValue: 'material-icons'
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
      // defaultValue: 'material-icons'
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
      // defaultValue: 'material-icons'
    },
  },
  args: {
    // isLabel: false,
    // label: 'Email',
    // iconClass: 'icon-export',
    content: 'content',
    invalid: false,
  }
};

export default meta;
type Story = StoryObj<FTInputComponent>;

// const Template = (args) => ({
//   props: args,
// });

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

export const NewField: Story = {
  args: {
    content: "content",
    invalid: false,
    label: "Label",
    suffix1IconClass: "icon-close",
    suffix2IconClass: "icon-arrow-down"
  }
};
