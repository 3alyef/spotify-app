export interface ThemeContract {
  themeId: number;
  primaryColor: string;
  mainColor: string;
  secondaryColor: string;
  tertiaryColor: string;
  headerBgColor: string;
  textColor: {
    defaultWhite: string;
    primaryColor: string;
    secondaryColor: string;
  };
}

export const darkTheme: ThemeContract = {
  themeId: 1,
  primaryColor: '#1DB954',
  mainColor: '#121212',
  secondaryColor: '#191414',
  tertiaryColor: '',
  headerBgColor: '',
  textColor: {
    defaultWhite: '#fff',
    primaryColor: '#fff',
    secondaryColor: '#B3B3B3',
  },
};

export const lightTheme: ThemeContract = {
  themeId: 2,
  primaryColor: '#1DB954',
  mainColor: '#fff',
  secondaryColor: '#191414',
  tertiaryColor: '',
  headerBgColor: '',
  textColor: {
    defaultWhite: '#fff',
    primaryColor: '#fff',
    secondaryColor: '#B3B3B3',
  },
};
