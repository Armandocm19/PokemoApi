import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import { CssBaseline } from '@nextui-org/react'; //componente de nextui que basicamente hacer que la pagina se observe igual en todos los navegadores

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const originalRenderPage = ctx.renderPage

    // Ejecute la lógica de renderizado de React de forma síncrona
    ctx.renderPage = () =>
      originalRenderPage({
        // Útil para envolver todo el árbol de reacción.
        enhanceApp: (App) => App,
        // Útil para envolver por página
        enhanceComponent: (Component) => Component,
      })

    // Ejecute el padre `getInitialProps`, ahora incluye la `renderPage` personalizada
    const initialProps = await Document.getInitialProps(ctx)

    return{ ...initialProps,
        styles: initialProps.styles //tenia un error que solucioné quitandole las etiquetas
     }
  }

  render() {
    return (
      <Html lang='es'>
        <Head>
          {CssBaseline.flush()}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument