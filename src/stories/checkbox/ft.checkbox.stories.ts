import type { Meta, StoryObj } from '@storybook/angular';
import { FtCheckboxComponent } from './ft.checkbox.component';

const meta: Meta<FtCheckboxComponent> = {
    title: 'Checkbox/Checkbox',
    component: FtCheckboxComponent,
    argTypes: {
        size: {
            control: 'select',
            options: ['xs-size', 'sm-size', 'md-size', 'lg-size'],
        },
        state: {
            control: 'select',
            options: ['rest', 'hover', 'press', 'focus'],
        },
    },
    args: {
        isLabel: true,
        label: 'Checkbox Label',
        isDescription: false,
        description: 'Checkbox description goes here.',
        checked: false,
        indeterminate: false,
        inactive: false,
        invalid: false,
        size: 'md-size',
        state: 'rest',
    },
};

export default meta;
type Story = StoryObj<FtCheckboxComponent>;

export const Default: Story = {
    args: {},
};

export const Checked: Story = {
    args: {
        checked: true,
    },
};

export const Indeterminate: Story = {
    args: {
        indeterminate: true,
    },
};

export const WithDescription: Story = {
    args: {
        isDescription: true,
    },
};
