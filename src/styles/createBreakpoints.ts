// Sorted ASC by size. That's important.
// It can't be configured as it's used statically for propTypes.
export const keys = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

type Key = typeof keys[number];

// Keep in mind that @media is inclusive by the CSS specification.
export default function createBreakpoints(
  breakpoints: {
    values?: Record<Key, number>;
    unit?: 'px' | 'rem';
    step?: number;
  } = {},
) {
  const {
    // The breakpoint **start** at this value.
    // For instance with the first breakpoint xs: [xs, sm[.
    values = {
      xs: 768,
      sm: 1024,
      md: 1280,
      lg: 1440,
      xl: 1400,
    },
    unit = 'px',
    step = 5,
  } = breakpoints;

  function up(key: Key | number): any {
    const value = typeof values[key as Key] === 'number' ? values[key as Key] : (key as number);
    return `@media (min-width:${value + step / 100}${unit})`;
  }

  function down(key: Key): any {
    const endIndex = keys.indexOf(key);
    const upperbound = values[keys[endIndex]];

    if (endIndex === keys.length) {
      // xl down applies to all sizes
      return up('xs');
    }

    const value = typeof upperbound === 'number' && endIndex > 0 ? upperbound : key;
    return `@media (max-width:${value}${unit})`;
  }

  function between(start: Key, end: Key): any {
    const endIndex = keys.indexOf(end);

    if (endIndex === keys.length - 1) {
      return up(start);
    }

    return (
      `@media (min-width:${
        typeof values[start as Key] === 'number' ? values[start as Key] + step / 100 : start
      }${unit}) and ` +
      `(max-width:${
        endIndex !== -1 && typeof values[keys[endIndex]] === 'number' ? values[keys[endIndex]] : end
      }${unit})`
    );
  }

  function only(key: Key): any {
    return between(key, key);
  }

  function width(key: Key): any {
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
