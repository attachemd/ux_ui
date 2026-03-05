// input-showcase.stories.ts
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { InputAllCasesComponent } from './input-all-cases.component';

import { FormsModule } from '@angular/forms';
import { FTInputComponent } from '../input/ft.input.component';

const meta: Meta<InputAllCasesComponent> = {
  title: 'Inputs/Input All Cases',
  component: InputAllCasesComponent,
  // decorators: [
  //   moduleMetadata({
  //     imports: [FormsModule, FtRadioComponent],
  //   }),
  // ],
  // parameters: {
  //   layout: 'fullscreen',
  //   docs: {
  //     description: {
  //       component: 'A comprehensive showcase of all ft-input component variations and use cases.'
  //     }
  //   }
  // },
  argTypes: {
    radius: {
      control: 'select',
      options: ['none-radius', 'xs-radius', 'sm-radius', 'md-radius', 'lg-radius', 'full-radius'],
    },
    size: {
      control: 'select',
      options: ['xs-size', 'sm-size', 'md-size', 'lg-size'],
    },
    variant: {
      control: 'select',
      options: ['flat', 'faded', 'outlined', 'ghost'],
    },
    isDescription: {
      control: "boolean",
      options: [true, false],
    },
    showContent: {
      control: 'boolean',
    }
  },
  args: {
    isPrefixIconClass: false,
    radius: 'md-radius',
    size: 'md-size',
    variant: 'flat',
    isDescription: false,
    showContent: false
  }
};

export default meta;
type Story = StoryObj<InputAllCasesComponent>;

export const Default: Story = {
  args: {}
};

export const WithContent: Story = {
  args: {
    showContent: true
  }
};

// export const AllVariations: Story = {
//   name: 'All Input Variations',
//   render: () => ({
//     template: `<app-input-showcase></app-input-showcase>`
//   })
// };
