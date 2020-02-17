import { mapObjIndexed } from 'ramda';
import { css } from 'styled-components';

const breakpoints = {
  xs: '480px',
  sm: '768px',
  md: '992px',
  lg: '1200px',
  xl: '1400px',
};

export default mapObjIndexed(
  val => (...args: Parameters<typeof css>) => css`
    @media (max-width: ${val}) {
      ${css(...args)};
    }
  `,
  breakpoints,
);
