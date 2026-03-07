import { Meta, StoryObj } from '@storybook/angular';
import { FtButtonGroupComponent } from './ft.button-group.component';

const meta: Meta<FtButtonGroupComponent> = {
    title: 'Buttons/Button Group',
    component: FtButtonGroupComponent,
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: 'select',
            options: ['xs-size', 'sm-size', 'md-size', 'lg-size'],
        },
        color: {
            control: 'select',
            options: ['primary', 'secondary', 'tertiary', 'success', 'warning', 'danger'],
        },
        variant: {
            control: 'select',
            options: ['flat', 'ghost', 'faded', 'outlined'],
        },
        state: {
            control: 'select',
            options: ['rest', 'hover', 'press', 'focus', 'disabled'],
        },
        radius: {
            control: 'select',
            options: ['none-radius', 'xs-radius', 'sm-radius', 'md-radius', 'lg-radius', 'full-radius'],
        },
        flexDirection: {
            control: 'select',
            options: ['flex-row', 'flex-col'],
        }
    },
    args: {
        size: 'md-size',
        color: 'primary',
        variant: 'flat',
        state: 'rest',
        radius: 'md-radius',
        flexDirection: 'flex-row',
        buttons: [
            { isLabel: true, label: 'Option 1' },
            { isLabel: true, label: 'Option 2' },
            { isLabel: true, label: 'Option 3' },
        ]
    },
};

export default meta;
type Story = StoryObj<FtButtonGroupComponent>;

export const Default: Story = {
    args: {}
};

export const Outlined: Story = {
    args: {
        variant: 'outlined',
        color: 'secondary'
    }
};

export const ColumnLayout: Story = {
    args: {
        flexDirection: 'flex-col',
        variant: 'faded'
    }
};
