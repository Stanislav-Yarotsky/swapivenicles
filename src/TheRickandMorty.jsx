import { useState, useEffect, useRef } from "react";

function TheRickandMorty() {
    const [character, setCharacter] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const scrollContainerRef = useRef(null);


    useEffect(() => {
        const handleScroll = () => {
            const el = scrollContainerRef.current;
            if (!el) return;
            if (el.scrollTop + el.clientHeight >= el.scrollHeight - 100 && hasMore) {
                setPage(prev => prev + 1);
            }
        };
        const el = scrollContainerRef.current;
        if (el) el.addEventListener("scroll", handleScroll);
        return () => {
            if (el) el.removeEventListener("scroll", handleScroll);
        };
    }, [hasMore]);

    useEffect(() => {
        fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
            .then(res => res.json())
            .then(data => {
                setHasMore(data.info.next !== null);
                setCharacter(prev => [...prev, ...data.results]);
            });
    }, [page]);

    return (
        <div className="character-container">
            <h2 className="character-title"> The Rick and Morty API Characters</h2>
            <div className="scroll-list" ref={scrollContainerRef}>
                {character.map((char, index) => (
                    <div className="card" key={index}>
                        <img className="character-img" src={char.image} alt={char.name} />
                        <div className="character-name">{char.name}</div>
                    </div>
                ))}
                {!hasMore && <div className="end-label">No more results</div>}
            </div>
        </div>
    );
}

export default TheRickandMorty;