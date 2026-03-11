import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { FTAccordionComponent } from './ft.accordion.component';
import { FTAccordionItemComponent } from './ft.accordion-item.component';

const meta: Meta<FTAccordionComponent> = {
  title: 'Components/Accordion/Standalone',
  component: FTAccordionComponent,
  decorators: [
    moduleMetadata({
      imports: [FTAccordionItemComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    multiple: {
      control: 'boolean',
      description: 'Whether multiple items can be expanded at the same time.',
    },
  },
};

export default meta;
type Story = StoryObj<FTAccordionComponent>;

const Template = (args: Partial<FTAccordionComponent>) => ({
  props: args,
  template: `
    <ft-accordion [multiple]="multiple">
      <ft-accordion-item label="Item 1" value="Value 1" subValue="Sub 1" icon="account_circle">
        <p>This is the content for Item 1. It can contain any HTML or components.</p>
      </ft-accordion-item>
      <ft-accordion-item label="Item 2" value="Value 2" subValue="Sub 2" icon="settings">
        <p>This is the content for Item 2. When 'multiple' is false, opening this will close Item 1.</p>
      </ft-accordion-item>
      <ft-accordion-item label="Item 3" value="Value 3" subValue="Sub 3" icon="favorite">
        <p>This is the content for Item 3.</p>
      </ft-accordion-item>
    </ft-accordion>
  `,
});

export const Default: Story = {
  render: Template,
  args: {
    multiple: false,
  },
};

export const Multiple: Story = {
  render: Template,
  args: {
    multiple: true,
  },
};
