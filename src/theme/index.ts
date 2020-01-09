import theme from 'styled-theming';
import breakpoint from './breakpoint';

// Responsive breakpoint
export const respondTo = breakpoint;

// Background colors
export const backgroundColor = theme('mode', {
  light: '#f5f5fa',
  dark: '#21212e',
});

export const lightBackgroundColor = theme('mode', {
  light: '#fff',
  dark: '#16161f',
});

export const sideBarColor = theme('mode', {
  light: '#eee',
  dark: '#000',
});

// Border colors
export const darkBorderColor = theme('mode', {
  light: '#c6c6cb',
  dark: 'rgba(255, 255, 255, 0.20)',
});

export const borderColor = theme('mode', {
  light: '#e6e6eb',
  dark: 'rgba(255, 255, 255, 0.10)',
});

export const separatorColor = theme('mode', {
  light: '#e6e6eb',
  dark: 'rgba(255, 255, 255, 0.10)',
});

export const segmentControlBackgroundColor = theme('mode', {
  light: 'rgba(0, 0, 0, 0.025)',
  dark: 'rgba(255, 255, 255, 0.05)',
});

// Theme colors
export const keyColorBlue = theme('mode', {
  light: 'rgba(0,85,255,1)',
  dark: 'rgba(0,85,255,1)',
});

export const keyColorRed = theme('mode', {
  light: 'rgba(255,0,0,1)',
  dark: 'rgba(255,0,0,1)',
});

// Text colors
export const foregroundColor = theme('mode', {
  light: '#3c3d61',
  dark: 'rgba(255, 255, 255, 0.85)',
});

export const lightForegroundColor = theme('mode', {
  light: '#797a93',
  dark: 'rgba(255, 255, 255, 0.65)',
});

export const fadeForegroundColor = theme('mode', {
  light: '#e6e6eb',
  dark: 'rgba(255, 255, 255, 0.35)',
});

export const whiteForegroundColor = theme('mode', {
  light: '#fff',
  dark: 'rgba(255, 255, 255, 0.05)',
});

export const alwaysWhiteForegroundColor = theme('mode', {
  light: '#fff',
  dark: 'rgba(255, 255, 255, 0.65)',
});

export const noticeForegroundColor = theme('mode', {
  light: '#f80',
  dark: 'rgba(255, 138, 0, 0.75)',
});

export const errorForegroundColor = theme('mode', {
  light: '#c00',
  dark: 'rgba(255, 0, 0, 1)',
});

// Button
export const sellColor = theme('mode', {
  light: '#c00',
  dark: 'rgba(255, 0, 0, 0.5)',
});

export const buyColor = theme('mode', {
  light: '#090',
  dark: 'rgba(0, 128, 0, 0.5)',
});

// Side bar
export const sideBarWidth = 300;

// Font weight
export const lightWeight = 150;
export const normalWeight = 300;
export const boldWeight = 600;
export const blackWeight = 900;

// Font size
export const textNormalSize = '1rem';
export const textSmallSize = '0.8rem';
export const textLargeSize = '1.25rem';
export const textTitleSize = '1.5rem';
export const textHeaderSize = '2rem';

// Indicator
export const indicatorGreenColor = theme('mode', {
  light: '#00cc00',
  dark: '#00cc00',
});

export const indicatorYellowColor = theme('mode', {
  light: '#ffcc00',
  dark: '#ffcc00',
});

export const indicatorGrayColor = theme('mode', {
  light: '#aaa',
  dark: '#aaa',
});
