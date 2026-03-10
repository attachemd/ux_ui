import { Meta, StoryObj } from '@storybook/angular';
import { TabsAllCasesComponent } from './tabs-all-cases.component';

const meta: Meta<TabsAllCasesComponent> = {
    title: 'Core/Tabs/Tabs (All Cases)',
    component: TabsAllCasesComponent,
};

export default meta;
type Story = StoryObj<TabsAllCasesComponent>;

export const Default: Story = {
    args: {}
};
