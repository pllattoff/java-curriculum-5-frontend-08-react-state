import './App.css'
import {Route, Routes} from "react-router-dom";
import CharactersPage from "./pages/CharactersPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import Header from "./components/Header.tsx";
import CharacterDetailCard from "./components/CharacterDetailCard.tsx";
import NewCharacterPage from "./pages/NewCharacterPage.tsx";
import {useEffect, useState} from "react";
import {Character} from "./data/types.ts";
import axios from "axios";

export default function App() {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [reload, setReload] = useState<boolean>(false);

    function addCharacter(newCharacter: Character) {
        setCharacters(prev => [...prev, newCharacter]);
    }

    function loadAllCharacters() {
        axios.get("https://rickandmortyapi.com/api/character")
            .then(response => setCharacters(response.data.results))
            .catch(error => console.log(error));
    }

    useEffect(() => {
        loadAllCharacters();
    }, [reload]);

    return (
        <>
            <Header/>
            <Routes>
                <Route path={"/"} element={<HomePage/>}/>
                <Route path={"/characters"} element={<CharactersPage characters={characters} reload={reload} setReload={setReload}/>}/>
                <Route path={"/characters/:id"} element={<CharacterDetailCard characters={characters}/>}/>
                <Route path={"/characters/add"} element={<NewCharacterPage characters={characters} addCharacter={addCharacter}/>}/>
            </Routes>

        </>
    );
}
