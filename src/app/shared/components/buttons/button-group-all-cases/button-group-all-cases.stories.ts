import { ButtonGroupAllCasesComponent } from './button-group-all-cases.component';
import type { Meta, StoryObj } from '@storybook/angular';

const meta: Meta<ButtonGroupAllCasesComponent> = {
    title: 'Core/Button Group/Button Group All Cases',
    component: ButtonGroupAllCasesComponent,
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
        flexDirection: {
            control: 'select',
            options: ['flex-row', 'flex-col'],
        }
    },
    args: {
        size: 'md-size',
        color: 'primary',
        radius: 'md-radius',
        flexDirection: 'flex-row'
    },
};

export default meta;
type Story = StoryObj<ButtonGroupAllCasesComponent>;

export const Default: Story = {
    args: {}
};

