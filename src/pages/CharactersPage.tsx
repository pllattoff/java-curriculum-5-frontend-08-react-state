import {useState} from "react";
import CharacterGallery from "../components/CharacterGallery.tsx";
import {Character} from "../data/types.ts";
import SearchBar from "../components/SearchBar.tsx";

type CharactersPageProps = {
    characters: Character[];
    reload: boolean;
    setReload: (reload: boolean) => void;
}

export default function CharactersPage(props: Readonly<CharactersPageProps>) {
    const [searchText, setSearchText] = useState("");

    const filteredCharacters = props.characters
        .filter((character) => character.name.toLowerCase().includes(searchText.toLowerCase()));

    return (
        <>
            <SearchBar setSearchText={setSearchText}/>

            {
                filteredCharacters.length > 0
                    ? <CharacterGallery
                        characters={filteredCharacters}
                    />
                    : <p>No characters found</p>
            }

            <button onClick={() => props.setReload(!props.reload)} style={{margin:'10px'}}>
                Reload Characters
            </button>
        </>
    )
}