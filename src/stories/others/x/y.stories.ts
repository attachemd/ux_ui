import { Meta, StoryObj } from '@storybook/angular';
import { YButtonComponent } from './y.component'; // Adjust path as needed
import { CommonModule } from '@angular/common'; // Often needed for template functions

// --- ICON LIBRARY SPECIFIC IMPORTS AND SETUP ---
// Example with Font Awesome (you would need to install it: npm install @fortawesome/angular-fontawesome @fortawesome/free-solid-svg-icons)
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { faCoffee, faSearch } from '@fortawesome/free-solid-svg-icons'; // Import specific icons
// You might need to add library.add(faCoffee, faSearch) if using the library globally, or directly in templates.

// Example with Material Icons (if using Google Fonts, no direct import needed in TS, just CSS link)
// <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

// Example with SVG sprite (assuming you have an SVG icon component or direct SVG in template)
// import { IconComponent } from 'path/to/your/icon.component'; // If you wrap SVGs in a component
// -------------------------------------------------


const meta: Meta<YButtonComponent> = {
  title: 'Others/Components/Button',
  component: YButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    type: { control: 'select', options: ['primary', 'secondary'] },
    disabled: { control: 'boolean' },
    onClick: { action: 'clicked' },
  },
  render: (args) => ({
    props: args,
    // Add imports for modules used in the template here
    moduleMetadata: {
      imports: [
        CommonModule,
        // FontAwesomeModule, // Include FontAwesomeModule if using Font Awesome
        // IconComponent, // Include your custom icon component if you have one
      ],
    },
  }),
};

export default meta;
type Story = StoryObj<YButtonComponent>;

// --- STORIES ---

export const PrimaryWithLeftIcon: Story = {
  args: {
    label: 'Search',
    type: 'primary',
  },
  render: (args) => ({
    props: args,
    template: `
      <app-button [label]="label" [type]="type" [disabled]="disabled">
<!--        <fa-icon [icon]="faSearch" icon-left class="icon"></fa-icon>-->
<i icon-left class="icon-menu"></i>
        </app-button>
    `,
    // Pass the icon directly to the template context if needed
    // For Font Awesome, we typically make it available via the component's render context
    moduleMetadata: {
      // imports: [FontAwesomeModule, CommonModule],
      imports: [CommonModule],
    },
    // If you need to make variables available in the template directly
    // and they aren't part of the component's inputs
    // templateData: { faSearch }, // Make faSearch available in the template
  }),
};

export const SecondaryWithRightIcon: Story = {
  args: {
    label: 'Buy Coffee',
    type: 'secondary',
  },
  render: (args) => ({
    props: args,
    template: `
      <app-button [label]="label" [type]="type" [disabled]="disabled">
<!--        <fa-icon [icon]="faCoffee" icon-right class="icon"></fa-icon>-->
<i icon-left class="icon-menu"></i>
        </app-button>
    `,
    moduleMetadata: {
      imports: [CommonModule],
    },
    // templateData: { faCoffee },
  }),
};

export const DisabledWithIcon: Story = {
  args: {
    label: 'Download',
    type: 'primary',
    disabled: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <app-button [label]="label" [type]="type" [disabled]="disabled">
<!--        <fa-icon [icon]="faCoffee" icon-left class="icon"></fa-icon>-->
<i icon-left class="icon-menu"></i>
      </app-button>
    `,
    moduleMetadata: {
      imports: [CommonModule],
    },
    // templateData: { faCoffee },
  }),
};
