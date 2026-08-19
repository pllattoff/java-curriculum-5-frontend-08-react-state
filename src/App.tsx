import './App.css'
import {Route, Routes} from "react-router-dom";
import CharactersPage from "./pages/CharactersPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import Header from "./components/Header.tsx";
import CharacterDetailCard from "./components/CharacterDetailCard.tsx";
import AddCharacterPage from "./pages/AddCharacterPage.tsx";
import {useEffect, useState} from "react";
import {Character} from "./data/types.ts";
import axios from "axios";

export default function App() {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    function addCharacter(newCharacter: Character) {
        setCharacters(prev => [...prev, newCharacter]);
    }

    function loadCharacters(page: number, attempt = 1) {
        setLoading(true);
        setError(false);

        axios
            .get(`https://rickandmortyapi.com/api/character?page=${page}`)
            .then(response => {
                setCharacters(response.data.results);
                setTotalPages(response.data.info.pages);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);

                if (attempt < 3) {
                    setTimeout(() => {
                        loadCharacters(page, attempt + 1);
                    }, 1000);
                } else {
                    setLoading(false);
                    setError(true);
                }
            });
    }

    useEffect(() => {
        loadCharacters(page);
    }, [page]);

    return (
        <>
            <Header/>
            <Routes>
                <Route
                    path="/"
                    element={<HomePage/>}
                />

                <Route
                    path="/characters"
                    element={
                        <CharactersPage characters={characters} page={page} totalPages={totalPages} setPage={setPage} loading={loading} error={error}/>
                    }
                />

                <Route
                    path="/characters/:id"
                    element={<CharacterDetailCard characters={characters}/>}
                />

                <Route
                    path="/characters/add"
                    element={<AddCharacterPage characters={characters} addCharacter={addCharacter}/>}
                />
            </Routes>
        </>
    );
}
