import NavBar from "./NavBar.tsx";
import "../styles/Header.css"

export default function Header() {
    return(
        <>
            <header>
                <h1 className="app-title">Rick & Morty App</h1>
                <NavBar/>
            </header>
        </>
    )
}