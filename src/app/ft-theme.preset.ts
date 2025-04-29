import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';

export const FTThemePreset = definePreset(Aura, {
  //Your customizations, see the following sections for examples
  semantic: {
    colorScheme: {
      root: {
        formField: {
          hoverBorderColor: '{primary.color}',
          filled: {
            background: 'var(--ft-color-background-tertiary)',
            hover: {
              background: 'var(--ft-color-background-quaternary)',
            },
            focus: {
              background: 'var(--ft-color-background-quaternary)',
            },
          },
          color: 'var(--ft-color-text-base)',
          float: {
            label: {
              color: 'var(--ft-color-text-base)',
              focus: {
                color: 'var(--ft-color-text-tertairy)',
              }
            },
          },
          padding: {
            x: 'var(--ft-spacing-md)',
            y: 'var(--ft-spacing-sm)',
          }
        },
        inputtext: {
          filled: {
            background: 'var(--ft-color-background-tertiary)',
            hover: {
              background: 'var(--ft-color-background-quaternary)',
            },
            focus: {
              background: 'var(--ft-color-background-quaternary)',
            },
          }
        },
      },
      dark: {
        formField: {
          hoverBorderColor: '{primary.color}',
          filled: {
            background: 'var(--ft-color-background-tertiary)',
            hover: {
              background: 'var(--ft-color-background-quaternary)',
            },
            focus: {
              background: 'var(--ft-color-background-quaternary)',
            },
          }
        },
        inputtext: {
          filled: {
            background: 'var(--ft-color-background-tertiary)',
            hover: {
              background: 'var(--ft-color-background-quaternary)',
            },
            focus: {
              background: 'var(--ft-color-background-quaternary)',
            },
          }
        }
      }
    }

  },


  // inputtext.filled.background
  components: {
    inputtext: {
      root: {
        borderRadius: 'var(--radius-xl)', // Example: Using a semantic token
        // Or a specific value:
        // borderRadius: '10px'
      },
    }
  }


});
