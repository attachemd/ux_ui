import type { Meta, StoryObj } from '@storybook/angular';
import { FtBadgeComponent } from './badge.component';

const meta: Meta<any> = {
  title: 'Components/Badge',
  component: FtBadgeComponent,
  tags: ['autodocs'],
  argTypes: {
    severity: {
      control: 'select',
      options: ['primary', 'danger', 'success'],
    },
    size: {
      control: 'select',
      options: ['sm-size', 'md-size'],
    },
  },
};

export default meta;
type Story = StoryObj<any>;

export const Default: Story = {
  args: {
    value: 5,
    severity: 'danger',
  },
  render: (args) => ({
    props: args,
    template: `
      <ft-badge [value]="value" [severity]="severity" [size]="size" [showDot]="showDot">
        <div style="width: 40px; height: 40px; background: #eee; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
          Icon
        </div>
      </ft-badge>
    `,
  }),
};

export const Dot: Story = {
  args: {
    showDot: true,
    severity: 'primary',
  },
  render: (args) => ({
    props: args,
    template: `
      <ft-badge [showDot]="showDot" [severity]="severity">
        <div style="width: 40px; height: 40px; background: #eee; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
          Icon
        </div>
      </ft-badge>
    `,
  }),
};
