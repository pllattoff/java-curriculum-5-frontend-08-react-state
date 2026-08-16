import {Character} from "../data/types.ts";
import "../styles/CharacterCard.css";
import {useNavigate} from "react-router-dom";

type CharacterCardProps = {
    character: Character;
}

export default function CharacterCard(props: Readonly<CharacterCardProps>) {
    const navigate = useNavigate();

    return (
        <div
            className="character-card"
            onClick={() => navigate(`/characters/${props.character.id}`)}
        >
            <img
                src={props.character.image}
                alt={props.character.name}
            />
            <div className="character-card-info">
                <h3>{props.character.name}</h3>
                <p>Species: {props.character.species}</p>
                <p>Status: {props.character.status}</p>
            </div>
        </div>
    );
}
