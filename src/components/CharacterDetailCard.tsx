import {useParams} from "react-router-dom";
import {Character} from "../data/types.ts";
import "../styles/CharacterDetailCard.css";

type CharacterDetailCardProps = {
    characters: Character[]
}

export default function CharacterDetailCard(props: Readonly<CharacterDetailCardProps>) {

    const param = useParams();

    const foundCharacter = props.characters.find(
        character => character.id === Number(param.id)
    );

    if (!foundCharacter) {
        return <p>Character not found</p>;
    }

    return (
        <div className="character-detail-card">
            <img
                src={foundCharacter.image}
                alt={foundCharacter.name}
            />

            <div className="character-detail-info">
                <h1>{foundCharacter.name}</h1>

                <p><strong>Id:</strong> {foundCharacter.id}</p>
                <p><strong>Status:</strong> {foundCharacter.status}</p>
                <p><strong>Species:</strong> {foundCharacter.species}</p>
                <p><strong>Type:</strong> {foundCharacter.type || "Unknown"}</p>
                <p><strong>Gender:</strong> {foundCharacter.gender}</p>

                <p>
                    <strong>Origin:</strong> {foundCharacter.origin.name}
                </p>

                <p>
                    <strong>Location:</strong> {foundCharacter.location.name}
                </p>

                <p>
                    <strong>Episodes:</strong> {foundCharacter.episode.length}
                </p>
            </div>
        </div>
    );
}