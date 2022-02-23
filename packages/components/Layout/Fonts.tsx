import React from 'react';
import { Global } from '@emotion/react';

const Fonts = () => (
  <Global
    styles={`
    @font-face {
      font-family: 'Norse';
      src: url('/fonts/Norse.otf'), local('Candara'), local('Arial'), local('sans-serif');
    }
    `}
  />
);

export default Fonts;
