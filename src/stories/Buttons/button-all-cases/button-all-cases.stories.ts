import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonAllCasesComponent } from './button-all-cases.component';


const meta: Meta<ButtonAllCasesComponent> = {
  title: 'Buttons/Button All Cases',
  component: ButtonAllCasesComponent,
  // decorators: [
  //   moduleMetadata({
  //     imports: [FormsModule, FtRadioComponent],
  //   }),
  // ],
  // parameters: {
  //   layout: 'fullscreen',
  //   docs: {
  //     description: {
  //       component: 'A comprehensive showcase of all ft-radio component variations and use cases.'
  //     }
  //   }
  // },
  argTypes: {
    isLabel: {
      control: 'boolean'
    },
    label: {
      control: 'text',
      description: 'Label for the button'
    },
    size: {
      control: 'select',
      options: ['xs-size', 'sm-size', 'md-size', 'lg-size'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'success', 'warning', 'danger'],
    },
    radius: {
      control: 'select',
      options: ['none-radius', 'sm-radius', 'md-radius', 'lg-radius', 'full-radius'],
    },
  },
  args: {
    isLabel: true,
    label: 'Username',
    size: 'md-size',
    color: 'primary',
    radius: 'md-radius',
    isPrefixIconClass: true,
    isSuffixIconClass: true,
  }
};

export default meta;
type Story = StoryObj<ButtonAllCasesComponent>;

export const Default: Story = {
  args: {}
};

