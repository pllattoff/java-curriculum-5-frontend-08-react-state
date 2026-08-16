import './App.css'
import {Route, Routes} from "react-router-dom";
import CharactersPage from "./pages/CharactersPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import Header from "./components/Header.tsx";
import CharacterDetailCard from "./components/CharacterDetailCard.tsx";
import {characters} from "./data/characters.ts";

export default function App() {

    return (
        <>
            <Header/>
            <Routes>
                <Route path={"/"} element={<HomePage/>}/>
                <Route path={"/characters"} element={<CharactersPage characters={characters}/>}/>
                <Route path={"/characters/:id"} element={<CharacterDetailCard characters={characters}/>}/>
            </Routes>

        </>
    );
}
