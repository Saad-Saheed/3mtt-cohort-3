import './CharacterList.css';

export const CharacterList = ({ characters }) => {    
    return (
        <div className="cards">
            {characters.map((char) => (
                <div className="card" key={char.id}>
                    <img src={char.image} alt={char.name} />
                    <div className="card-content">
                        <h2>{char.name}</h2>
                        <p className={`status ${char.status.toLowerCase()}`}>
                            {char.status} - {char.species}
                        </p>
                        <p className="info-title">Last known location:</p>
                        <p className="info">{char.location.name}</p>
                        <p className="info-title">First seen in:</p>
                        <p className="info">{char.origin.name}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}