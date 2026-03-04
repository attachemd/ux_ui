import { FtSideNavComponent } from './ft.side-nav.component';
import type { Meta, StoryObj } from '@storybook/angular';

const meta: Meta<FtSideNavComponent> = {
    title: 'Components/Side Nav',
    component: FtSideNavComponent,
    parameters: {
        layout: 'fullscreen',
    },
    argTypes: {
        activeId: {
            control: 'select',
            options: ['patients', 'checkups', 'schedule', 'treatment'],
            description: 'The ID of the active navigation item',
        },
        isExpanded: {
            control: 'boolean',
            description: 'Whether the sidebar is expanded',
        },
        navItems: {
            control: 'object',
            description: 'The list of navigation items',
        },
    },
    args: {
        activeId: 'patients',
        isExpanded: false,
        navItems: [
            { id: 'patients', label: 'Patients', icon: 'group' },
            { id: 'checkups', label: 'Visites', icon: 'stethoscope' },
            { id: 'schedule', label: 'Agendas', icon: 'event_note' },
            { id: 'treatment', label: 'Hospitalisation', icon: 'syringe' }
        ],
    }
};

export default meta;
type Story = StoryObj<FtSideNavComponent>;

export const Default: Story = {
    args: {
        activeId: 'patients',
    }
};

export const Checkups: Story = {
    args: {
        activeId: 'checkups',
    }
};

export const Schedule: Story = {
    args: {
        activeId: 'schedule',
    }
};

export const Expanded: Story = {
    args: {
        activeId: 'patients',
        isExpanded: true,
    }
};

export const CustomItems: Story = {
    args: {
        activeId: 'dashboard',
        isExpanded: true,
        navItems: [
            { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
            { id: 'analytics', label: 'Analytics', icon: 'analytics' },
            { id: 'settings', label: 'Settings', icon: 'settings' }
        ]
    }
};
