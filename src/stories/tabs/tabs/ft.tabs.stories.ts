import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { FTabsComponent } from './ft.tabs.component';
import { FTabComponent } from './ft.tab.component';

const meta: Meta<FTabsComponent> = {
    title: 'Core/Tabs/Tabs',
    component: FTabsComponent,
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['flat', 'faded', 'outlined', 'ghost'],
        },
        size: {
            control: 'select',
            options: ['xs-size', 'sm-size', 'md-size', 'lg-size'],
        },
        color: {
            control: 'select',
            options: ['default', 'primary', 'secondary', 'tertiary', 'success', 'warning', 'danger'],
        },
        radius: {
            control: 'select',
            options: ['none-radius', 'xs-radius', 'sm-radius', 'md-radius', 'lg-radius', 'full-radius'],
        },
        disabled: { control: 'boolean' },
        fullWidth: { control: 'boolean' }
    },
    args: {
        variant: 'flat',
        size: 'md-size',
        color: 'primary',
        radius: 'md-radius',
        disabled: false,
        fullWidth: false
    }
};

export default meta;
type Story = StoryObj<FTabsComponent>;

export const Default: Story = {
    args: {
        activeTabValue: 'music',
        tabs: [
            { label: 'Music', value: 'music' },
            { label: 'Podcasts', value: 'podcasts' },
            { label: 'Documentaries', value: 'documentaries' }
        ]
    }
};

export const WithIcons: Story = {
    args: {
        activeTabValue: 'music',
        tabs: [
            { label: 'Music', value: 'music', icon: 'music_note' },
            { label: 'Podcasts', value: 'podcasts', icon: 'podcasts' },
            { label: 'Video', value: 'video', icon: 'smart_display' }
        ]
    }
};

export const DisabledItems: Story = {
    args: {
        activeTabValue: 'music',
        tabs: [
            { label: 'Music', value: 'music' },
            { label: 'Podcasts', value: 'podcasts', disabled: true },
            { label: 'Video', value: 'video' }
        ]
    }
};

export const WithContentPanel: Story = {
    render: (args) => ({
        props: args,
        moduleMetadata: {
            imports: [FTabComponent]
        },
        template: `
            <ft-tabs 
                [variant]="variant" 
                [size]="size" 
                [color]="color" 
                [radius]="radius" 
                [disabled]="disabled" 
                [fullWidth]="fullWidth" 
                [(activeTabValue)]="activeTabValue">
                <ft-tab label="Photos" value="photos" icon="photo_library">
                    <div class="flex flex-col gap-2 p-1">
                        <h3 class="text-lg font-semibold m-0 text-gray-800">Your Gallery</h3>
                        <div class="text-sm text-gray-500">
                            Welcome to your photos gallery. Here you can find all your intelligently categorized pictures and albums.
                        </div>
                    </div>
                </ft-tab>
                <ft-tab label="Music" value="music" icon="music_note">
                    <div class="flex flex-col gap-2 p-1">
                        <h3 class="text-lg font-semibold m-0 text-gray-800">Recent Tracks</h3>
                        <div class="text-sm text-gray-500">
                            Listen to your favorite tracks and manage your playlists in the music section.
                        </div>
                    </div>
                </ft-tab>
                <ft-tab label="Videos" value="videos" icon="smart_display">
                    <div class="flex flex-col gap-2 p-1">
                        <h3 class="text-lg font-semibold m-0 text-gray-800">Saved Videos</h3>
                        <div class="text-sm text-gray-500">
                            Watch the latest videos and movies you have saved to your collection.
                        </div>
                    </div>
                </ft-tab>
            </ft-tabs>
        `
    }),
    args: {
        activeTabValue: 'photos'
    }
};
