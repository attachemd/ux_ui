import {FTInputComponent} from './ft.input.component';
import type {Meta, StoryObj} from '@storybook/angular';

const meta: Meta<FTInputComponent> = {
  title: 'Form/Input',
  component: FTInputComponent,
  // globals: {
  //   // 👇 Set background value for all component stories
  //   backgrounds: { value: 'black', grid: false },
  // },
  // parameters: {
  //   backgrounds: {
  //     default: 'gray', // Set a default for this component
  //     values: [
  //       {
  //         name: 'gray',
  //         value: '#CCC',
  //       },
  //       // You can also override global values or add new ones here
  //     ],
  //   },
  // },
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
