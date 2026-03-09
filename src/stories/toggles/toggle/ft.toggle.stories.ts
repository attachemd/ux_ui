import { FtToggleComponent } from './ft.toggle.component';
import type { Meta, StoryObj } from '@storybook/angular';

const meta: Meta<FtToggleComponent> = {
    title: 'Core/Toggle/Toggle',
    component: FtToggleComponent,
    tags: ['autodocs'],
    parameters: {
        order: 1,
    },
    args: {
        isLabel: true,
        label: 'Toggle Option',
    }
};

export default meta;
type Story = StoryObj<FtToggleComponent>;

export const LabelRight: Story = {
    args: {
        labelPosition: 'right'
    }
};

export const LabelLeft: Story = {
    args: {
        labelPosition: 'left'
    }
};

export const LabelTop: Story = {
    args: {
        labelPosition: 'top'
    }
};

export const IconVariant: Story = {
    args: {
        variant: 'icon',
        value: true
    }
};

export const BinaryVariant: Story = {
    args: {
        variant: 'label',
        value: true,
        onLabel: 'ON',
        offLabel: 'OFF'
    }
};

export const WithDescription: Story = {
    args: {
        isDescription: true,
        description: 'This is a helpful description that provides more context about the toggle setting.'
    }
};

