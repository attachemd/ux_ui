// input-showcase.stories.ts
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { InputShowcaseComponent } from './input-showcase.component';

import { FormsModule } from '@angular/forms';
import {FtInputComponent} from '../input/input.component';

const meta: Meta<InputShowcaseComponent> = {
  title: 'Core/Inputs/Input Showcase',
  component: InputShowcaseComponent,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A comprehensive showcase of all FT-Input component variations, including sizes, variants, labels, icons, and validation states.'
      }
    }
  },
};

export default meta;
type Story = StoryObj<InputShowcaseComponent>;

export const Showcase: Story = {
  name: 'Component Showcase',
  args: {}
};

