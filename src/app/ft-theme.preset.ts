import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';

export const FTThemePreset = definePreset(Aura, {
  //Your customizations, see the following sections for examples
  tokens: { // Or a similar top-level key for custom tokens
    mauve: {
      50: "#F2EEFB",
      100: "#E1DAF7",
      200: "#C3B4EE",
      300: "#A48FE6",
      400: "#8669DD",
      500: "#6946D5",
      600: "#4D2AB7",
      700: "#3A1F89",
      800: "#26155B",
      900: "#130A2E",
      950: "#0A0619"
    }
  },
  semantic: {
    primary: {
      50: "#F2EEFB",
      100: "#E1DAF7",
      200: "#C3B4EE",
      300: "#A48FE6",
      400: "#8669DD",
      500: "#6946D5",
      600: "#4D2AB7",
      700: "#3A1F89",
      800: "#26155B",
      900: "#130A2E",
      950: "#0A0619"
    },
    colorScheme: {
      root: {
        // toggleswitch: {
        //   checked: {
        //     background: 'red',
        //   }
        // },
        // overlay: {
        //   modal: {
        //     background: 'transparent',
        //   }
        // },
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
        //   },
        //   color: 'var(--ft-color-text-primary)',
        //   icon: {
        //     color: 'var(--ft-color-text-primary)',
        //   },
        //   float: {
        //     label: {
        //       color: 'var(--ft-color-text-secondary)',
        //       focus: {
        //         color: 'var(--ft-color-text-tertairy)',
        //       },
        //       active: {
        //         color: 'var(--ft-color-text-tertairy)',
        //       }
        //     },
        //   },
        //   padding: {
        //     x: 'var(--ft-spacing-md)',
        //     y: 'var(--ft-spacing-sm)',
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
        //   },
        //   color: 'red',
        // },
      },
      light: {
        // surface: {
        //   0: '#ffffff',
        //   50: '{neutral.50}',
        //   100: '{neutral.100}',
        //   200: '{neutral.200}',
        //   300: '{neutral.300}',
        //   400: '{neutral.400}',
        //   500: '{neutral.500}',
        //   600: '{neutral.600}',
        //   700: '{neutral.700}',
        //   800: '{neutral.800}',
        //   900: '{neutral.900}',
        //   950: '{neutral.950}'
        // }
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

    togglswitch: { // Target the ToggleSwitch component
      // root: {
        // Default background for unchecked state can be set here if needed
        // background: '{surface.400}',

        // // Define styles for the checked state
        // checked: { // Use _checked to target the checked state
        //   background: 'red' // Set the background when checked (e.g., to your primary color)
        //   // Or use a specific color value:
        //   // background: '#007bff'
        // }
        // height: '16px',
      // }
      // You might also be able to target the slider specifically if needed,
      // but often the background is applied to the root in the checked state.
      // slider: {
      //   _checked: {
      //      background: '{primary.500}'
      //   }
      // }
    },
    // overlay: {
    //   modal: {
    //     padding: 'var(--ft-spacing-md)',
    //     color: 'var(--ft-color-text-primary)',
    //   }
    // },
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
        // title: {
        //   fontSize: 'var(--text-base)',
        //   fontWeight: 'var(--font-weight-normal)',
        //   // color: 'var(--ft-color-text-primary)',
        // }
      // }
    },
    // select: {
    //   root: {
    //     borderRadius: 'var(--radius-xl)',
    //   }
    // },
    // textarea: {
    //   root: {
    //     borderRadius: 'var(--radius-xl)',
    //   }
    // },
    button: {
    //   root: {
    //     borderRadius: 'var(--radius-lg)',
    //     sm: {
    //       padding: {
    //         x: 'var(--ft-spacing-md)',
    //       },
    //       fontSize: 'var(--ft-text-xs)',
    //     }
    //   }
    },
    // formField: {
    //   root: {
    //     borderRadius: 'var(--radius-xl)',
    //   },
    // },
    // inputtext: {
    //   root: {
    //     borderRadius: 'var(--radius-xl)', // Example: Using a semantic token
    //     // Or a specific value:
    //     // borderRadius: '10px'
    //   },
    // }
  }


});
