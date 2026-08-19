import {useState} from "react";
import CharacterGallery from "../components/CharacterGallery.tsx";
import {Character} from "../data/types.ts";
import SearchBar from "../components/SearchBar.tsx";
import "../styles/CharactersPage.css"

type CharactersPageProps = {
    characters: Character[];
    page: number;
    totalPages: number;
    setPage: (page: number) => void;
    loading: boolean;
    error: boolean;
}

export default function CharactersPage(props: Readonly<CharactersPageProps>) {
    const [searchText, setSearchText] = useState("");

    const filteredCharacters = props.characters
        .filter((character) => character.name.toLowerCase().includes(searchText.toLowerCase()));

    return (
        <>
            <SearchBar setSearchText={setSearchText}/>

            {props.loading && (
                <p className="message">
                    Loading...
                </p>
            )}

            {props.error && (
                <p className="message error-message">
                    Failed to load characters
                </p>
            )}

            {!props.loading && !props.error && (filteredCharacters.length > 0
                    ? <CharacterGallery
                        characters={filteredCharacters}
                    />
                    : <p className="message">
                        No characters found
                    </p>
            )}


            {props.characters.length > 0 && props.totalPages > 0 && (
                <div className="pagination">
                    <button
                        disabled={props.page === 1}
                        onClick={() => props.setPage(props.page - 1)}
                    >
                        Previous
                    </button>

                    <span>
                        Page {props.page} of {props.totalPages}
                    </span>

                    <button
                        disabled={props.page === props.totalPages}
                        onClick={() => props.setPage(props.page + 1)}
                    >
                        Next
                    </button>
                </div>
            )}
        </>
    )
}