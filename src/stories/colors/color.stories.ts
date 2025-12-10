// radio-showcase.stories.ts
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { ColorComponent } from './color.component';

import { FormsModule } from '@angular/forms';
import {FtRadioComponent} from '../radio-buttons/radio/ft.radio.component';

const meta: Meta<ColorComponent> = {
  title: 'Colors',
  component: ColorComponent,
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

  },
  args: {

  }
};

export default meta;
type Story = StoryObj<ColorComponent>;

export const Common: Story = {
  args: {
    color: 'common'
  }
};

export const Surface: Story = {
  args: {
    color: 'surface'
  }
};

export const OnSurface: Story = {
  args: {
    color: 'on-surface'
  }
};

// export const AllVariations: Story = {
//   name: 'Colors',
//   render: () => ({
//     template: `<colors></colors>`
//   })
// };
