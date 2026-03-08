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
    },
    startContent: {
      control: 'text',
    },
    endContent: {
      control: 'text',
    },
    isSuffix1IconClass: {
      control: 'boolean',
    },
    suffix1IconClass: {
      control: 'select',
      options: ['visibility', 'visibility_off', 'close_small', 'search', 'edit', 'check'],
    },
    isSuffix2IconClass: {
      control: 'boolean',
    },
    suffix2IconClass: {
      control: 'select',
      options: ['search', 'keyboard_arrow_down', 'calendar_today', 'tune', 'filter_list'],
    },
    inputType: {
      control: 'select',
      options: ['text', 'password'],
    }
  },
  args: {
    isPrefixIconClass: false,
    radius: 'md-radius',
    size: 'md-size',
    variant: 'flat',
    isDescription: false,
    showContent: false,
    isSuffix1IconClass: false,
    suffix1IconClass: 'edit',
    isSuffix2IconClass: false,
    suffix2IconClass: 'search',
    inputType: 'text',
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

export const WithStartContent: Story = {
  args: {
    startContent: '$',
  }
};

export const WithEndContent: Story = {
  args: {
    endContent: '@gmail.com',
  }
};

export const WithStartAndEndContent: Story = {
  args: {
    startContent: 'https://',
    endContent: '.org',
  }
};

export const PasswordType: Story = {
  args: {
    inputType: 'password',
  }
};
