import './App.css';
import Layout from '../src/layouts'
import { createContext, useState, useEffect } from 'react';
import { getCookie, STORAGEKEY } from './utils/storage';
import { useNavigate } from 'react-router-dom';
// import Footer from './layouts/footer/Footer';

export const Authenticated = createContext()

function App() {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const stateAuthenticated = {
    isAuthenticated: isAuthenticated,
    handleSetAuthenticated: (isAuth) => setIsAuthenticated(isAuth)
  }

  useEffect(() => {
    setIsAuthenticated(Boolean(getCookie(STORAGEKEY.USER_INFO)))
  }, [])

  return (
    <Authenticated.Provider value={stateAuthenticated}>
      <div className="App">
        <Layout/>
        {/* <Footer/> */}
      </div>
    </Authenticated.Provider>
  );
}

export default App;
