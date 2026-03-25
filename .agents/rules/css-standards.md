---
trigger: always_on
---

# CSS Variable Enforcement

- **Reference File:** @variables.css
- **Rule:** When writing or updating CSS/SCSS, you are strictly forbidden from hardcoding hex codes, RGB, or HSL values. 
- **Constraint:** Use ONLY the CSS variables defined in @variables.css. 
- **Action:** If a required color or spacing unit is missing from @variables.css, ASK_USER for permission to add it to that file first rather than using a raw value in the component style.