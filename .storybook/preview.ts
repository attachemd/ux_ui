// import './preview-body-class';

import type {Decorator, Preview} from '@storybook/angular'
import {setCompodocJson} from "@storybook/addon-docs/angular";
import docJson from "../documentation.json";
// import "../src/style/tailwind.css"
setCompodocJson(docJson);

// import { moduleMetadata } from '@storybook/angular';
// import {themes} from 'storybook/theming';
// import {withThemeByClassName} from '@storybook/addon-themes';

import '!style-loader!css-loader!../src/stories/common.styles.css';
import {themes} from 'storybook/theming';
// import {addons} from 'storybook/manager-api';
// import React, {useEffect} from 'react';

// import { GLOBALS_CHANGED } from '@storybook/core-events';

// const KNOWN_CLASSES = ['attache', 'cheatos'];

// const syncBodyClass = (globals: Record<string, any>) => {
//   const cls = globals['bodyClass'] || '';
//   document.body.classList.remove(...KNOWN_CLASSES);
//   if (cls) document.body.classList.add(cls);
// };


// const withBodyClass: Decorator = (storyFn, context) => {
//   // read the global arg that controls the class
//   const cls = context.globals['bodyClass'] || '';
//
//   // apply / remove the class whenever the global arg changes
//   addons.getChannel().once(GLOBALS_UPDATED, () => {
//     document.body.className = document.body.className
//       .split(' ')
//       .filter(c => c !== cls)
//       .concat(cls)
//       .join(' ');
//   });
//
//   // initial mount
//   if (cls) document.body.classList.add(cls);
//
//   return storyFn();
// };

// const withBodyClass: Decorator = (storyFn, context) => {
//   // pick the value that comes from the toolbar
//   const cls = (context.globals['bodyClass']) || '';
//
//   // ----- add / remove class on every render -----
//   const apply = () => {
//     document.body.classList.remove('attache', 'cheatos'); // clean previous
//     if (cls) document.body.classList.add(cls);
//   };
//   apply();                                       // first paint
//   // ----- optional: re-apply when globals change (HMR) -----
//   // if (module.hot) module.hot.accept(apply);
//
//   return storyFn();
// };

// const withBodyClass: Decorator = (storyFn, context) => {
//   // initial
//   syncBodyClass(context.globals);
//
//   // listen to every change
//   const channel = addons.getChannel();
//   channel.off(GLOBALS_CHANGED, syncBodyClass); // guard against HMR
//   channel.on(GLOBALS_CHANGED, syncBodyClass);
//
//   return storyFn();
// };

// const withBodyClass: Decorator = (storyFn, context) => {
//   syncBodyClass(context.globals);
//
//   const channel = addons.getChannel();
//   const handler = (globals: Record<string, any>) => syncBodyClass(globals);
//
//   channel.off('globalsChanged', handler);   // 8.6 event name
//   channel.on('globalsChanged', handler);
//
//   return storyFn();
// };

/* ---------- tiny React component that lives for the whole session ---------- */
// const GlobalBodySync = () => {
//   const [globals, setGlobals] = React.useState({} as Record<string, any>);
//
//   useEffect(() => {
//     const channel = addons.getChannel();
//     const sync = (g: Record<string, any>) => {
//       const cls = g['bodyClass'] || '';
//       document.body.classList.remove(...KNOWN_CLASSES);
//       if (cls) document.body.classList.add(cls);
//       setGlobals(g);
//     };
//     sync(addons.getGlobals());          // initial
//     channel.on('globalsChanged', sync); // keep in sync
//     return () => channel.off('globalsChanged', sync);
//   }, []);
//
//   return null; // nothing to render
// };

// const GlobalBodySync = () => {
//   useEffect(() => {
//     const channel = addons.getChannel();
//
//     const sync = (globals: Record<string, any>) => {
//       const cls = globals['bodyClass'] || '';
//       document.body.classList.remove(...KNOWN_CLASSES);
//       if (cls) document.body.classList.add(cls);
//     };
//
//     channel.on('globalsChanged', sync);
//     return () => channel.off('globalsChanged', sync);
//   }, []);
//
//   return null;
// };

const KNOWN = ['attache', 'cheatos'];

/* -------  runs every time the iframe URL changes  ------- */
const globals = (globalThis as any).__STORYBOOK_GLOBALS__ || {};
const cls = globals.bodyClass || '';
document.body.classList.remove(...KNOWN);
if (cls) document.body.classList.add(cls);

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

    // backgrounds: {
    //   default: 'light',
    //   values: [
    //     { name: 'light', value: '#ffffff' },
    //     { name: 'dark', value: '#121212' },
    //   ],
    // },

    darkMode: {
      classTarget: 'html',
      // dark: themes.dark,
      // light02: themes.normal,
    },
  },

  decorators: [
    // withThemeByClassName({
    //   // 1. Target Element: 'html' or 'body' where the class is applied.
    //   parentSelector: 'body',
    //
    //   // 2. Themes Mapping: Maps a user-friendly name (key) to the CSS class (value).
    //   themes: {
    //     // 'Theme Name': 'CSS-Class-Name'
    //     light: '',
    //     dark: 'dark-theme',
    //   },
    //
    //   // 3. Default Theme: Which theme is active on load.
    //   defaultTheme: 'light',
    // }),

    // (Story) => {
    //   // only mount the sync helper once (first story)
    //   if (!document.getElementById('sb-body-sync')) {
    //     const root = document.createElement('div');
    //     root.id = 'sb-body-sync';
    //     document.body.appendChild(root);
    //     import('react-dom/client').then(({ createRoot }) =>
    //       createRoot(root).render(React.createElement(GlobalBodySync))
    //     );
    //   }
    //   return Story();
    // },

    // (story, context) => {
    //   document.body.classList.toggle(
    //     'attache02',
    //     context.globals['darkMode']
    //   );
    //   return story();
    // },

    (storyFn, context) => {
      // document.documentElement.classList.toggle(
      //   'dark',
      //   context.globals['theme'] === 'dark'
      // );
      // return storyFn();

      const isDark = context.globals['darkMode'];

      const html = document.documentElement;
      html.classList.toggle('dark', isDark);

      return storyFn();
    },
  ],

  // globalTypes: {
  //   theme: {
  //     name        : 'Theme',
  //     description : 'Global theme for components',
  //     defaultValue: 'light',
  //     toolbar     : {
  //       icon : 'mirror',
  //       items: [
  //         { value: 'light', title: 'Light', icon: 'sun' },
  //         { value: 'dark',  title: 'Dark',  icon: 'moon' },
  //       ],
  //       dynamicTitle: true,
  //     },
  //   },
  //   bodyClass: {
  //     name: 'Body class',
  //     description: 'CSS class to add to <body>',
  //     defaultValue: '',
  //     toolbar: {
  //       icon: 'paintbrush',
  //       items: [
  //         { value: 'bogobogo', title: 'None' },
  //         { value: 'attache', title: 'Dark' },
  //         { value: 'cheatos', title: 'RTL' },
  //       ],
  //     },
  //   },
  // },

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
