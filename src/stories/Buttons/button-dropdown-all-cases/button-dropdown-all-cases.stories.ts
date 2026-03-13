import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { ButtonDropdownAllCasesComponent } from './button-dropdown-all-cases.component';
import { FTButtonDropdownComponent } from '../button-dropdown/ft.button-dropdown.component';

const meta: Meta<ButtonDropdownAllCasesComponent> = {
    title: 'Core/Buttons/Button Dropdown/All Cases',
    component: ButtonDropdownAllCasesComponent,
    decorators: [
        moduleMetadata({
            imports: [ButtonDropdownAllCasesComponent, FTButtonDropdownComponent],
        }),
    ],
    argTypes: {
        size: {
            control: 'select',
            options: ['xs-size', 'sm-size', 'md-size', 'lg-size'],
        },
        color: {
            control: 'select',
            options: ['primary', 'secondary', 'tertiary', 'success', 'warning', 'danger'],
        },
        radius: {
            control: 'select',
            options: ['none-radius', 'xs-radius', 'sm-radius', 'md-radius', 'lg-radius', 'full-radius'],
        },
        isSplit: {
            control: 'boolean',
        },
        isIconOnly: {
            control: 'boolean',
        },
    },
    args: {
        size: 'md-size',
        color: 'primary',
        radius: 'md-radius',
        isSplit: false,
        isIconOnly: false,
    },
};

export default meta;
type Story = StoryObj<ButtonDropdownAllCasesComponent>;

export const Default: Story = {};

export const Split: Story = {
    args: {
        isSplit: true,
    },
};

export const IconOnly: Story = {
    args: {
        isIconOnly: true,
    },
};

export const SplitIconOnly: Story = {
    args: {
        isSplit: true,
        isIconOnly: true,
    },
};
