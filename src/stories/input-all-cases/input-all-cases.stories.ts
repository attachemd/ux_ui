// input-showcase.stories.ts
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { InputAllCasesComponent } from './input-all-cases.component';

import { FormsModule } from '@angular/forms';
import {FTInputComponent} from '../input/ft.input.component';

const meta: Meta<InputAllCasesComponent> = {
  title: 'Showcase/Input All Cases',
  component: InputAllCasesComponent,
  decorators: [
    moduleMetadata({
      imports: [FormsModule, FTInputComponent],
    }),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A comprehensive showcase of all ft-input component variations and use cases.'
      }
    }
  },
};

export default meta;
type Story = StoryObj<InputAllCasesComponent>;

export const Default: Story = {
  args: {}
};

export const AllVariations: Story = {
  name: 'All Input Variations',
  render: () => ({
    template: `<app-input-showcase></app-input-showcase>`
  })
};
