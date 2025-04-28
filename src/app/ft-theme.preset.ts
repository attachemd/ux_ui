import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';

export const FTThemePreset = definePreset(Aura, {
  //Your customizations, see the following sections for examples
  semantic: {
    colorScheme: {
      light: {
        formField: {
          hoverBorderColor: '{primary.color}'
        }
      },
      dark: {
        formField: {
          hoverBorderColor: '{primary.color}'
        }
      }
    }
  },

    // components: {
    //   inputtext: {
    //     borderRadius: '800px' // Your custom border radius
    //   }
    // }


    variables: {

        inputtext: {
          border: {
            radius: '800px'
          }
        }

    }


});
