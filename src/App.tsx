import './App.css'
import {Route, Routes} from "react-router-dom";
import CharactersPage from "./pages/CharactersPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import Header from "./components/Header.tsx";
import CharacterDetailCard from "./components/CharacterDetailCard.tsx";
import {characters as initialCharacters} from "./data/characters.ts";
import NewCharacterPage from "./pages/NewCharacterPage.tsx";
import {useState} from "react";
import {Character} from "./data/types.ts";

export default function App() {
    const [characters, setCharacters] = useState<Character[]>(initialCharacters);

    function addCharacter(newCharacter: Character) {
        setCharacters(prev => [...prev, newCharacter]);
    }

    return (
        <>
            <Header/>
            <Routes>
                <Route path={"/"} element={<HomePage/>}/>
                <Route path={"/characters"} element={<CharactersPage characters={characters}/>}/>
                <Route path={"/characters/:id"} element={<CharacterDetailCard characters={characters}/>}/>
                <Route path={"/characters/add"} element={<NewCharacterPage characters={characters} addCharacter={addCharacter}/>}/>
            </Routes>

        </>
    );
}
