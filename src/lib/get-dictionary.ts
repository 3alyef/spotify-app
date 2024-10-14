import { Locale } from './i18n';

const dictionaries = {
  en: () => import('../locale/en.json').then((module) => module.default),
  pt: () => import('../locale/pt.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
