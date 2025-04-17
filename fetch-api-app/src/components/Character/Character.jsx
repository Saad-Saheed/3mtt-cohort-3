import './Character.css';
import { useState } from 'react';
import useFetch from '../../hooks/useFetch';
import { CharacterList } from '../CharacterList/CharacterList';

export const Character = () => {
    const [apiUrl, setApiUrl] = useState('https://rickandmortyapi.com/api/character');

    const { data, loading, error } = useFetch(apiUrl);
    const characters = data?.results || [];
    const pagination = {
        next: data?.info?.next,
        prev: data?.info?.prev,
        count: data?.info?.count || 0,
    };

    const getCurrentPage = () => {
        const url = new URL(apiUrl);
        return parseInt(url.searchParams.get('page')) || 1;
    };

    const currentPage = getCurrentPage();
    const perPage = characters.length || 20; // fallback if characters is empty
    const start = (currentPage - 1) * perPage + 1;
    const end = Math.min(start + perPage - 1, pagination.count);

    return (
        <div className="container">
            <h1 className="title">Rick and Morty Characters</h1>

            {loading && <div className="loader">Loading...</div>}
            {error && <div className="error">Error: {error}</div>}
            {(!loading && !error && !characters.length) && <div className="no-record">Character not found!</div>}

            {(!loading && !error && characters.length > 0) &&               
                <CharacterList characters={characters} />
            }


            <div className="pagination-info">
                {pagination.count > 0 && (
                    <p>Displaying {start}-{end} of {pagination.count} records</p>
                )}
            </div>

            <div className="pagination">
                <button onClick={() => setApiUrl(pagination.prev)} disabled={!pagination.prev}>
                    Previous
                </button>
                <button onClick={() => setApiUrl(pagination.next)} disabled={!pagination.next}>
                    Next
                </button>
            </div>
        </div>
    );
}