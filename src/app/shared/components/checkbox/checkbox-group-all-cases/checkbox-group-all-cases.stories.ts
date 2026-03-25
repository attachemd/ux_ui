import { Meta, StoryObj } from '@storybook/angular';
import { CheckboxGroupAllCasesComponent } from './checkbox-group-all-cases.component';

const meta: Meta<CheckboxGroupAllCasesComponent> = {
    title: 'Core/Checkbox Group/Checkbox Group All Cases',
    component: CheckboxGroupAllCasesComponent,
    parameters: {
        layout: 'fullscreen',
    },
};

export default meta;
type Story = StoryObj<CheckboxGroupAllCasesComponent>;

export const AllCases: Story = {
    args: {},
};

