import {useState} from "react";
import CharacterGallery from "../components/CharacterGallery.tsx";
import {Character} from "../data/types.ts";
import axios from "axios";


type CharactersPageProps = {
    characters: Character[];
    setCharacters: (characters: Character[]) => void;
}

export default function CharactersPage(props: Readonly<CharactersPageProps>) {
    const [searchText, setSearchText] = useState("");

    const filteredCharacters = props.characters
        .filter((character) => character.name.toLowerCase().includes(searchText.toLowerCase()));

    function loadAllCharacters() {
        axios.get("https://rickandmortyapi.com/api/character")
            .then(response => props.setCharacters(response.data.results))
            .catch(error => console.log(error));
    }

    return (
        <>
            <input
                type="text"
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search for a character"
            />

            {
                filteredCharacters.length > 0
                    ? <CharacterGallery
                        characters={filteredCharacters}
                    />
                    : <p>No characters found</p>
            }

            <button onClick={loadAllCharacters}>
                Load Characters
            </button>
        </>
    )
}