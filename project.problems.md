# Storybook Troubleshooting Log - UXUI Project

This document tracks the issues encountered while running or building Storybook and the steps taken to resolve them.

## Issue 1: Story Indexing Conflict
**Problem**: Storybook failed to start with a "Unable to index" error.
**Error Log**:
```
Error: You created a component docs page for 'Core/Inputs/Input', but also tagged the CSF file with 'autodocs'. This is probably a mistake.
```
**Diagnosis**: Both `ft.input.stories.ts` (via the `autodocs` tag) and `ft.input.mdx` (via the `Meta` tag with `of={...}`) were trying to generate the primary documentation page for the same component title.
**Resolution**:
1. Removed the `autodocs` tag from the `Meta` object in `src/stories/inputs/input/ft.input.stories.ts`.
**Command**:
- Filesystem edit: Removed `tags: ['autodocs']`.

## Issue 2: Missing Module Resolution (@storybook/blocks)
**Problem**: The build failed with a "Module not found" error when using a custom MDX file.
**Error Log**:
```
SB_BUILDER-WEBPACK5_0002 (WebpackInvocationError): Module not found:
Error: Can't resolve '@storybook/blocks' in '.\src\stories\inputs\input'
```
**Diagnosis**: The MDX file used imports from `@storybook/blocks`, but the package was not installed in the project.
**Resolution**:
1. Attempted to install `@storybook/blocks` at the matching Storybook version (10.2.17).
2. Discovered that the project actually patterns its MDX imports from `@storybook/addon-docs/blocks`.
**Commands**:
- `npm install --save-dev @storybook/blocks` (Initially used to verify compatibility, but eventually uninstalled).
- `npm uninstall @storybook/blocks` (To prevent version conflicts).

## Issue 3: Internal Theming Export Error (Version Mismatch)
**Problem**: After installing `@storybook/blocks` (v8), the build failed with an export error.
**Error Log**:
```
Error: "./internal/theming" is not exported under the conditions [...] from package .\node_modules\storybook
```
**Diagnosis**: `@storybook/blocks` was installed at version `8.x`, while the project's core Storybook packages are at `10.x`. This caused a breaking mismatch in how internal theming modules are resolved.
**Resolution**:
1. Inspected existing MDX files (e.g., `roadmap.mdx`) to see how they import blocks.
2. Found that the project uses `@storybook/addon-docs/blocks` for all documentation blocks.
3. Updated the import in `ft.input.mdx` to use `@storybook/addon-docs/blocks`.
**Commands**:
- `npm run build-storybook > storybook_build_log_v4.txt 2>&1` (Verified successful build).

## Issue 4: Runtime `of={undefined}` and Indexing Failure
**Problem**: The documentation page showed `Unexpected of={undefined}` or failed to load entirely, even when imports seemed correct.
**Error Log**:
```
Error: Invariant failed: Could not find or load CSF file at path "./ft.input.component"
Unexpected of={undefined}, did you mistype a CSF file reference?
```
**Diagnosis**: Storybook 10's indexing engine was experiencing a module resolution conflict between `ft.input.component.ts`, `ft.input.stories.ts`, and `ft.input.mdx`. The common `ft.input` prefix with dots likely confused the internal path-to-id mapping.
**Resolution**:
1. Renamed `ft.input.stories.ts` to `ft-input.stories.ts`.
2. Renamed `ft.input.mdx` to `ft-input.mdx`.
3. Updated the import in `ft-input.mdx` to use `./ft-input.stories`.
4. Standardized on `name="-based"` story references inside `<Canvas>` blocks for maximum compatibility.
**Commands**:
- `mv src/stories/inputs/input/ft.input.stories.ts src/stories/inputs/input/ft-input.stories.ts`
- `mv src/stories/inputs/input/ft.input.mdx src/stories/inputs/input/ft-input.mdx`

## Issue 5: Port 6006 Conflict (Zombie Processes)
**Problem**: Storybook failed to start because the port was already occupied.
**Diagnosis**: On Windows, particularly with large Angular projects, Storybook processes sometimes enter a "CLOSE_WAIT" or zombie state, preventing new instances from binding to port 6006.
**Resolution**:
1. Identified the PID occupying the port.
2. Forcefully terminated the process.
**Commands**:
- `netstat -ano | findstr :6006`
- `taskkill /F /PID <PID>`

## Issue 6: "No primary story" Meta Linkage
**Problem**: The Docs page displayed: `Error: No primary story attached to this docs file`.
**Diagnosis**: Storybook 10 requires an explicit linkage between the MDX file and its CSF counterpart to determine which story is "primary".
**Resolution**:
1. Updated the `<Meta />` tag to use the `of` property pointing to the imported stories module.
**Code Change**:
```javascript
import * as InputStories from './ft-input.stories';
<Meta of={InputStories} />
```

## Issue 7: Identical Component Rendering in MDX
**Problem**: All variants in the documentation appeared with identical configurations (Default label/placeholder).
**Diagnosis**: The `name="-based"` reference pattern in MDX sometimes fails to pass down the unique `args` from the CSF file to the preview.
**Resolution**:
1. Switched from `name="StoryName"` to `of={StoryName}` in all `<Canvas />` and `<Story />` tags.
**Explanation**: This pattern ensures the Storybook engine pulls the exact story object, including its pre-configured arguments.

## Issue 8: Sidebar Duplication & Indexing Confusion
**Problem**: Multiple entries for 'Input' appeared in the sidebar, causing navigation confusion.
**Diagnosis**: Legacy or duplicate story files (e.g., `input-all-cases.stories.ts`) were still being picked up by the glob pattern.
**Resolution**:
1. Identified and removed the redundant story file.
**Command**:
- `rm src/stories/inputs/input-all-cases/input-all-cases.stories.ts`

## Issue 9: Reactive Forms `NG01203` (Missing `ControlValueAccessor`)
**Problem**: When using `ft-input` or `ft-select` with `formControlName`, Angular throws `NG01203: No value accessor for form control name`.
**Diagnosis**: Custom components must implement the `ControlValueAccessor` interface to bridge the gap between the Angular Reactive Forms API and the native DOM elements inside the component.
**Resolution**:
1. Implemented `ControlValueAccessor` in `FTInputComponent` and `FTSelectComponent`.
2. Registered the components as `NG_VALUE_ACCESSOR` using `forwardRef`.
3. Implemented required methods: `writeValue`, `registerOnChange`, `registerOnTouched`, and `setDisabledState`.
4. Ensured internal value changes trigger both `onChange()` and `onTouched()`.

## Issue 10: Component Style Budget Violations
**Problem**: The Angular build fails with `exceeded maximum budget` errors for component-level CSS files.
**Error Log**:
```
X [ERROR] src/stories/select/select/ft.select.component.css exceeded maximum budget. Budget 8.00 kB was not met by 5.35 kB with a total of 13.35 kB.
```
**Diagnosis**: The library's premium components use rich Tailwind-generated styles and custom properties that naturally exceed the default conservative budgets (4kB warning / 8kB error) of the `@angular-devkit/build-angular:application` builder.
**Resolution**:
1. Updated `angular.json` to increase the `anyComponentStyle` budget.
**Action**:
- Changed `maximumWarning` to `20kB`.
- Changed `maximumError` to `30kB`.

## Issue 11: Missing `FormControl` Initializations
**Problem**: After refactoring, refreshing the page results in `Error: Cannot find control with name: 'placeOfBirth'`.
**Diagnosis**: The HTML template used `formControlName="placeOfBirth"` and `formControlName="employer"`, but these keys were not present in the `FormGroup` initialization within the TypeScript component.
**Resolution**:
1. Audited the template for all `formControlName` attributes.
2. Verified their presence in the `initPatientForm()` method in `patient-add.component.ts`.
3. Added missing keys `placeOfBirth` and `employer` to the `fb.group` configuration.

## Verification Workflow
The following sequence was used to confirm the fixes:
1. `npm run build`: Verified that the application compiles successfully (Exit code: 0).
2. Console Audit: Verified no `NG01203` or `Cannot find control` errors appear on page refresh.
3. Form Integrity: Confirmed that form values for newly added controls sync correctly with the component logic.
