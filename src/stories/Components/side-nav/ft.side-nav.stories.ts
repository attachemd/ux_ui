import { FtSideNavComponent } from './ft.side-nav.component';
import type { Meta, StoryObj } from '@storybook/angular';
import { within, userEvent, expect } from 'storybook/test';

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
export const InteractionTest: Story = {
    args: {
        activeId: 'patients',
        isExpanded: false,
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        // 1. Verify initial state
        const patientsBtn = canvas.getByRole('button', { name: /patients/i });
        await expect(patientsBtn).toHaveClass('active');

        // 2. Expand Sidebar
        const menuBtn = canvas.getByRole('button', { name: /expand sidebar/i });
        await userEvent.click(menuBtn);

        // Verify label is visible (this depends on CSS transitions, but we can check if class expanded is added)
        const sidebar = canvasElement.querySelector('.sidebar');
        await expect(sidebar).toHaveClass('expanded');

        // 3. Select 'Visites' (checkups)
        const checkupsBtn = canvas.getByRole('button', { name: /visites/i });
        await userEvent.click(checkupsBtn);

        // 4. Verify 'Visites' is active
        await expect(checkupsBtn).toHaveClass('active');
        await expect(patientsBtn).not.toHaveClass('active');

        // 5. Collapse Sidebar
        const collapseBtn = canvas.getByRole('button', { name: /collapse sidebar/i });
        await userEvent.click(collapseBtn);
        await expect(sidebar).not.toHaveClass('expanded');
    },
};
