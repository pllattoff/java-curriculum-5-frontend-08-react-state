import {FormEvent, useState} from "react";
import {Character} from "../data/types.ts";
import {useNavigate} from "react-router-dom";

type NewCharacterPageProps = {
    characters: Character[];
    addCharacter: (newCharacter: Character) => void;
}

export default function NewCharacterPage(props: Readonly<NewCharacterPageProps>) {

    const [name, setName] = useState<string>("");
    const [species, setSpecies] = useState<string>("");
    const [status, setStatus] = useState<string>("");
    const [image, setImage] = useState<string>("");

    const navigate = useNavigate();

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const newCharacter: Character = {
            id: generateId(),
            name,
            species,
            status,
            type: "",
            gender: "",
            origin: {
                name: "Unknown",
                url: ""
            },
            location: {
                name: "Unknown",
                url: ""
            },
            image,
            episode: [],
            url: "",
            created: new Date().toISOString()
        };

        props.addCharacter(newCharacter);
        navigate(`/characters/${newCharacter.id}`);
    }

    function generateId():number {
        if (props.characters.length === 0) return 1;

        return Math.max(
            ...props.characters.map(character => character.id)
        ) + 1;
    }

    return(
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input
                    type="text"
                    onChange={e => setName(e.target.value)}
                    value={name}
                    placeholder="Enter name..."
                />
            </label>

            <label>
                Species:
                <input
                    type="text"
                    onChange={e => setSpecies(e.target.value)}
                    value={species}
                    placeholder="Enter species..."
                />
            </label>

            <label>
                Status:
                <input
                    type="text"
                    onChange={e => setStatus(e.target.value)}
                    value={status}
                    placeholder="Enter status..."
                />
            </label>

            <label>
                Image:
                <input
                    type="text"
                    onChange={e => setImage(e.target.value)}
                    value={image}
                    placeholder="Enter the link to the image..."
                />
            </label>

            <button type="submit">
                Hinzufügen
            </button>
        </form>
    )
}