import './App.css';
import Layout from '../src/layouts'
import { createContext, useState, useEffect } from 'react';
import { getCookie, STORAGEKEY } from './utils/storage';
// import Footer from './layouts/footer/Footer';
import Modal from 'react-modal'


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto'
  },
};

export const Authenticated = createContext()

function App() {
  const [IsOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const stateAuthenticated = {
    isAuthenticated: isAuthenticated,
    handleSetAuthenticated: (isAuth) => setIsAuthenticated(isAuth)
  }

  useEffect(() => {
    setIsAuthenticated(Boolean(getCookie(STORAGEKEY.USER_INFO)))
  }, [])

  useEffect(() => {
    const getIp = async() => {
      const response = await fetch('https://ipinfo.io/json?token=368ea3e3610fe4');
      const data = await response.json();

      if (data.country === 'JP') {
        setIsOpen(true)
      }
    }
    getIp()
  }, [])

  return (
    <Authenticated.Provider value={stateAuthenticated}>
      <div className="App">
        <Layout/>
        {/* <Footer/> */}
      </div>

      <Modal
        isOpen={IsOpen}
        style={customStyles}
        contentLabel="Example Modal"
      >
       &#10060; Access from Japan is not allowed.
      </Modal>
    </Authenticated.Provider>
  );
}

export default App;
