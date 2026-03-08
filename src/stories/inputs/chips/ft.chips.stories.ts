import { FTChipsComponent } from './ft.chips.component';
import type { Meta, StoryObj } from '@storybook/angular';

const meta: Meta<FTChipsComponent> = {
  title: 'Inputs/Chips',
  component: FTChipsComponent,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs-size', 'sm-size', 'md-size', 'lg-size'],
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'tertiary', 'success', 'warning', 'danger'],
    },
    variant: {
      control: 'select',
      options: ['flat', 'faded', 'outlined', 'ghost'],
    },
    labelPlacement: {
      control: 'select',
      options: ['label-inside', 'label-outside', 'label-outside-left'],
    },
    state: {
      control: 'select',
      options: ['rest', 'hover', 'press', 'focus', 'readonly', 'disabled', 'invalid'],
    }
  },
  args: {
    isLabel: true,
    label: 'Instructions',
    placeholder: 'Ajouter une instruction...',
    items: ['toutes les 8h', 'Après chaque repas'],
    suggestions: ['Avant le coucher', 'À jeun', 'Pendant le repas', 'Toutes les 12h'],
    size: 'md-size',
    color: 'primary',
    variant: 'outlined',
    radius: 'md-radius',
    labelPlacement: 'label-inside',
    isClearable: true
  }
};

export default meta;
type Story = StoryObj<FTChipsComponent>;

export const Default: Story = {
  args: {}
};

export const LabelOutside: Story = {
  args: {
    labelPlacement: 'label-outside'
  }
};

export const WithSuggestions: Story = {
  args: {
    items: [],
    placeholder: 'Type "a" to see suggestions...'
  }
};

export const Empty: Story = {
  args: {
    items: []
  }
};

export const Disabled: Story = {
  args: {
    disabled: true
  }
};

export const Invalid: Story = {
  args: {
    state: 'invalid',
    errorMessage: 'Veuillez ajouter au moins une instruction.'
  }
};
