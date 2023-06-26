import React, { useState } from 'react';
import './Search.css';

const Search = () => {
  const [username, setUsername] = useState('');
  const [profile, setProfile] = useState(null);
  const [repositories, setRepositories] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearch = async () => {
    if (username.trim() === '') {
      setErrorMessage('Please enter a username.');
      setProfile(null);
      setRepositories([]);
      return;
    }

    try {
      const prof = await fetch(`https://api.github.com/users/${username}`);
      const repo = await fetch(`https://api.github.com/users/${username}/repos`);

      if (prof.ok && repo.ok) {
        const profData = await prof.json();
        const repoData = await repo.json();

        setProfile(profData);
        setRepositories(repoData);
        setErrorMessage('');
      } else {
        setErrorMessage('User profile not found!!');
        setProfile(null);
        setRepositories([]);
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
<img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHcAAAB3CAMAAAAO5y+4AAAAaVBMVEX///8XFRUAAAATERH09PTp6ekQDQ0GAAC4uLj39/e8vLzw8PD8/PzAwMALBwe0tLSUlJSfn5+Ih4fg4OB2dnYjIiLQ0NArKirY2Nh/fn7LysppaGhMS0thYWE4NzcdHByop6dVVFRBQUEOIdwWAAAE0ElEQVRoge1a2ZaqOhBtKgyiiCAgo4r8/0ceQAKZIAnQ59x1F/utWyqbJDXsFPn5OXDgwIEDBw7owrOiLMsiy/trjOY1KBuY8CqDs/nLnN41t1sqxzYm2E7Hnl9/b+ZF3BIgQwTU/lIWv0Fq1ukc6Uid1nsvuBmmYC+QDksOaXDZkdW7qbAOzPVuG519FFm/zNVjH9oAHGXWDj7cd2C9VKDF2gEaayttoTlZPOXrNtp6MXTmgSDcQnvXX2OMLZu8gbYlzv8J7XriYBvt2qW+baVtiWt92mw7bUusnbpcYwqgrsgp52eqVCLQLRPPabrILrJz8Fqugt/ptfXolD3S6UH46NHWxCoPfhndJcyt6Ij6J8k40MsfkU0wwHn476VlHlbAGeWV4yPMipNyQfAiiDR4S9KpiD2KSvBbrqR6xvcgDMPgHj+rpP2PD89sfMqjrJ/qtFfSEAH506kp68hyif+4VnSLmxv5UEo6oUaJqHzCzq7UX3jAk7T3G1UBcqZC19dYqAExNQDc5BY9Gn9XXvulZlXQmcrXDMEWJa0VFHf4Q1shpM3b0MnNV/IQi03M4MqNKHjcCCoxHHJWqn6BUXAjBApWKVsB4KTJe2V57bfc6MK9rL5s4BQDyHVtzdiovCsHOhKVBAATAzppbgIrGpxSasLUOr9ZQUuV7+/bywzYKFop/B/sMLJIOtEGKFl5qmSiQhqLjCuCfGPEYLS3NIJj5nndnIHBxDDEkuc/dAToC9EBGVtclvfLe1H7guxs8fF5WAkVF/Zrmdelwwglaw/QJjMBSXExWXfeideA5Q7Tf4XX0FG/JKwUbeF11vpVZGzhNWBtz5GtDLq8O+UNGa+bMMuztjsSsg66HEdeReerlWWQK4R+JakvTNlHycrOLuPO0sLP9nD2qr+y/WLl1cpCmLPD1BID1v/1OxQdPLYzANI8wEnQNR7Na3+pCePQ1HFfFS47XYUTEq+59c+hJTeG/KDCeqJuS+aH90012cL36TST5VkwgoJZLDCrNWgFrXKpquvAnSI7w1L1DOxye2uoVrVkUApkWxIUp1w7Alo7UbIdgs9+naPingJ+iSSUaY8oTISdREXHvKDe+NtPMQM8lA1GFT7m9Jb1CCskbtoipJgBhtoAcV+LruMckA+QVmXOligzL7tmoT/TNVXOeNZ7aHW++rCjGu9I9DUsmOXsLN7KmhTnrOHzExVZwi4Ye76npqvSVPliFL92f25138S+CbssXCeFfE8N5TCegp1e5xSTm84IkHR2nfW6QWP0f+P2CvSLcGD7ChOtnm64vHH0GP3f0Qe318W5miu4eHnemlV03DEssKIgLuOgmMmXpxlefXk2+rSSkhXUoJ5W3ZdH4C1Tysxi3hWSoY2eFyY+yx8W8sJLt5Pb45I4eLWkzSQRr5OsvFNhvTFxGkqCX8DrqOdHFhdcBe22IMRBGOSfmTTA80K64QaJOV1m6L84gj+z2RwvVJuuzLis2lLkhXiVSxEIwVfgpfOGv+02wxePFEQfKed5EaS73JRxc+LuyIxfEbwO5FvXGOPRjMpJxmtDs9O1oO+4+CLUMq8Nqe7HFxluSV+Dl3gBkrXtnyU8yi6CxUnI6n4q91xhEu6tntXP9W0vbzpw4MCBAwf+9/gDAPw29HjkRogAAAAASUVORK5CYII=' alt='github logo' class='github-logo'/>
       <h2>Github Search</h2>
      <div className='search-form'>
        <input type="text" value={username} onChange={handleInputChange} placeholder="Enter username" />
        <button onClick={handleSearch}>Search</button>
      </div>

      {errorMessage && <div className='alert'>{errorMessage}</div>}

      {!errorMessage && profile && (
        <div className='profile-container'>
          <h2>{profile.name}</h2>
          <img src={profile.avatar_url} alt="Profile" style={{ width: '100px', height: '100px' }} className='profile-image' />
          <div className='profile-info'>
            <p>Followers: {profile.followers}</p>
          </div>
        </div>
      )}

      {!errorMessage && repositories.length > 0 && (
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
  );
};

export default Search;
