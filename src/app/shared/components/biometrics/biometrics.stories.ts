import type { Meta, StoryObj } from '@storybook/angular';
import { BiometricsComponent } from './biometrics.component';

const meta: Meta<BiometricsComponent> = {
    title: 'Components/Biometrics',
    component: BiometricsComponent,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<BiometricsComponent>;

export const AllCases: Story = {
    args: {},
};
