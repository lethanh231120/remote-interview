import React, { useState, useContext } from 'react'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import Modal from 'react-modal'
import { parseJwt } from '../../utils/decode'
import { STORAGEKEY, removeCookie, setCookie } from '../../utils/storage'
import { Authenticated } from '../../App'
import { useNavigate } from 'react-router-dom'
import './home.scss'

const Home = () => {
  const navigate = useNavigate()
  const authenticated = useContext(Authenticated)
  const [IsOpen, setIsOpen] = useState(false);
  const [IsOpenNoti, setIsOpenNoti] = useState(false);
  const responseGoogle = async(response) => {
    try {
      const decodedJwt = parseJwt(response?.credential)
      if (decodedJwt?.email_verified) {
        const userInfo = {
          email: decodedJwt?.email,
          accountType: 'google',
          password: response?.credential,
          userId: decodedJwt?.sub,
          userName: decodedJwt?.name,
          image: decodedJwt?.picture
        }
        await removeCookie(STORAGEKEY.USER_INFO)
        await setCookie(STORAGEKEY.USER_INFO, userInfo)
        authenticated?.handleSetAuthenticated(true)
        setIsOpen(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const errorGoogle = (error) => {
    console.error(error)
  }

  function closeModal() {
    setIsOpen(false);
  }
  function closeModalNoti() {
    setIsOpenNoti(false);
  }

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

  const handleLaunchApp = () => {
    if (authenticated?.isAuthenticated) {
      navigate('./test2')
    } else {
      setIsOpenNoti(true)
    }
  }

  return (
    <div className='home'>
      <div className='home-interview'>
        <div className='home-interview-item'>
          <div className='home-interview-left'>
            <div className='home-interview-title'>
              Explore and Earn on
              <img src='images/image-text.png' alt='image-banner'/>
            </div>
            <div className='home-interview-form'>
              <div className='home-interview-signup'>
                <div className='btn-signup'>Sign up</div>
              </div>
              <div className='home-interview-btns'>
                <div
                  className='home-interview-btns-item'
                  onClick={() => setIsOpen(true)}
                >
                  Login
                </div>
                <div
                  className='home-interview-btns-item'
                  onClick={handleLaunchApp}
                >
                  Launch App
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='home-interview-item'>
          <div className='home-interview-right'>
            <img src='images/logo.png' alt='small logo'/>
            <div>test Frontend interview 1</div>
          </div>
        </div>
      </div>
      <div className='home-market'>
        <div className='home-market-item'>
          <div className='home-market-item-title'>$1.80B</div>
          <div className='home-market-item-text'>30 Day Volume</div>
        </div>
        <div className='home-market-item'>
          <div className='home-market-item-title'>$0.84B</div>
          <div className='home-market-item-text'>Managed on testX.fi</div>
        </div>
        <div className='home-market-item'>
          <div className='home-market-item-title'>$21.43M</div>
          <div className='home-market-item-text'>Total Collateral Automated</div>
        </div>
      </div>
      <Modal
        isOpen={IsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div style={{ width: '100%', textAlign: 'right', marginBottom: '40px' }}>
          <p onClick={closeModal} style={{ textAlign: 'right', cursor: 'pointer', margin: '0' }}>
            &#10060;
          </p>
        </div>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_ID}>
          <GoogleLogin
            text='login_with'
            size='medium'
            theme='outlined'
            onSuccess={responseGoogle}
            onError={errorGoogle}
          />
        </GoogleOAuthProvider>
      </Modal>
      <Modal
        isOpen={IsOpenNoti}
        onRequestClose={closeModalNoti}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div style={{ width: '100%', textAlign: 'right', marginBottom: '40px' }}>
          <p
            onClick={() => {
              closeModalNoti();
              setIsOpen(true)
            }} 
            style={{ textAlign: 'right', cursor: 'pointer', margin: '0' }}
          >
            &#10060;
          </p>
        </div>
        <div>
          Bạn phải đăng nhập mới sử dụng được tính năng này.
        </div>
      </Modal>
    </div>
  )
}

export default Home
