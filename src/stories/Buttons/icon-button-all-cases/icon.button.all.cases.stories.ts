import type { Meta, StoryObj } from '@storybook/angular';
import { IconButtonAllCasesComponent } from './icon.button.all.cases.component';


const meta: Meta<IconButtonAllCasesComponent> = {
  title: 'Buttons/Icon Button All Cases',
  component: IconButtonAllCasesComponent,
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
      options: ['none-radius', 'xs-radius', 'sm-radius', 'md-radius', 'lg-radius', 'full-radius'],
    },
  },
  args: {
    size: 'md-size',
    color: 'primary',
    radius: 'md-radius',
  }
};

export default meta;
type Story = StoryObj<IconButtonAllCasesComponent>;

export const Default: Story = {
  args: {}
};


