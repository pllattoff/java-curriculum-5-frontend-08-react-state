import {useNavigate} from "react-router-dom";
import "../styles/NavBar.css"

export default function NavBar() {
    const navigate = useNavigate()

    return(
        <nav>
            <button onClick={() => navigate("/")}>
                Home
            </button>

            <button onClick={() => navigate("/characters")}>
                Characters
            </button>

            <button onClick={() => navigate("/characters/add")}>
                Add Character
            </button>
        </nav>
    )
}