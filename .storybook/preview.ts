// import './preview-body-class';

import type {Preview} from '@storybook/angular'
import {setCompodocJson} from "@storybook/addon-docs/angular";
import docJson from "../documentation.json";
setCompodocJson(docJson);

import '!style-loader!css-loader!../src/stories/common.styles.css';


const preview: Preview = {
  parameters: {
    docs: {
      inlineStories: false,
    },
    options: {
      storySort: {
        order: [
          'Theme', ['Roadmap', 'Colors', ['Common Colors', 'Surface Colors', 'On Surface Colors', '*']],
          'Radio Buttons', ['Radio', 'Radio Group', 'Radio All Cases', '*'],
          'Inputs', ['Input', 'Textarea', 'Select', '*'],
          'Buttons', ['Button', 'Button All Cases', 'Icon Button', 'Icon Button All Cases', 'Textarea', 'Select', '*'],
          ['*', '**'],  // All other stories
        ],
      },
    },
    actions: {argTypesRegex: '^on[A-Z].*'},
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },


    darkMode: {
      darkClass: 'dark-theme',
      stylePreview: true,
      classTarget: 'body',
    },
  },

  decorators: [

  ],

};

export default preview;
