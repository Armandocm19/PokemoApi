import { Grid, Card, Button, Container, Text, Image } from "@nextui-org/react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import  confetti from 'canvas-confetti'
import { useState, useEffect } from "react";
import { Layout } from "../../components/layouts";
import { PokemonFull } from "../../interfaces";
import { getPokemonInfo, localFavorites } from "../../utils";
import { pokeApi } from "../../api";
import { PokemonListResponse} from '../../interfaces/pokemon-list';


interface Props {
    pokemon: PokemonFull; //Esta interface me permite acceder a toda la informacion que devuelve la peticion
  }
  
  const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {
  
    const [isInFavorites, setIsInFavorites] = useState( false )
  
    const onToggleFavorite = () => {
      localFavorites.toggleFavorite( pokemon.id )
      setIsInFavorites(!isInFavorites)
  
      if( !isInFavorites ){
        confetti({
          zIndex: 999,
          particleCount: 100,
          spread: 160,
          angle: -100,
          origin: {
            x: 1,
            y: 0,
          }
        })
      }
  
    }
  
    useEffect(() => {
      setIsInFavorites(localFavorites.existInFavorites(pokemon.id));
    }, [pokemon.id]);
    
    return (
      <Layout title={pokemon.name}>
          <Grid.Container css={{ marginTop: '5px' }} gap={ 2 }>
            <Grid xs={12} sm={4}>
              <Card bordered hoverable css={{ padding: '30px' }}>
                <Card.Body>
                  <Card.Image 
                    src={ pokemon.sprites.other?.dream_world.front_default || '/no-image.png' }
                    alt={ pokemon.name }
                    width={'100%'}
                    height={ 200 }
                  />
                </Card.Body>
              </Card>
            </Grid>
  
            <Grid xs={12} sm={8}>
              <Card>
                <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Text h1 transform="capitalize"> { pokemon.name } </Text>
                    <Button
                      color="gradient"
                      shadow
                      ghost={ !isInFavorites }
                      onClick={onToggleFavorite}
                    >
                        { isInFavorites ? 'En favoritos' : 'Guardar en favoritos' }
                    </Button>
                </Card.Header>
  
                <Card.Body>
                    <Text size={30}>Sprites:</Text>
  
                    <Container direction='row' display="flex" justify="space-between">
  
                      <Image 
                        src={pokemon.sprites.front_default}
                        alt={ pokemon.name }
                        width={100}
                        height={100}
                      />
  
                      <Image 
                        src={pokemon.sprites.back_default}
                        alt={ pokemon.name }
                        width={100}
                        height={100}
                      />
  
                      <Image 
                        src={pokemon.sprites.front_shiny}
                        alt={ pokemon.name }
                        width={100}
                        height={100}
                      />
  
                      <Image 
                        src={pokemon.sprites.back_shiny}
                        alt={ pokemon.name }
                        width={100}
                        height={100}
                      />
  
                    </Container>
                </Card.Body>
  
              </Card>
            </Grid>
  
          </Grid.Container>
      </Layout>
    )
  }

  export const getStaticPaths: GetStaticPaths = async (ctx) => {

    const { data } = await pokeApi.get<PokemonListResponse>(`/pokemon?limit=151`)
    const pokeName: string[] = data.results.map( pokemon => pokemon.name )
  
    return {
      paths:pokeName.map( name => ({
        params: { name }
      })),
      fallback: false //Indicamos que si trata de ingresar a un url que no está entre los paths, o sea no está previamente renderizado, entonces que tire un 404
    }
  }

  
export const getStaticProps: GetStaticProps = async ({params}) => { //esta funcion solo se ejecuta del lado del servidor
  
  const { name } = params as { name: string }

  return {
    props: { //Estas props son las que le llegan a la funcion de arriba
      pokemon: await getPokemonInfo(name)
    }
  }
}

export default PokemonByNamePage

  
  