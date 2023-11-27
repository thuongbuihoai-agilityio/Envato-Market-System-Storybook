// Libs
import { extendTheme } from '@chakra-ui/react';

// colors
import { colors } from './bases/colors';

// Metrics
import { radii, space, sizes } from './bases/metric';

// Bases theme
import {
  fonts,
  fontSizes,
  fontWeights,
  lineHeights,
  letterSpacings,
} from './bases';

// Components
import { Button, Text, Heading } from './components';

export const configThemes = {
  ...extendTheme({
    semanticTokens: {
      radii,
      space,
      fonts,
      fontSizes,
      fontWeights,
      lineHeights,
      letterSpacings,
      colors,
      sizes,
    },
    components: {
      Text,
      Button,
      Heading,
    },
  }),
  styles: {
    global: {
      'html, body': {
        fontFamily: 'primary',
      },
    },
  },
  initialColorMode: 'system',
  useSystemColorMode: true,
};
