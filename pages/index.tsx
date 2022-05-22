import { Grid} from '@nextui-org/react';
import { NextPage, GetStaticProps } from 'next'
import { pokeApi } from '../api'
import { Layout } from '../components/layouts'
import { PokemonCard } from '../components/pokemon';
import { PokemonListResponse, SmallPokemon } from '../interfaces'

interface Props {
  pokemons: SmallPokemon[]
}

const HomePage: NextPage<Props> = ({ pokemons }) => {

  return (
    <Layout title='Listado de Pokemons'>
       <Grid.Container gap={2} justify='flex-start'>
        {
          pokemons.map(( pokemonItem ) => (
            <PokemonCard key={ pokemonItem.id } pokemon={ pokemonItem } />
          ))
        }
       </Grid.Container>
    </Layout>
  )
}

// Debería usar getStaticProps cuando:
//- Los datos necesarios para representar la página están disponibles en el momento de la compilación antes de la solicitud del usuario.
//- Los datos provienen de un CMS sin cabeza.
//- Los datos se pueden almacenar en caché públicamente (no específicos del usuario).
//- La página debe estar renderizada previamente (para SEO) y ser muy rápida: getStaticProps genera archivos HTML y JSON, los cuales pueden ser almacenados en caché por un CDN para el rendimiento.

export const getStaticProps: GetStaticProps = async (ctx) => { //esta funcion solo se ejecuta del lado del servidor
  
  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151') //es bueno definirle a la peticion qué tipo de datos va a recibir (PokemonListResponse)
  // const ulrImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${}.svg`
  const pokemons: SmallPokemon[] = data.results.map((items, index) => ({
      ...items,
      id: index + 1,
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${index + 1}.svg`
  }))

  return {
    props: { //Estas props son las que le llegan a la funcion de arriba
      pokemons
    }
  }
}

//getStaticProps se debe de utilizar de antemano solo cuando estamos seguros de los parámetros que tiene que recibir la página
//ya que yo cargo esos parámetros para que cuando yo haga el build de la aplicacion esos parámetros sean parte del HTML, no se hará ninguna peticion adicional al cliente
//Asi cuando el cliente cargue la pagina no tenga que hacer ninguna peticion o renderizacion adicional, ya que el HTML ya vendrá con los parámetros que yo le defini a la aplicacion

//Nota: Esto solo pasa cuando la aplicacion está en producción, cuando está en desarrollo getStaticProps se ejecuta cada que recarguemos la página

export default HomePage
