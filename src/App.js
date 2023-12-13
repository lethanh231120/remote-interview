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

  useEffect(() => {
    console.log(111111)
    const checkAccess = async () => {
      try {
        const response = await fetch('/api/blockJapan');
        const data = await response.json();

        console.log(response)
        console.log(data)
        if (!response.ok) {
          console.error(data.error);
          navigate('./block-ip')
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    checkAccess();
  }, []);

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
