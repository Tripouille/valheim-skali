import React from 'react';
import { Global } from '@emotion/react';

const Fonts = () => (
  <Global
    styles={`
      /* latin */
      @font-face {
        font-family: 'Norse';
        src: url("/fonts/Norse.otf");
      }
      `}
  />
);

export default Fonts;
