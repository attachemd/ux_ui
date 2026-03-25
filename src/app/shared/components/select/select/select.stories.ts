import { Meta, StoryObj } from '@storybook/angular';
import { FtSelectComponent } from './select.component';

const meta: Meta<any> = {
    title: 'Core/Select/Select (Core)',
    component: FtSelectComponent,
    tags: ['autodocs'],
    argTypes: {
        color: {
            control: 'select',
            options: ['default', 'primary', 'secondary', 'tertiary', 'success', 'warning', 'danger']
        },
        variant: {
            control: 'select',
            options: ['flat', 'faded', 'outlined', 'ghost']
        },
        size: {
            control: 'select',
            options: ['xs-size', 'sm-size', 'md-size', 'lg-size']
        },
        radius: {
            control: 'select',
            options: ['none-radius', 'xs-radius', 'sm-radius', 'md-radius', 'lg-radius', 'full-radius']
        },
        labelPlacement: {
            control: 'select',
            options: ['label-inside', 'label-outside', 'label-outside-left']
        },
        state: {
            control: 'select',
            options: ['rest', 'hover', 'press', 'focus', 'readonly', 'disabled', 'invalid']
        }
    }
};

export default meta;
type Story = StoryObj<any>;

const standardOptions = [
    { label: 'Option 1', value: 'opt1' },
    { label: 'Option 2', value: 'opt2' },
    { label: 'Option 3', value: 'opt3' }
];

export const Default: Story = {
    args: {
        isLabel: true,
        label: 'Label',
        placeholder: 'Select an option',
        options: standardOptions,
        multiple: false
    }
};

export const Multiple: Story = {
    args: {
        isLabel: true,
        label: 'Labels',
        placeholder: 'Select multiple options',
        options: standardOptions,
        multiple: true,
        isClearable: true
    }
};
