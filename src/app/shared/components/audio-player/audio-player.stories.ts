import type { Meta, StoryObj } from '@storybook/angular';
import { AudioPlayerComponent } from './audio-player.component';

const meta: Meta<AudioPlayerComponent> = {
    title: 'Components/AudioPlayer',
    component: AudioPlayerComponent,
    tags: ['autodocs'],
    argTypes: {
        audioSrc: {
            control: 'text',
            description: 'The source URL of the audio file'
        },
        trackTitle: {
            control: 'text',
            description: 'The title of the audio track'
        }
    }
};

export default meta;
type Story = StoryObj<AudioPlayerComponent>;

export const Default: Story = {
    args: {
        audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        trackTitle: 'Analyse - Sang'
    },
};

export const DifferentTrack: Story = {
    args: {
        audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        trackTitle: 'Clinical Report - Audio'
    },
};
