# Gemini CLI Mandates - UXUI Project

This project is a component library and UI framework built with Angular 19 and Storybook. These mandates take absolute precedence over all other instructions.

## 🛠 Technology Stack
- **Framework:** Angular 19+ (using standalone components).
- **Component Documentation:** Storybook 10.
- **Styling:** 
  - Tailwind CSS 4.
  - Vanilla CSS with custom property variables (prefixed with `--ft-` and `--_`).
  - `ViewEncapsulation.Emulated` is the default.
- **Icons:** Material Symbols Rounded.
- **UI Libraries:** PrimeNG and Angular Material are available in the dependencies.

## 📐 Architecture & Conventions
- **Component Prefix:** Use `ft-` for all custom components (e.g., `ft-button`, `ft-checkbox`).
- **Encapsulation:** Be mindful of `::ng-deep` usage for cross-component styling or when overriding host styles in a Storybook context.
- **Surgical Updates:** Maintain the "mixin-like" structure in CSS files where global base styles are separate from color/variant/size logic.
- **Variables:** Use the established variable patterns for component internals (e.g., `--_brand`, `--_height`, etc.).

## ✅ Validation Protocols
- **Build:** Always ensure `ng build` or `ng serve` would succeed after changes.
- **Storybook:** When modifying components, verify that their corresponding `.stories.ts` files are still valid or updated to reflect API changes.
- **Testing:** Run `ng test` to ensure no regressions in component logic.

## 🚫 Constraints
- **Do Not** introduce new UI libraries without explicit request.
- **Do Not** modify global styles in `src/style/` unless specifically tasked with theme-level changes.
- **Do Not** use `!important` in CSS unless it is absolutely necessary to override third-party library styles or complex `ng-deep` scenarios (as established in `ft.button-group.component.css`).
