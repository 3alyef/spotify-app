export default function getLocale(): string {
  const userLanguage = navigator.language || navigator.languages[0];
  // console.log('locale: ', userLanguage); // Por exemplo: 'en-US' ou 'pt-BR'
  return userLanguage; // example: pt-BR
}
