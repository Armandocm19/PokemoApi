import { FC } from "react"
import { SmallPokemon } from "../../interfaces"
import { Card, Grid, Row, Text } from '@nextui-org/react';
import { useRouter } from "next/router";

interface Props {
    pokemon: SmallPokemon
}

export const PokemonCard: FC<Props> = ({ pokemon}) => {
 
    const router = useRouter()

    const onClick = () => {
        router.push(`/name/${name}`)
    }

    const { id, name, img } = pokemon

    return (
    <Grid xs={6} sm={3} md={2} xl={1}>
        <Card 
            hoverable 
            clickable
            onClick={onClick}
        >
        {/* hoverable = puede poner el mause encima, y clickable = puede hacer click sobre ella */}
        <Card.Body css={{ p: 10 }}>
            <Card.Image 
                src={img}
                width="100%"
                height={ 140 }
            />
        </Card.Body>
            <Card.Footer>
                <Row justify='space-between'>
                <Text transform='capitalize'>{ name }</Text>
                {/* transform='capitalize' hace que empiece con mayuscula el texto si no lo está por ejemplo */}
                <Text>#{ id }</Text>
                </Row>
            </Card.Footer>
        </Card>
    </Grid>
  )
}
