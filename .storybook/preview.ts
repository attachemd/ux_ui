// import './preview-body-class';

import React from 'react';
import type {Preview} from '@storybook/angular'
import {setCompodocJson} from "@storybook/addon-docs/angular";
import docJson from "../documentation.json";
setCompodocJson(docJson);

import '!style-loader!css-loader!../src/stories/common.styles.css';
import {themes} from 'storybook/theming';
import {useDarkMode} from '@vueless/storybook-dark-mode';
import {DocsContainer} from '@storybook/addon-docs/blocks';


const preview: Preview = {
  parameters: {
    docs: {
      inlineStories: false,
      // Custom container to sync theme and apply classes
      container: ({ children, context }: any) => {
        const isDark = useDarkMode();
        const currentTheme = isDark ? themes.dark : themes.light;

        // Use React.createElement instead of JSX tags
        return React.createElement(
          'div',
          { className: isDark ? 'dark-mode' : 'light-mode' },
          React.createElement(DocsContainer, { context, theme: currentTheme }, children)
        );
      },
    },
    options: {
      storySort: {
        order: [
          'Theme', ['Roadmap', 'Colors', ['Common Colors', 'Surface Colors', 'On Surface Colors', '*']],
          'Radio Buttons', ['Radio', 'Radio Group', 'Radio All Cases', '*'],
          'Inputs', ['Input', 'Textarea', 'Select', '*'],
          'Buttons', ['Button', 'Button All Cases', 'Icon Button', 'Icon Button All Cases', 'Textarea', 'Select', '*'],
          'login', ['Login', '*'],
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
