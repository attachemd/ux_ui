import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { FtAccordionComponent } from './accordion.component';
import { FtAccordionItemComponent } from './accordion-item.component';

const meta: Meta<any> = {
  title: 'Core/Accordion/Standalone',
  component: FtAccordionComponent,
  decorators: [
    moduleMetadata({
      imports: [FtAccordionItemComponent],
    }),
  ],
  argTypes: {
    multiple: {
      control: 'boolean',
      description: 'Whether multiple items can be expanded at the same time.',
    },
    color: {
      control: 'select',
      options: ['neutral', 'primary', 'secondary', 'tertiary', 'success', 'warning', 'danger'],
      description: 'The color theme of the accordion.',
    },
    state: {
      control: 'select',
      options: ['rest', 'hover', 'press', 'focus', 'disabled', 'readonly', 'invalid'],
      description: 'The state of the accordion items.',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the accordion.',
    },
    radius: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl', 'pill'],
      description: 'The corner radius of the accordion.',
    },
    variant: {
      control: 'select',
      options: ['flat', 'ghost', 'faded', 'outlined', 'soft-outlined'],
      description: 'The visual variant of the accordion.',
    },
    borderColor: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'tertiary', 'success', 'warning', 'danger', 'neutral'],
      mapping: { default: undefined },
      labels: { default: 'Default (Themed)' },
      description: 'Predefined semantic color for closed state.',
    },
    expandedBorderColor: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'tertiary', 'success', 'warning', 'danger', 'neutral'],
      mapping: { default: undefined },
      labels: { default: 'Default (Themed)' },
      description: 'Predefined semantic color for expanded state.',
    },
  },
};


export default meta;
type Story = StoryObj<any>;

const Template = (args: any) => ({
  props: args,
  template: `
    <ft-accordion [multiple]="multiple" [color]="color" [size]="size" [radius]="radius" [variant]="variant" [state]="state" [borderColor]="borderColor" [expandedBorderColor]="expandedBorderColor">
      <ft-accordion-item label="Item 1" value="Value 1" subValue="Sub 1" icon="account_circle" actionIcon="add">
        <p>This is the content for Item 1. It can contain any HTML or components.</p>
      </ft-accordion-item>
      <ft-accordion-item label="Item 2" value="Value 2" subValue="Sub 2" icon="settings" actionIcon="settings">
        <p>This is the content for Item 2. When 'multiple' is false, opening this will close Item 1.</p>
      </ft-accordion-item>
      <ft-accordion-item label="Item 3" value="Value 3" subValue="Sub 3" icon="favorite" color="success" actionIcon="share">
        <p>This is the content for Item 3. This item has a specific 'success' color.</p>
      </ft-accordion-item>
    </ft-accordion>
  `,
});


export const Default: Story = {
  parameters: {
    controls: {
      include: ['variant', 'borderColor', 'expandedBorderColor', 'size', 'radius', 'color', 'state', 'multiple'],
    },
  },
  render: Template,
  args: {
    multiple: false,
    color: 'neutral',
    size: 'md',
    radius: 'md',
  },
};

export const SizesAndRadiuses: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div>
          <h4>Small & Pill</h4>
          <ft-accordion size="sm" radius="pill" color="primary">
            <ft-accordion-item label="Small Pill Accordion" icon="bolt">Content</ft-accordion-item>
          </ft-accordion>
        </div>
        <div>
          <h4>Large & Extra Large</h4>
          <ft-accordion size="lg" radius="xl" color="secondary">
            <ft-accordion-item label="Large XL Accordion" icon="favorite">Content</ft-accordion-item>
          </ft-accordion>
        </div>
        <div>
          <h4>Medium & None (Square)</h4>
          <ft-accordion size="md" radius="none" color="success">
            <ft-accordion-item label="Medium Square Accordion" icon="check_circle">Content</ft-accordion-item>
          </ft-accordion>
        </div>
      </div>
    `,
  }),
};

export const Primary: Story = {
  render: Template,
  args: {
    multiple: false,
    color: 'primary',
  },
};

export const Secondary: Story = {
  render: Template,
  args: {
    multiple: false,
    color: 'secondary',
  },
};

export const Colors: Story = {
  parameters: {
    controls: {
      include: ['variant', 'size', 'radius'],
    },
  },
  args: {
    size: 'md',
    radius: 'md',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <ft-accordion color="primary" [size]="size" [radius]="radius" [variant]="variant">
          <ft-accordion-item label="Primary Accordion" icon="bolt">Content</ft-accordion-item>
        </ft-accordion>
        <ft-accordion color="secondary" [size]="size" [radius]="radius" [variant]="variant">
          <ft-accordion-item label="Secondary Accordion" icon="favorite">Content</ft-accordion-item>
        </ft-accordion>
        <ft-accordion color="success" [size]="size" [radius]="radius" [variant]="variant">
          <ft-accordion-item label="Success Accordion" icon="check_circle">Content</ft-accordion-item>
        </ft-accordion>
        <ft-accordion color="warning" [size]="size" [radius]="radius" [variant]="variant">
          <ft-accordion-item label="Warning Accordion" icon="warning">Content</ft-accordion-item>
        </ft-accordion>
        <ft-accordion color="danger" [size]="size" [radius]="radius" [variant]="variant">
          <ft-accordion-item label="Danger Accordion" icon="error">Content</ft-accordion-item>
        </ft-accordion>
        <ft-accordion color="tertiary" [size]="size" [radius]="radius" [variant]="variant">
          <ft-accordion-item label="Tertiary Accordion" icon="info">Content</ft-accordion-item>
        </ft-accordion>
      </div>
    `,
  }),
};
export const PropagatedColor: Story = {
  parameters: {
    controls: {
      include: ['variant', 'borderColor', 'expandedBorderColor', 'size', 'radius', 'color', 'multiple'],
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <ft-accordion [color]="color" [size]="size" [radius]="radius" [multiple]="multiple" [variant]="variant" [borderColor]="borderColor" [expandedBorderColor]="expandedBorderColor">
        <ft-accordion-item label="Item 1 (Inherited)" icon="check_circle">
          <p>This item inherits color and other props from the parent accordion.</p>
        </ft-accordion-item>
        <ft-accordion-item label="Item 2 (Inherited)" icon="check_circle">
          <p>This item also inherits from parent.</p>
        </ft-accordion-item>
        <ft-accordion-item label="Item 3 (Danger Override)" color="danger" icon="error">
          <p>This item overrides the parent color with 'danger'.</p>
        </ft-accordion-item>
      </ft-accordion>
    `,
  }),
  args: {
    color: 'primary',
    multiple: false,
    size: 'md',
    radius: 'md',
    variant: 'flat',
    borderColor: undefined,
    expandedBorderColor: undefined,
  },
};

export const Variants: Story = {
  parameters: {
    controls: {
      include: ['size', 'radius', 'color', 'multiple', 'borderColor', 'expandedBorderColor'],
    },
  },
  args: {
    size: 'md',
    radius: 'md',
    color: 'primary',
    multiple: false,
    borderColor: undefined,
    expandedBorderColor: undefined,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-direction: column; gap: 30px;">
        <p style="color: var(--ft-color-on-surface-level-100); font-size: 14px; margin-bottom: 20px;">
          All variants below use the <strong>default themed border colors</strong> (color-mix with the brand color). 
          Expand an item to see the border color deepen from 15% to 30% mix.
        </p>

        <div>
          <h4 style="margin-bottom: 10px; color: var(--ft-color-on-surface-level-300); font-size: 12px; text-transform: uppercase;">Flat (Basic)</h4>
          <ft-accordion variant="flat" [color]="color" [size]="size" [radius]="radius" [multiple]="multiple" [borderColor]="borderColor" [expandedBorderColor]="expandedBorderColor">
             <ft-accordion-item label="Flat Variant" icon="auto_awesome">Flat stays borderless by default.</ft-accordion-item>
          </ft-accordion>
        </div>

        <div>
          <h4 style="margin-bottom: 10px; color: var(--ft-color-on-surface-level-300); font-size: 12px; text-transform: uppercase;">Outlined (Default Themed Border)</h4>
          <ft-accordion variant="outlined" [color]="color" [size]="size" [radius]="radius" [multiple]="multiple" [borderColor]="borderColor" [expandedBorderColor]="expandedBorderColor">
             <ft-accordion-item label="Outlined (Deepens on Expand)" icon="layers" [expanded]="true">
               This item is expanded by default to show the <strong>30% color-mix</strong> border color.
             </ft-accordion-item>
          </ft-accordion>
        </div>

        <div>
          <h4 style="margin-bottom: 10px; color: var(--ft-color-on-surface-level-300); font-size: 12px; text-transform: uppercase;">Faded</h4>
          <ft-accordion variant="faded" [color]="color" [size]="size" [radius]="radius" [multiple]="multiple" [borderColor]="borderColor" [expandedBorderColor]="expandedBorderColor">
             <ft-accordion-item label="Faded Variant" icon="opacity">Themed border at 15% mix when closed.</ft-accordion-item>
          </ft-accordion>
        </div>

        <div>
          <h4 style="margin-bottom: 10px; color: var(--ft-color-on-surface-level-100); font-size: 11px; text-transform: uppercase;">Ghost</h4>
          <ft-accordion variant="ghost" [color]="color" [size]="size" [radius]="radius" [multiple]="multiple" [borderColor]="borderColor" [expandedBorderColor]="expandedBorderColor">
             <ft-accordion-item label="Ghost Variant" icon="view_quilt">Ghost variant is borderless and transparent by default.</ft-accordion-item>
          </ft-accordion>
        </div>

        <div>
          <h4 style="margin-bottom: 10px; color: var(--ft-color-on-surface-level-300); font-size: 12px; text-transform: uppercase;">Soft Outlined</h4>
          <ft-accordion variant="soft-outlined" [color]="color" [size]="size" [radius]="radius" [multiple]="multiple" [borderColor]="borderColor" [expandedBorderColor]="expandedBorderColor">
             <ft-accordion-item label="Soft Outlined Variant" icon="settings_ethernet">Changes from background to border on expand.</ft-accordion-item>
          </ft-accordion>
        </div>
      </div>
    `,
  }),
};
