
import { useState, useEffect } from 'react';
import { Layout } from '../../components/layouts'
import { NoFavorites } from '../../components/ui'
import { localFavorites } from '../../utils';
import { FavoritesPokemons } from '../../components/pokemon';

const FavoritesPage = () => {

  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([])

  useEffect (() => {

    setFavoritePokemons( localFavorites.pokemons() )

  }, [])

  return (
    <Layout title='Favorites'>

      {
        favoritePokemons.length === 0 
        ? ( <NoFavorites /> ) 
        : 
        <FavoritesPokemons favoritePokemons={favoritePokemons} />
      }  

    </Layout>
  )
}

//NOTA: QUEDAMOS EN USAR LA DATA QUE TENEMOS CARGADA EN EL ESTADO 

export default FavoritesPage
