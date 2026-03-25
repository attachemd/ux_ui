import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { FtButtonDropdownComponent } from './button-dropdown.component';

const meta: Meta<any> = {
    title: 'Core/Buttons/Button Dropdown',
    component: FtButtonDropdownComponent,
    decorators: [
        moduleMetadata({
            imports: [FtButtonDropdownComponent],
        }),
    ],
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: 'select',
            options: ['xs-size', 'sm-size', 'md-size', 'lg-size'],
        },
        color: {
            control: 'select',
            options: ['primary', 'secondary', 'tertiary', 'success', 'warning', 'danger'],
        },
        variant: {
            control: 'select',
            options: ['flat', 'faded', 'outlined', 'ghost'],
        },
        radius: {
            control: 'select',
            options: ['none-radius', 'xs-radius', 'sm-radius', 'md-radius', 'lg-radius', 'full-radius'],
        },
        state: {
            control: 'select',
            options: ['rest', 'hover', 'press', 'focus', 'disabled'],
        },
    },
    args: {
        label: 'Button Dropdown',
        size: 'md-size',
        color: 'primary',
        variant: 'flat',
        radius: 'md-radius',
        state: 'rest',
        isSplit: false,
        options: [
            { label: 'Option 1', value: 1, icon: 'edit' },
            { label: 'Option 2', value: 2, icon: 'share' },
            { label: 'Option 3', value: 3, icon: 'delete', disabled: true },
            { label: 'Settings', value: 'settings', icon: 'settings' },
        ],
    },
};

export default meta;
type Story = StoryObj<any>;

export const Default: Story = {
    args: {
        label: 'Dropdown',
    },
};

export const SplitButton: Story = {
    args: {
        label: 'Split Button',
        isSplit: true,
    },
};

export const Colors: Story = {
    render: (args) => ({
        props: args,
        template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <ft-button-dropdown label="Primary" color="primary" [options]="options" [size]="size" [radius]="radius" [variant]="variant" [state]="state"></ft-button-dropdown>
        <ft-button-dropdown label="Secondary" color="secondary" [options]="options" [size]="size" [radius]="radius" [variant]="variant" [state]="state"></ft-button-dropdown>
        <ft-button-dropdown label="Success" color="success" [options]="options" [size]="size" [radius]="radius" [variant]="variant" [state]="state"></ft-button-dropdown>
        <ft-button-dropdown label="Warning" color="warning" [options]="options" [size]="size" [radius]="radius" [variant]="variant" [state]="state"></ft-button-dropdown>
        <ft-button-dropdown label="Danger" color="danger" [options]="options" [size]="size" [radius]="radius" [variant]="variant" [state]="state"></ft-button-dropdown>
      </div>
    `,
    }),
};

export const Variants: Story = {
    render: (args) => ({
        props: args,
        template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <ft-button-dropdown label="Flat" variant="flat" [options]="options" [color]="color" [size]="size" [radius]="radius" [state]="state"></ft-button-dropdown>
        <ft-button-dropdown label="Outlined" variant="outlined" [options]="options" [color]="color" [size]="size" [radius]="radius" [state]="state"></ft-button-dropdown>
        <ft-button-dropdown label="Faded" variant="faded" [options]="options" [color]="color" [size]="size" [radius]="radius" [state]="state"></ft-button-dropdown>
        <ft-button-dropdown label="Ghost" variant="ghost" [options]="options" [color]="color" [size]="size" [radius]="radius" [state]="state"></ft-button-dropdown>
      </div>
    `,
    }),
};

export const Sizes: Story = {
    render: (args) => ({
        props: args,
        template: `
      <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
        <ft-button-dropdown label="Extra Small" size="xs-size" [options]="options" [color]="color" [variant]="variant" [radius]="radius" [state]="state"></ft-button-dropdown>
        <ft-button-dropdown label="Small" size="sm-size" [options]="options" [color]="color" [variant]="variant" [radius]="radius" [state]="state"></ft-button-dropdown>
        <ft-button-dropdown label="Medium" size="md-size" [options]="options" [color]="color" [variant]="variant" [radius]="radius" [state]="state"></ft-button-dropdown>
        <ft-button-dropdown label="Large" size="lg-size" [options]="options" [color]="color" [variant]="variant" [radius]="radius" [state]="state"></ft-button-dropdown>
      </div>
    `,
    }),
};

export const IconOnly: Story = {
    render: (args) => ({
        props: args,
        template: `
      <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
        <ft-button-dropdown [isIconOnly]="true" [isPrefixIconClass]="true" prefixIconClass="more_vert" [options]="options" [color]="color" [variant]="variant" [radius]="radius" [state]="state"></ft-button-dropdown>
        <ft-button-dropdown [isIconOnly]="true" [isPrefixIconClass]="true" prefixIconClass="settings" color="secondary" [options]="options" [variant]="variant" [radius]="radius" [state]="state"></ft-button-dropdown>
        <ft-button-dropdown [isIconOnly]="true" [isSplit]="true" [isPrefixIconClass]="true" prefixIconClass="add" color="success" [options]="options" [variant]="variant" [radius]="radius" [state]="state"></ft-button-dropdown>
        <ft-button-dropdown [isIconOnly]="true" [isSplit]="true" [isPrefixIconClass]="true" prefixIconClass="download" color="warning" [options]="options" [variant]="variant" [radius]="radius" [state]="state"></ft-button-dropdown>
      </div>
    `,
    }),
};

