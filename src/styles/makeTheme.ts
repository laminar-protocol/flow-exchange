import createBreakpoints from './createBreakpoints';

type themeMode = 'light' | 'dark';

declare module 'react-jss' {
  interface DefaultTheme extends AppTheme {}
}

interface AppTheme {
  backgroundColor: string;
  backgroundHoverColor: string;
  lightBackgroundColor: string;
  sideBarColor: string;
  // Border colors
  darkBorderColor: string;
  borderColor: string;
  separatorColor: string;
  segmentControlBackgroundColor: string;
  // Theme colors
  keyColorBlue: string;
  keyColorRed: string;
  keyColorGrey: string;
  // Text colors
  foregroundColor: string;
  lightForegroundColor: string;
  fadeForegroundColor: string;
  whiteForegroundColor: string;
  alwaysWhiteForegroundColor: string;
  noticeForegroundColor: string;
  errorForegroundColor: string;
  // Button
  sellColor: string;
  buyColor: string;
  // Side bar
  sideBarWidth: string;
  // Font weight
  lightWeight: number;
  normalWeight: number;
  boldWeight: number;
  blackWeight: number;
  // Font size
  textNormalSize: string;
  textSmallSize: string;
  textLargeSize: string;
  textTitleSize: string;
  textHeaderSize: string;
  // Indicator
  indicatorGreenColor: string;
  indicatorYellowColor: string;
  indicatorGrayColor: string;
  breakpoints: ReturnType<typeof createBreakpoints>;

  // style
  linearGradientBorder: Record<string, string>;
  linearGradientRadiusBorder: Record<string, string>;

  textColor: {
    greyColor1: string;
    greyColor2: string;
    greyColor3: string;
    greyColor4: string;
  };

  flexCenter: any;
}

const switchMode = (mode: themeMode, value: { light: string; dark: string }) => value[mode];

const makeTheme = ({ mode }: { mode: themeMode }): AppTheme => ({
  // Background colors

  backgroundColor: switchMode(mode, {
    light: '#f8f9fd',
    dark: '#21212e',
  }),

  backgroundHoverColor: switchMode(mode, {
    light: '#f2f5f7',
    dark: '#21212e',
  }),

  lightBackgroundColor: switchMode(mode, {
    light: '#fff',
    dark: '#16161f',
  }),

  sideBarColor: switchMode(mode, {
    light: '#eee',
    dark: '#000',
  }),

  // Border colors
  darkBorderColor: switchMode(mode, {
    light: '#ebeef5',
    dark: 'rgba(255, 255, 255, 0.20)',
  }),

  borderColor: switchMode(mode, {
    light: '#e6e6eb',
    dark: 'rgba(255, 255, 255, 0.10)',
  }),

  separatorColor: switchMode(mode, {
    light: '#e6e6eb',
    dark: 'rgba(255, 255, 255, 0.10)',
  }),

  segmentControlBackgroundColor: switchMode(mode, {
    light: 'rgba(0, 0, 0, 0.025)',
    dark: 'rgba(255, 255, 255, 0.05)',
  }),

  // Theme colors
  keyColorBlue: switchMode(mode, {
    light: '#0155ff',
    dark: '#0155ff',
  }),

  keyColorRed: switchMode(mode, {
    light: 'rgba(255,0,0,1)',
    dark: 'rgba(255,0,0,1)',
  }),

  keyColorGrey: switchMode(mode, {
    light: '#ecf0f2',
    dark: 'rgba(255, 255, 255, 0.20)',
  }),

  // Text colors
  foregroundColor: switchMode(mode, {
    light: '#3c3d61',
    dark: 'rgba(255, 255, 255, 0.85)',
  }),

  lightForegroundColor: switchMode(mode, {
    light: '#797a93',
    dark: 'rgba(255, 255, 255, 0.65)',
  }),

  fadeForegroundColor: switchMode(mode, {
    light: '#e6e6eb',
    dark: 'rgba(255, 255, 255, 0.35)',
  }),

  whiteForegroundColor: switchMode(mode, {
    light: '#fff',
    dark: 'rgba(255, 255, 255, 0.05)',
  }),

  alwaysWhiteForegroundColor: switchMode(mode, {
    light: '#fff',
    dark: 'rgba(255, 255, 255, 0.65)',
  }),

  noticeForegroundColor: switchMode(mode, {
    light: '#f80',
    dark: 'rgba(255, 138, 0, 0.75)',
  }),

  errorForegroundColor: switchMode(mode, {
    light: '#c00',
    dark: 'rgba(255, 0, 0, 1)',
  }),

  // Button
  sellColor: switchMode(mode, {
    light: '#c00',
    dark: 'rgba(255, 0, 0, 0.5)',
  }),

  buyColor: switchMode(mode, {
    light: '#090',
    dark: 'rgba(0, 128, 0, 0.5)',
  }),

  // Side bar
  sideBarWidth: '16.875rem',

  // Font weight
  lightWeight: 150,
  normalWeight: 400,
  boldWeight: 500,
  blackWeight: 900,

  // Font size
  textNormalSize: '1rem',
  textSmallSize: '0.75rem',
  textLargeSize: '1.25rem',
  textTitleSize: '1.5rem',
  textHeaderSize: '2rem',

  // Indicator
  indicatorGreenColor: switchMode(mode, {
    light: '#00cc00',
    dark: '#00cc00',
  }),

  indicatorYellowColor: switchMode(mode, {
    light: '#ffcc00',
    dark: '#ffcc00',
  }),

  indicatorGrayColor: switchMode(mode, {
    light: '#aaa',
    dark: '#aaa',
  }),

  breakpoints: createBreakpoints(),

  linearGradientBorder: {
    borderImageSource: 'linear-gradient(to bottom, #004fff, #fe0000)',
    borderImageSlice: '1',
  },

  textColor: {
    greyColor1: '#212121',
    greyColor2: '#333333',
    greyColor3: '#666666',
    greyColor4: '#999999',
  },

  linearGradientRadiusBorder: {
    'border-style': 'solid',
    'border-width': '1px',
    'border-image-source': 'linear-gradient(to right, #004eff, #fa0000)',
    'border-image-slice': '1',
    'background-image': 'linear-gradient(to bottom, #ffffff, #ffffff), linear-gradient(to right, #004eff, #fa0000)',
    'background-origin': 'border-box',
    'background-clip': 'content-box, border-box',
  },

  flexCenter: {
    'justify-content': 'center',
    'align-items': 'center',
    display: 'flex',
  },
});

export default makeTheme;
