import { NavigateFunction } from 'react-router-dom';
import { i18n, Locale } from '../../lib/i18n';
import getLocale from './getLocale';
import { Location } from 'react-router-dom';

export function middleware(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  location: Location<any>,
  setCurrentLanguage: React.Dispatch<React.SetStateAction<Locale>>,
  navigate: NavigateFunction,
  isLogged: boolean,
) {
  const pathname = location.pathname;
  const search = location.search;
  // Verifique se há alguma localidade suportada no nome do caminho
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  const isLoginPage = pathname.split('/')[2];
  if (isLoginPage === 'login') {
    const locale = pathname.split('/')[1];
    return navigate(`/${locale}/login`);
  }

  // Verifique se a rota começa com `/imgs`, se for, retorne a resposta atual
  // if (pathname.startsWith('/imgs') || pathname.startsWith('/api')) {
  //   return NextResponse.next();
  // }

  // NextResponse.redirect(new URL('/home', request.url));
  // Redirecionar se não houver localidade
  if (pathnameIsMissingLocale) {
    const locale = getLocale().split('-')[0];

    let thereIs: boolean = false;

    if (i18n.locales.includes(locale as Locale)) {
      thereIs = true;
    }

    if (!thereIs) {
      // verifica se o usuário tentou manipular a rota em prol de uma language especifica, corrigindo o erro se o idioma do dispositivo for o mesmo da do erro...
      const paths = pathname.split('/');

      const pathsOk = paths.filter((e) => e !== locale);
      const newPath = pathsOk.join('/');
      setCurrentLanguage('en');
      return navigate(
        `${'en'}${newPath.startsWith('/') ? '' : '/'}${newPath}${search}`,
      );
    }
    setCurrentLanguage(locale as Locale);
    return navigate(
      `${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}${search}`,
    );
  } else {
    const locale = pathname.split('/')[1];
    // console.log('lc', locale);
    setCurrentLanguage(locale as Locale);
  }

  if (pathname.match(/^\/[a-z]{2}\/?$/)) {
    // Verificar se a rota é `/:locale/
    if (!isLogged && !search.includes('guest')) {
      // redireciona para /login se não estiver logado
      const locale = pathname.split('/')[1];
      return navigate(`/${locale}/login`);
    }
  }
}
