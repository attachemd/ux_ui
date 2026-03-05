import type { Meta, StoryObj } from '@storybook/angular';
import { CheckboxAllCasesComponent } from './checkbox-all-cases.component';

const meta: Meta<CheckboxAllCasesComponent> = {
    title: 'Checkbox/Checkbox All Cases',
    component: CheckboxAllCasesComponent,
    argTypes: {
        size: {
            control: 'select',
            options: ['xs-size', 'sm-size', 'md-size', 'lg-size'],
        },
        isDescription: {
            control: "boolean",
        },
        isLabel: {
            control: 'boolean',
        }
    },
    args: {
        isLabel: true,
        size: 'md-size',
        isDescription: false,
    }
};

export default meta;
type Story = StoryObj<CheckboxAllCasesComponent>;

export const Default: Story = {
    args: {}
};
