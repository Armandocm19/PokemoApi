import { FC } from "react";
import Head from "next/head"
import { Navbar } from '../ui/Navbar';

type Props = {
    children: JSX.Element | JSX.Element[],
    title?: string
}

const origin = (typeof window === 'undefined') ? '' : window.location.origin

export const Layout: FC<Props> = ({ children, title }) => {

    console.log(origin)

  return (
    <>
        <Head>
            <title>{ title || "PokemonApp" }</title>
            <meta name="author" content="Armando Murillo" />
            <meta name="description" content={ `Informacion sobre el pokemon ${ title } `}/>
            
            <meta property="og:title" content={`Informacion sobre ${title}`} />
            <meta property="og:description" content={`Esta es la página sobre ${title}`} />
            <meta property="og:image" content={`${origin}/img/banner.png`} /><meta name="keywords" content= {`${ title }, pokemon, pokedex `}/> 
            {/* Ayuda para saber que palabras pueden usar en los buscadores para encontrarlas */}
        </Head>

        <Navbar />

        <main style={{
            padding: '50px 20px'
        }}>
            { children }
        </main>
    </>
  )
}
