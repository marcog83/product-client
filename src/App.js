import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';  
import Routes from './Routes';
import { AppContext } from './libs/contextLib';
import { Auth } from 'aws-amplify';
import { onError } from './libs/errorLib';
import './App.css';

function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const history = useHistory();

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    } catch (e) {
      if (e !== 'No current user') {
        onError(e);
      }
    }

    setIsAuthenticating(false);
  }

  async function handleLogout() {
    await Auth.signOut();

    userHasAuthenticated(false);
    history.push('/login');
  }
  return (
    !isAuthenticating && (
      <div className='App container'>
        <nav className='navbar navbar-expand-lg navbar-light bg-light'>
          <div className='container-fluid'>
            <div className='navbar-header'>
              <Link className='navbar-brand' to='/'>
                Home
              </Link>
            </div>
            <div className='navbar-collapse collapse'>
              <ul className='ml-auto nav navbar-nav'>
                {isAuthenticated ? (
                  <li onClick={handleLogout} className='nav-item'>
                    <button type='button' className='btn btn-link'>
                      Logout
                    </button>
                  </li>
                ) : (
                  <>
                    <li className='nav-item'>
                      <Link className='nav-link' to='/signup'>
                        Signup
                      </Link>
                    </li>
                    <li className='nav-item'>
                      <Link className='nav-link' to='/login'>
                        Login
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
        <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
          <Routes />
        </AppContext.Provider>
      </div>
    )
  );
}

export default App;
