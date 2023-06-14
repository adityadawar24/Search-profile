import React, { useState } from 'react';
import './Search.css'


const Search = () => {
  const [username, setUsername] = useState('');
  const [profile, setProfile] = useState(null);
  const [repositories, setRepositories] = useState([]);

  const handleSearch = async () => {
    try {
      const prof = await fetch(`https://api.github.com/users/${username}`);
      const repo = await fetch(`https://api.github.com/users/${username}/repos`);

      if (prof.ok && repo.ok) {
        const profData = await prof.json();
        const repoData = await repo.json();

        setProfile(profData);
        setRepositories(repoData);
      } else {
        console.log('Error:', prof.status, repo.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  return (
    <div className='container'>
      <h2>Search the Github Profile here </h2>
      <div className='search-form'>
      <input type="text" value={username} onChange={handleInputChange} placeholder="Enter username" />
      <button onClick={handleSearch}>Search</button></div>

      {profile && (
        <div className='profile-container'>
          <h2>{profile.name}</h2>
          <img src={profile.avatar_url} alt="Profile" style={{ width: '100px', height: '100px' }} className='profile-image'/>
          <div className='profile-info'>
          <p>Followers: {profile.followers}</p>
         
          </div>
        </div>
      )}
 <div >
      {repositories.length > 0 && (
        <div className='repository-container'>
          <h3>Repositories:</h3>
          <ul className='repository-list'>
            {repositories.map((repo) => (
              <li key={repo.id}>
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                  {repo.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      </div>
    </div>
  );
};

export default Search;

