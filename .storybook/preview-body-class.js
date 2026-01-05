// .storybook/addon-body-class.ts
import { addons } from '@storybook/preview-api';

// const KNOWN_CLASSES = ['attache', 'cheatos'];
//
// const channel = addons.getChannel();
//
// const apply = (globals: Record<string, any>) => {
//   const cls = globals['bodyClass'] || '';
//   document.body.classList.remove(...KNOWN_CLASSES);
//   if (cls) document.body.classList.add(cls);
// };
//
// /* first paint */
// apply((window as any).__STORYBOOK_GLOBALS__ || {});
//
// /* keep in sync */
// channel.on('globalsChanged', apply);


const KNOWN = ['attache', 'cheatos'];

// function apply(cls = '') {
//   document.body.classList.remove(...KNOWN);
//   if (cls) document.body.classList.add(cls);
// }
//
// // first paint
// apply(window.__STORYBOOK_GLOBALS__?.bodyClass);
//
// // every change
// window.__STORYBOOK_ADDON_GLOBALS_CHANNEL__.on('globalsChanged', (globals) => {
//   apply(globals.bodyClass);
// });

const apply = (cls = '') => {
  document.body.classList.remove(...KNOWN);
  if (cls) document.body.classList.add(cls);
};

const channel = addons.getChannel();

// first paint – SB sends the current globals immediately
channel.once('globalsChanged', (globals) => apply(globals.bodyClass));

// keep in sync
channel.on('globalsChanged', (globals) => apply(globals.bodyClass));
