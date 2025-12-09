
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { OnSurfaceColorComponent } from './on.surface.color.component';

import { FormsModule } from '@angular/forms';
import {FtRadioComponent} from '../radio/ft.radio.component';

const meta: Meta<OnSurfaceColorComponent> = {
  title: 'Color/On Surface',
  component: OnSurfaceColorComponent,
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
type Story = StoryObj<OnSurfaceColorComponent>;

export const Default: Story = {
  args: {}
};

// export const AllVariations: Story = {
//   name: 'Colors',
//   render: () => ({
//     template: `<common-color></common-color>`
//   })
// };
