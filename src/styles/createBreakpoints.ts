// Sorted ASC by size. That's important.
// It can't be configured as it's used statically for propTypes.
export const keys = ['xs', 'sm', 'md', 'lg', 'xl'];

// Keep in mind that @media is inclusive by the CSS specification.
export default function createBreakpoints(breakpoints: any = {}) {
  const {
    // The breakpoint **start** at this value.
    // For instance with the first breakpoint xs: [xs, sm[.
    values = {
      xs: 480,
      sm: 768,
      md: 992,
      lg: 1200,
      xl: 1400,
    },
    unit = 'px',
    step = 5,
  } = breakpoints;

  function up(key: any) {
    const value = typeof values[key] === 'number' ? values[key] : key;
    return `@media (min-width:${value}${unit})`;
  }

  function down(key: any) {
    const endIndex = keys.indexOf(key) + 1;
    const upperbound = values[keys[endIndex]];

    if (endIndex === keys.length) {
      // xl down applies to all sizes
      return up('xs');
    }

    const value = typeof upperbound === 'number' && endIndex > 0 ? upperbound : key;
    return `@media (max-width:${value - step / 100}${unit})`;
  }

  function between(start: any, end: any) {
    const endIndex = keys.indexOf(end);

    if (endIndex === keys.length - 1) {
      return up(start);
    }

    return (
      `@media (min-width:${typeof values[start] === 'number' ? values[start] : start}${unit}) and ` +
      `(max-width:${(endIndex !== -1 && typeof values[keys[endIndex + 1]] === 'number'
        ? values[keys[endIndex + 1]]
        : end) -
        step / 100}${unit})`
    );
  }

  function only(key: any) {
    return between(key, key);
  }

  function width(key: any) {
    return values[key];
  }

  return {
    keys,
    values,
    up,
    down,
    between,
    only,
    width,
  };
}
