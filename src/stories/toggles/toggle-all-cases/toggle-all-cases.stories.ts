import { ToggleAllCasesComponent } from './toggle-all-cases.component';
import type { Meta, StoryObj } from '@storybook/angular';

const meta: Meta<ToggleAllCasesComponent> = {
    title: 'Toggles/Toggle All Cases',
    component: ToggleAllCasesComponent,
    argTypes: {
        size: {
            control: 'select',
            options: ['sm-size', 'md-size', 'lg-size'],
        },
        variant: {
            control: 'select',
            options: ['default', 'icon', 'label'],
        },
        labelPosition: {
            control: 'select',
            options: ['left', 'right', 'top'],
        },
        isLabel: {
            control: 'boolean',
        },
        isDescription: {
            control: 'boolean',
        }
    },
    args: {
        isLabel: true,
        label: 'Feature Toggle',
        isDescription: false,
        description: 'Enable or disable this feature',
        size: 'sm-size',
        variant: 'default',
        labelPosition: 'right'
    }
};

export default meta;
type Story = StoryObj<ToggleAllCasesComponent>;

export const Default: Story = {
    args: {}
};

