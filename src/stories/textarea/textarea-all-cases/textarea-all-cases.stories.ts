import type { Meta, StoryObj } from '@storybook/angular';
import { TextareaAllCasesComponent } from './textarea-all-cases.component';

const meta: Meta<TextareaAllCasesComponent> = {
  title: 'Core/Textarea/Textarea All Cases',
  component: TextareaAllCasesComponent,
  argTypes: {
    size: {
      control: 'select',
      options: ['xs-size', 'sm-size', 'md-size', 'lg-size'],
    },
    variant: {
      control: 'select',
      options: ['flat', 'faded', 'outlined', 'ghost'],
    },
  },
  args: {
    size: 'md-size',
    variant: 'flat',
    label: 'Description',
  }
};

export default meta;
type Story = StoryObj<TextareaAllCasesComponent>;

export const Default: Story = {
  args: {
    showContent: false,
  }
};

export const WithContent: Story = {
  args: {
    showContent: true,
  }
};

