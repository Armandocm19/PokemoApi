import { pokeApi } from "../api"
import { PokemonFull } from "../interfaces"

export const getPokemonInfo = async ( nameOrId: string ) => {

    const { data } = await pokeApi.get<PokemonFull>(`/pokemon/${nameOrId}`) //es bueno definirle a la peticion qué tipo de datos va a recibir (PokemonListResponse)

    return { // Refactorizamos la data para que esta envie solo las informacion que necesitamos, y no el monton de informacion innecesaria
        id: data.id,
        name: data.name,
        sprites: data.sprites
    }

}   