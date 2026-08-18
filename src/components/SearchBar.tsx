import "../styles/SearchBar.css"

type SearchBarProps = {
    setSearchText: (searchText: string) => void;
}

export default function SearchBar(props: Readonly<SearchBarProps>) {

    return(
        <input className="search-input"
            type="text"
            onChange={(e) => props.setSearchText(e.target.value)}
            placeholder="Search for a character..."
        />
    )
}