import {useNavigate} from "react-router-dom";

export default function NavBar() {
    const navigate = useNavigate()

    return(
        <nav>
            <button onClick={() => navigate("/")}>
                Home
            </button>

            <button onClick={() => navigate("/characters")}>
                Gallery
            </button>
        </nav>
    )
}