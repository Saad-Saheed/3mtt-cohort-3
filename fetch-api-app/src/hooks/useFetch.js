import { useEffect, useState } from 'react';
function useFetch(apiUrl) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {  
        async function fetchData() {     
            setLoading(true);
            try {
                const res = await fetch(apiUrl);
                const data = await res.json();
                setData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error.message);
            }
            setLoading(false);
        }

        if (apiUrl) {
            fetchData();
        }
        
    }, [apiUrl]);
    
    return {
        data,
        loading,
        error,
    };
}

export default useFetch;