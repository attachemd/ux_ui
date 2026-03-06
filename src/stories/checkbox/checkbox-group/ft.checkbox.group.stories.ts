import { Meta, StoryObj } from '@storybook/angular';
import { FtCheckboxGroupComponent } from './ft.checkbox.group.component';

const meta: Meta<FtCheckboxGroupComponent> = {
    title: 'Checkbox/Checkbox Group',
    component: FtCheckboxGroupComponent,
    tags: ['autodocs'],
    argTypes: {
        flexDirection: {
            control: 'select',
            options: ['flex-row', 'flex-col']
        },
        size: {
            control: 'select',
            options: ['xs-size', 'sm-size', 'md-size', 'lg-size']
        }
    },
    args: {
        isLabel: true,
        label: 'Select your interests',
        flexDirection: 'flex-col',
        size: 'md-size',
        options: [
            { isLabel: true, label: 'Technology', isDescription: false, description: '' },
            { isLabel: true, label: 'Travel', isDescription: true, description: 'International or domestic' },
            { isLabel: true, label: 'Design', isDescription: false, description: '', checked: true },
            { isLabel: true, label: 'Sports', isDescription: false, description: '', inactive: true }
        ]
    }
};

export default meta;
type Story = StoryObj<FtCheckboxGroupComponent>;

export const Default: Story = {
    args: {}
};

export const RowLayout: Story = {
    args: {
        flexDirection: 'flex-row'
    }
};

export const Invalid: Story = {
    args: {
        invalid: true,
        errorMessage: 'Please select at least one interest.'
    }
};

export const Inactive: Story = {
    args: {
        inactive: true
    }
};

export const AllSizes: Story = {
    render: (args) => ({
        props: args,
        template: `
            <div style="display: flex; flex-direction: column; gap: 32px;">
                <div>
                    <h4 style="margin-bottom: 8px;">Extra Small</h4>
                    <ft-checkbox-group [size]="'xs-size'" [label]="'XS Group'" [isLabel]="true" [options]="args.options"></ft-checkbox-group>
                </div>
                <div>
                    <h4 style="margin-bottom: 8px;">Small</h4>
                    <ft-checkbox-group [size]="'sm-size'" [label]="'SM Group'" [isLabel]="true" [options]="args.options"></ft-checkbox-group>
                </div>
                <div>
                    <h4 style="margin-bottom: 8px;">Medium</h4>
                    <ft-checkbox-group [size]="'md-size'" [label]="'MD Group'" [isLabel]="true" [options]="args.options"></ft-checkbox-group>
                </div>
                <div>
                    <h4 style="margin-bottom: 8px;">Large</h4>
                    <ft-checkbox-group [size]="'lg-size'" [label]="'LG Group'" [isLabel]="true" [options]="args.options"></ft-checkbox-group>
                </div>
            </div>
        `
    })
};
