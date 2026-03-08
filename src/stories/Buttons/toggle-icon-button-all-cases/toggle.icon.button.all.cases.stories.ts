import { ToggleIconButtonAllCasesComponent } from './toggle.icon.button.all.cases.component';
import type { Meta, StoryObj } from '@storybook/angular';

const meta: Meta<ToggleIconButtonAllCasesComponent> = {
    title: 'Buttons/Toggle Icon Button All Cases',
    component: ToggleIconButtonAllCasesComponent,
    argTypes: {
        size: {
            control: 'select',
            options: ['xs-size', 'sm-size', 'md-size', 'lg-size'],
        },
        color: {
            control: 'select',
            options: ['primary', 'secondary', 'tertiary', 'success', 'warning', 'danger'],
        },
        unselectedColor: {
            control: 'select',
            options: ['primary', 'secondary', 'tertiary', 'success', 'warning', 'danger'],
        },
        selectedColor: {
            control: 'select',
            options: ['primary', 'secondary', 'tertiary', 'success', 'warning', 'danger'],
        },
        radius: {
            control: 'select',
            options: ['none-radius', 'xs-radius', 'sm-radius', 'md-radius', 'lg-radius', 'full-radius'],
        },
        unselectedVariant: {
            control: 'select',
            options: ['flat', 'outlined', 'faded', 'ghost'],
        },
        selectedVariant: {
            control: 'select',
            options: ['flat', 'outlined', 'faded', 'ghost'],
        }
    },
    args: {
        size: 'md-size',
        color: 'primary',
        unselectedColor: 'tertiary',
        selectedColor: 'secondary',
        radius: 'md-radius',
        unselectedVariant: 'faded',
        selectedVariant: 'faded'
    }
};

export default meta;
type Story = StoryObj<ToggleIconButtonAllCasesComponent>;

export const Default: Story = {
    args: {

    }
};
