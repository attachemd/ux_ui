// import './preview-body-class';

import React from 'react';
import type { Preview } from '@storybook/angular'
import { setCompodocJson } from "@storybook/addon-docs/angular";
import docJson from "../documentation.json";
setCompodocJson(docJson);

import '!style-loader!css-loader!../src/stories/common.styles.css';
import { themes } from 'storybook/theming';
import { useDarkMode } from '@vueless/storybook-dark-mode';
import { DocsContainer } from '@storybook/addon-docs/blocks';


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
          'Roadmap',
          'Theme',
          ['Colors', ['Common Colors', 'Surface Colors', 'On Surface Colors', '*']],
          'Core',
          [
            'Button', 'Button All Cases',
            'Icon Button', 'Icon Button All Cases',
            'Toggle Icon Button', 'Toggle Icon Button All Cases',
            'Button Group', 'Button Group All Cases',
            'Input', 'Input All Cases', 'Input Showcase',
            'Textarea', 'Textarea All Cases',
            'Select', 'Select (Core)', 'Select (All Cases)',
            'Radio', 'Radio All Cases',
            'Radio Group', 'Radio Group All Cases',
            'Checkbox', 'Checkbox All Cases',
            'Checkbox Group', 'Checkbox Group All Cases',
            'Switch Button', 'Switch Button All Cases',
            'Toggle', 'Toggle All Cases',
            'Chips', 'Chips All Cases',
            'Accordion',
            '*'
          ],
          'Components',
          ['Login', 'Side Nav', 'Biometrics', '*'],
          '*',
        ],
      },
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
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
