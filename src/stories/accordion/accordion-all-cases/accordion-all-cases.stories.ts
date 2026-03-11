import type { Meta, StoryObj } from '@storybook/angular';
import { AccordionAllCasesComponent } from './accordion-all-cases.component';

const meta: Meta<AccordionAllCasesComponent> = {
    title: 'Components/Accordion',
    component: AccordionAllCasesComponent,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<AccordionAllCasesComponent>;

export const AllCases: Story = {
    args: {},
};
