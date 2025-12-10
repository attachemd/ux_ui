// button.stories.ts
import {Meta, StoryObj} from '@storybook/angular';
import { ZButtonComponent } from './z.button.component';
import {PencilIcon} from 'primeng/icons';

const ICONS = {
  PencilIcon,
};

const meta: Meta<ZButtonComponent> = {
  title: 'Others/Components/ZButton',
  component: ZButtonComponent,
  argTypes: {
    iconName: {
      control: 'select',
      options: ['', 'home', 'settings', 'favorite', 'search', 'arrow_right'],
      description: 'Icon to display'
    },
    iconPosition: {
      control: 'radio',
      options: ['left', 'right'],
      description: 'Icon position'
    },
    iconClass: {
      // control: {
      //   type: 'select',
      //   // options: {
      //   //   PencilIcon: 'PencilIcon',
      //   // },
      //   // options: Object.keys(ICONS)
      //   options: [
      //     // { value: 'option1', label: '<strong>Option 1</strong>' },
      //     // { value: 'option2', label: '<strong>Option 1</strong>' },
      //     // 'option1',
      //     // '<div>',
      //     // 'icon-menu',
      //     // 'icon-export'
      //   //   PencilIcon: 'PencilIcon',
      //   ],
      // },

      control: 'select',

      // options: {
      //   // 'Material Icons': 'material-icons',
      //   // 'Font Awesome': 'fa fa-solid',
      //   // 'None': ''
      // },

      options: [
        // { value: 'option1', label: '<strong>Option 1</strong>' },
        // { value: 'option2', label: '<strong>Option 1</strong>' },
        // 'option1',
        // '<div>',
        'icon-menu',
        'icon-export'
      //   PencilIcon: 'PencilIcon',
      ],

      description: 'Select an icon class for the component',

      // control: 'colors',
      // presetColors: ['red', 'green'],

      // control: {
      //   type: 'colors',
      //   presetColors: [
      //     '#FF4785', // Coral
      //     '#1EA7FD', // Dodger Blue
      //     '#67C23A', // Green
      //     '#F56C6C', // Red
      //     '#E6A23C', // Orange
      //     '#909399', // Gray
      //   ],
      // },

      // control: {
      //   type: 'select',
      // },
      // options: [
      //   'fa-solid fa-star',
      //   'fa-solid fa-heart',
      //   'fa-solid fa-bolt',
      // ],

      // options: ['PencilIcon', 'TrashIcon', 'EditIcon'],
      // labels: {
      //   PencilIcon: '✏️ Pencil',
      //   TrashIcon: '🗑️ Trash',
      //   EditIcon: '📝 Edit',
      // },
      //
      // description: 'Select an icon class for the component',

      // labels: {
      //   // option1: '<strong>Option 1</strong>',
      //   // option2: '<em>Option 2</em>',
      //   option1: 'Option 1',
      //   option2: 'Option 2',
      //   // option3: '<span style="colors: red;">Red Option</span>'
      // }
      // defaultValue: 'material-icons'
    },
    onClick: { action: 'clicked' }
  }
};

export default meta;
type Story = StoryObj<ZButtonComponent>;

// const Template: StoryObj<ZButtonComponent> = (args: ZButtonComponent) => ({
//   props: args,
// });

export const Primary: Story = {
  args: {
    label: 'Primary Button',
    buttonClass: 'btn-primary',
  }
}
// Primary.args = {
//   label: 'Primary Button',
//   buttonClass: 'btn-primary',
// };

export const WithIcon: Story = {
  args: {
    label: 'Button with Icon',
    buttonClass: 'btn-primary',
    iconName: 'home',
    iconText: 'home', // For Material icons
    // iconClass: 'material-icons',
    iconClass: 'icon-menu',
    iconPosition: 'left'
  }
}
