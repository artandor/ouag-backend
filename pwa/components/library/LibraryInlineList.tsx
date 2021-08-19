interface LibraryInlineListProps {
    libraries: any[],
    selectedLibrary: any,
    setSelectedLibrary: Function
}

function LibraryInlineList({libraries, selectedLibrary, setSelectedLibrary}: LibraryInlineListProps) {
    return (
        <ul className="list-group list-group-horizontal horizontal-scroll">
            {libraries.map((library) =>
                <li className={`list-group-item ${library === selectedLibrary && "active"}`}
                    onClick={() => setSelectedLibrary(library)}
                    key={library['@id']}>{library['name']}</li>)}
        </ul>
    )
}

export default LibraryInlineList
