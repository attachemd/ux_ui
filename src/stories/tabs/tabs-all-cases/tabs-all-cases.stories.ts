import { Meta, StoryObj } from '@storybook/angular';
import { TabsAllCasesComponent } from './tabs-all-cases.component';

const meta: Meta<TabsAllCasesComponent> = {
    title: 'Core/Tabs/Tabs (All Cases)',
    component: TabsAllCasesComponent,
    argTypes: {
        variant: {
            control: 'select',
            options: ['flat', 'faded', 'outlined', 'ghost', 'underlined'],
        },
        size: {
            control: 'select',
            options: ['xs-size', 'sm-size', 'md-size', 'lg-size'],
        },
        color: {
            control: 'select',
            options: ['default', 'primary', 'secondary', 'tertiary', 'success', 'warning', 'danger'],
        },
        radius: {
            control: 'select',
            options: ['none-radius', 'xs-radius', 'sm-radius', 'md-radius', 'lg-radius', 'full-radius'],
        },
        withIcon: {
            control: 'boolean',
        },
    },
};

export default meta;
type Story = StoryObj<TabsAllCasesComponent>;

export const Default: Story = {
    args: {
        variant: 'flat',
        size: 'md-size',
        color: 'default',
        radius: 'md-radius',
        withIcon: false,
    }
};
