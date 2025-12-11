import type { Preview } from '@storybook/angular'
import { setCompodocJson } from "@storybook/addon-docs/angular";
import docJson from "../documentation.json";
// import "../src/style/tailwind.css"
setCompodocJson(docJson);

// import { moduleMetadata } from '@storybook/angular';
// import {themes} from 'storybook/theming';
import {withThemeByClassName} from '@storybook/addon-themes';

import '!style-loader!css-loader!../src/stories/common.styles.css';

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: [
          'Radio Buttons', ['Radio', 'Radio Group', 'Radio All Cases', '*'],  // Radio Buttons group first
          'Inputs', ['Input', 'Textarea', 'Select', '*'], // Inputs group second
          'Colors', [ 'Surface', 'OnSurface', 'Common', '*'],
          ['*', '**'],  // All other stories
        ], // * means everything else
      },
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },

    // backgrounds: {
    //   default: 'light',
    //   values: [
    //     { name: 'light', value: '#ffffff' },
    //     { name: 'dark', value: '#121212' },
    //   ],
    // },
  },

  decorators: [
    withThemeByClassName({
      // 1. Target Element: 'html' or 'body' where the class is applied.
      parentSelector: 'body',

      // 2. Themes Mapping: Maps a user-friendly name (key) to the CSS class (value).
      themes: {
        // 'Theme Name': 'CSS-Class-Name'
        light: '',
        dark: 'dark-theme',
      },

      // 3. Default Theme: Which theme is active on load.
      defaultTheme: 'light',
    }),
  ],

  // decorators: [
  //   moduleMetadata({
  //     declarations: [],
  //     imports: [],
  //     providers: [],
  //   }),
  // ],
  // globalTypes: {
  //   theme: {
  //     name: 'Theme',
  //     description: 'Global theme for components',
  //     defaultValue: 'light',
  //     toolbar: {
  //       icon: 'circlehollow',
  //       items: [
  //         { value: 'light', title: 'Light' },
  //         { value: 'dark', title: 'Dark' },
  //       ],
  //       dynamicTitle: true,
  //     },
  //   },
  // },
};

export default preview;
