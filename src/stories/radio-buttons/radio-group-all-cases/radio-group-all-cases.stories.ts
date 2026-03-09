import { Meta, StoryObj } from '@storybook/angular';
import { RadioGroupAllCasesComponent } from './radio-group-all-cases.component';

const meta: Meta<RadioGroupAllCasesComponent> = {
    title: 'Core/Radio Group/Radio Group All Cases',
    component: RadioGroupAllCasesComponent,
    parameters: {
        layout: 'fullscreen',
    },
};

export default meta;
type Story = StoryObj<RadioGroupAllCasesComponent>;

export const AllCases: Story = {
    args: {},
};
