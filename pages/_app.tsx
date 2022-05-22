import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { NextUIProvider } from '@nextui-org/react';
import { darkTheme } from '../themes';

function MyApp({ Component, pageProps }: AppProps) {
  return( 
    //Le inyectamos el tema darktheme
    <NextUIProvider theme={ darkTheme }> 
      <Component {...pageProps} />
    </NextUIProvider>
  )
}

export default MyApp
