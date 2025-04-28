import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';

export const FTThemePreset = definePreset(Aura, {
  //Your customizations, see the following sections for examples
  semantic: {
    colorScheme: {
      root: {
        formField: {
          hoverBorderColor: '{primary.color}'
        },
        inputtext: {
          filled: {
            background: 'green'
          }
        }
      },
      // light: {
      //   formField: {
      //     hoverBorderColor: '{primary.color}'
      //   },
      //   inputtext: {
      //     filled: {
      //       background: 'green'
      //     }
      //   }
      // },
      dark: {
        formField: {
          hoverBorderColor: '{primary.color}'
        },
        inputtext: {
          filled: {
            background: 'red'
          }
        }
      }
    }
  },

  // Define color scheme specific tokens or component styles
  // colorScheme: {
  //   light: {
  //     components: {
  //       inputtext: {
  //         filled: {
  //           background: 'red' // Example light mode background using a surface token
  //         }
  //       }
  //     }
  //   },
  //   dark: {
  //     components: {
  //       inputtext: {
  //         filled: {
  //           background: 'green' // Example dark mode background using a darker surface token
  //         }
  //       }
  //     }
  //   }
  // },

    // components: {
    //   inputtext: {
    //     borderRadius: '800px' // Your custom border radius
    //   }
    // }

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
