import { ToggleAllCasesComponent } from './toggle-all-cases.component';
import type { Meta, StoryObj } from '@storybook/angular';

const meta: Meta<ToggleAllCasesComponent> = {
    title: 'Toggles/Toggle All Cases',
    component: ToggleAllCasesComponent,
    parameters: {
        layout: 'fullscreen',
    },
    args: {
        isLabel: true,
        label: 'Feature Toggle',
        isDescription: false,
        description: 'Enable or disable this feature',
        size: 'md-size'
    }
};

export default meta;
type Story = StoryObj<ToggleAllCasesComponent>;

export const Default: Story = {
    args: {}
};

export const WithDescription: Story = {
    args: {
        isDescription: true
    }
}
