import { Meta, StoryObj } from '@storybook/angular';
import { FtSwitchButtonComponent } from './ft.switch-button.component';

const meta: Meta<FtSwitchButtonComponent> = {
    title: 'Core/Switch Button/Switch Button',
    component: FtSwitchButtonComponent,
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: 'select',
            options: ['xs-size', 'sm-size', 'md-size', 'lg-size'],
        },
        color: {
            control: 'select',
            options: ['neutral', 'primary', 'secondary', 'tertiary', 'success', 'warning', 'danger'],
        },
        radius: {
            control: 'select',
            options: ['none-radius', 'xs-radius', 'sm-radius', 'md-radius', 'lg-radius', 'full-radius'],
        },
        state: {
            control: 'select',
            options: ['rest', 'disabled'],
        }
    },
    args: {
        size: 'md-size',
        color: 'neutral',
        radius: 'full-radius',
        state: 'rest',
        options: [
            { id: 1, label: 'Tableau' },
            { id: 2, label: 'Graphes' }
        ],
        selectedId: 1
    }
};

export default meta;
type Story = StoryObj<FtSwitchButtonComponent>;

export const Default: Story = {
    args: {}
};

export const IconsWithText: Story = {
    args: {
        options: [
            { id: 1, label: 'Grid', icon: 'grid_view' },
            { id: 2, label: 'List', icon: 'format_list_bulleted' }
        ],
        selectedId: 1
    }
};

export const IconsOnly: Story = {
    args: {
        options: [
            { id: 1, icon: 'grid_view', isIconOnly: true },
            { id: 2, icon: 'format_list_bulleted', isIconOnly: true },
            { id: 3, icon: 'calendar_today', isIconOnly: true }
        ],
        selectedId: 1
    }
};

export const ThreeOptions: Story = {
    args: {
        options: [
            { id: 1, label: 'Day' },
            { id: 2, label: 'Week' },
            { id: 3, label: 'Month' }
        ],
        selectedId: 1
    }
};

