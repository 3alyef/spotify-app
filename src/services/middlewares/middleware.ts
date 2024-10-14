import { NavigateFunction } from 'react-router-dom';
import { i18n } from '../../lib/i18n';
import getLocale from './getLocale';

export function middleware(
  pathname: string,
  setCurrentLanguage: React.Dispatch<React.SetStateAction<string>>,
  navigate: NavigateFunction,
) {
  // Verifique se há alguma localidade suportada no nome do caminho
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  // Verifique se a rota começa com `/imgs`, se for, retorne a resposta atual
  // if (pathname.startsWith('/imgs') || pathname.startsWith('/api')) {
  //   return NextResponse.next();
  // }

  // NextResponse.redirect(new URL('/home', request.url));
  // Redirecionar se não houver localidade
  if (pathnameIsMissingLocale) {
    const locale = getLocale();

    return navigate(
      `${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
    );

    //console.log(locale)
    // return NextResponse.redirect(
    //   new URL(
    //     `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
    //     request.url,
    //   ),
    // );
  }

  if (pathname.match(/^\/[a-z]{2}\/?$/)) {
    // Verificar se a rota é `/:locale/, se for redireciona para /login`
    const locale = pathname.split('/')[1];
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  }
}
