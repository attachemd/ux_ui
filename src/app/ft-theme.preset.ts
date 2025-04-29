import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';

export const FTThemePreset = definePreset(Aura, {
  //Your customizations, see the following sections for examples
  tokens: { // Or a similar top-level key for custom tokens
    mauve: {
      50: '#F2EFFC',  // Very light
      100: '#E6E0F9',
      200: '#D1C1F3',
      300: '#BD9EEA',
      400: '#A87EE2',
      500: '#945ED8',
      600: '#814DCF', // Close to your base color #6946d5
      700: '#6E3DB6',
      800: '#5B2D9E',
      900: '#491D85',
      950: '#370D6D'   // Very dark
    }
  },
  semantic: {
    primary: {
      50: '#F2EFFC',  // Very light
      100: '#E6E0F9',
      200: '#D1C1F3',
      300: '#BD9EEA',
      400: '#A87EE2',
      500: '#945ED8',
      600: '#814DCF', // Close to your base color #6946d5
      700: '#6E3DB6',
      800: '#5B2D9E',
      900: '#491D85',
      950: '#370D6D'   // Very dark
    },
    colorScheme: {
      root: {
        overlay: {
          modal: {
            background: 'transparent',
          }
        },
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
          color: 'var(--ft-color-text-primary)',
          icon: {
            color: 'var(--ft-color-text-primary)',
          },
          float: {
            label: {
              color: 'var(--ft-color-text-secondary)',
              focus: {
                color: 'var(--ft-color-text-tertairy)',
              },
              active: {
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
          },
          color: 'red',
        },
      },
      light: {
        surface: {
          0: '#ffffff',
          50: '{neutral.50}',
          100: '{neutral.100}',
          200: '{neutral.200}',
          300: '{neutral.300}',
          400: '{neutral.400}',
          500: '{neutral.500}',
          600: '{neutral.600}',
          700: '{neutral.700}',
          800: '{neutral.800}',
          900: '{neutral.900}',
          950: '{neutral.950}'
        }
      },
      dark: {
        // formField: {
        //   hoverBorderColor: '{primary.color}',
        //   filled: {
        //     background: 'var(--ft-color-background-tertiary)',
        //     hover: {
        //       background: 'var(--ft-color-background-quaternary)',
        //     },
        //     focus: {
        //       background: 'var(--ft-color-background-quaternary)',
        //     },
        //   }
        // },
        // inputtext: {
        //   filled: {
        //     background: 'var(--ft-color-background-tertiary)',
        //     hover: {
        //       background: 'var(--ft-color-background-quaternary)',
        //     },
        //     focus: {
        //       background: 'var(--ft-color-background-quaternary)',
        //     },
        //   }
        // }
        surface: {
          0: '#ffffff',
          50: '{neutral.50}',
          100: '{neutral.100}',
          200: '{neutral.200}',
          300: '{neutral.300}',
          400: '{neutral.400}',
          500: '{neutral.500}',
          600: '{neutral.600}',
          700: '{neutral.700}',
          800: '{neutral.800}',
          900: '{neutral.900}',
          950: '{neutral.950}'
        }
      }
    }

  },


  // inputtext.filled.background
  components: {
    overlay: {
      modal: {
        padding: 'var(--ft-spacing-md)',
        color: 'var(--ft-color-text-primary)',
      }
    },
    dialog: {
      // root: {
        // borderRadius: 'var(--radius-xl)',
        // header: {
        //   borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0',
        // },
        // content: {
        //   padding: {
        //     x: 'var(--ft-spacing-lg)',
        //     y: 'var(--ft-spacing-lg)',
        //   }
        // }
        title: {
          fontSize: 'var(--text-base)',
          fontWeight: 'var(--font-weight-normal)',
          // color: 'var(--ft-color-text-primary)',
        }
      // }
    },
    select: {
      root: {
        borderRadius: 'var(--radius-xl)',
      }
    },
    button: {
      root: {
        borderRadius: 'var(--radius-lg)',
        sm: {
          padding: {
            x: 'var(--ft-spacing-md)',
          },
          fontSize: 'var(--ft-text-xs)',
        }
      }
    },
    formField: {
      root: {
        borderRadius: 'var(--radius-xl)',
      },
    },
    inputtext: {
      root: {
        borderRadius: 'var(--radius-xl)', // Example: Using a semantic token
        // Or a specific value:
        // borderRadius: '10px'
      },
    }
  }


});
