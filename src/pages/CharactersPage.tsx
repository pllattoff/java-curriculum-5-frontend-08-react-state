import {useState} from "react";
import CharacterGallery from "../components/CharacterGallery.tsx";
import {Character} from "../data/types.ts";

type CharactersPageProps = {
    characters: Character[];
}

export default function CharactersPage(props: Readonly<CharactersPageProps>) {
    const [searchText, setSearchText] = useState("");

    const filteredCharacters = props.characters
        .filter((character) => character.name.toLowerCase().includes(searchText.toLowerCase()));

    return (
        <>
            <input
                type="text"
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search for a character"
            />
            {
                filteredCharacters.length > 0
                    ? <CharacterGallery characters={filteredCharacters}/>
                    : <p>No characters found</p>
            }
        </>
    )
}