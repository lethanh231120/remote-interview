import React, { useState, useContext } from 'react'
import './header.scss'
import { STORAGEKEY, getCookie } from '../../utils/storage'
import { Authenticated } from '../../App'

const Header = () => {
  const authenticated = useContext(Authenticated)
  const [addressWallet, setAddressWallet] = useState()
  const userInfo = getCookie(STORAGEKEY.USER_INFO)
  const handleConnectPetraWallet = async() => {
    const isPetraInstalled = window.aptos;
    if (isPetraInstalled) {
      try {
        const response = await isPetraInstalled.connect();
        setAddressWallet(response?.address);
      } catch (error) {
        alert("User rejected the request.")
      }
    } else {
      window.open('https://petra.app/', `_blank`);
    }
  }

  return (
    <div className='header'>
      <img src='images/logo.png' alt='logo' className='logo'/>
      <div className='menu'>
        <div className='menu-item'>Products</div>
        <div className='menu-item'>Protocols</div>
        <div className='menu-item'>Tokens</div>
        <div className='menu-item'>Use Cases</div>
        <div
          className='btn-connect'
          onClick={handleConnectPetraWallet}
          style={addressWallet && {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'left'
          }}
        >
         {addressWallet ? 
          <>
            <img src='images/logo-wallet.png' alt='logo wallet' className='logo-wallet'/>
              {`${addressWallet?.slice(0, 5)}...${addressWallet?.slice(addressWallet.length - 5, addressWallet.length)}`}
          </>
          : <span>Connect Wallet &#8594;</span>}
        </div>
        {authenticated?.isAuthenticated ? (
          <div style={{ marginLeft: '20px' }}>
            <img src={userInfo?.image} alt='avatar wallet' className='logo-wallet'/>
          </div>
        ) : ''}
      </div>
    </div>
  )
}

export default Header
