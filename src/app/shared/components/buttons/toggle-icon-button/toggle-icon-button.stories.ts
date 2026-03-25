import { FtToggleIconButtonComponent } from './toggle-icon-button.component';
import type { Meta, StoryObj } from '@storybook/angular';

const meta: Meta<any> = {
    title: 'Core/Toggle Icon Button/Toggle Icon Button',
    component: FtToggleIconButtonComponent,
    tags: ['autodocs'],
    argTypes: {
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
        unselectedVariant: {
            control: 'select',
            options: ['flat', 'outlined', 'faded', 'ghost'],
        },
        selectedVariant: {
            control: 'select',
            options: ['flat', 'outlined', 'faded', 'ghost'],
        },
        size: {
            control: 'select',
            options: ['xs-size', 'sm-size', 'md-size', 'lg-size'],
        },
        radius: {
            control: 'select',
            options: ['none-radius', 'xs-radius', 'sm-radius', 'md-radius', 'lg-radius', 'full-radius'],
        },
        state: {
            control: 'select',
            options: ['rest', 'hover', 'press', 'focus', 'disabled'],
        },
    },
    args: {
        color: 'primary',
        unselectedColor: undefined,
        selectedColor: undefined,
        size: 'md-size',
        radius: 'md-radius',
        state: 'rest',
        iconClass: 'favorite_border',
        selectedIconClass: 'favorite',
        selected: false,
        unselectedVariant: 'ghost',
        selectedVariant: 'flat'
    }
};

export default meta;
type Story = StoryObj<any>;

export const Default: Story = {
    args: {
        selected: false,
    }
};

export const Selected: Story = {
    args: {
        selected: true,
    }
};

