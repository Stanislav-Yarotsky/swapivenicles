import { useState, useEffect } from "react";

function SwapiVenicles() {
    const [venicles, setVenicles] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = document.documentElement.scrollTop;
            const windowHeight = window.innerHeight;
            const fullHeight = document.documentElement.scrollHeight;

            if (scrollTop + windowHeight >= fullHeight - 100 && hasMore) {
                setPage(prev => prev + 1);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [hasMore]);

    useEffect(() => {
        fetch(`https://swapi.py4e.com/api/vehicles/?page=${page}`)
            .then(res => res.json())
            .then(data => {
                setHasMore(data.next !== null);
                setVenicles(prev => [...prev, ...data.results]);
                setTimeout(() => {
                    const canScroll = document.documentElement.scrollHeight > window.innerHeight;
                    if (!canScroll && data.next !== null) {
                        setPage(prev => prev + 1);
                    }
                }, 100);
            });
    }, [page]);
    return (
        <div>
            <h2>Cars:</h2>
            <ul>
                {
                    venicles.map((car, index) => (
                        <li key={index}>{car.name}</li>
                    ))}
            </ul>
        </div>
    );
}

export default SwapiVenicles;