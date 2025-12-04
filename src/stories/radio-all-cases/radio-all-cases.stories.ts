// radio-showcase.stories.ts
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { RadioAllCasesComponent } from './radio-all-cases.component';

import { FormsModule } from '@angular/forms';
import {FtRadioComponent} from '../radio/ft.radio.component';

const meta: Meta<RadioAllCasesComponent> = {
  title: 'Showcase/Radio All Cases',
  component: RadioAllCasesComponent,
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
    isLabel: {
      control: "boolean",
      options: [true, false],
    },
    label: {
      control: 'text',
    }
  },
  args: {
    size: 'md-size',
    isLabel: true,
    label: 'Option A',
    isDescription: false,
    description: 'Description'
  }
};

export default meta;
type Story = StoryObj<RadioAllCasesComponent>;

export const Default: Story = {
  args: {}
};

// export const AllVariations: Story = {
//   name: 'All Radio Variations',
//   render: () => ({
//     template: `<app-radio-showcase></app-radio-showcase>`
//   })
// };
