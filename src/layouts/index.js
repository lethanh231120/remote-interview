import React from 'react'
import { Routes, Route } from 'react-router-dom'
import PageNotFound from '../pages/404'
import HomePage from '../pages/home/Home'
import Products from '../pages/products/Products'
import Protocols from '../pages/protocols/Protocols'
import Tokens from '../pages/tokens/Tokens'
import UseCases from '../pages/use-cases/UseCases'
import Header from './header/Header'
import Test2 from '../pages/test2/Test2'
import { PrivateRoute } from '../routers'

const Router = () => {
  return (
    <div className='container'>
        <Header/>
        <div className='content'>
          <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='test2' element={<PrivateRoute component={Test2} />} />
              <Route path='products' element={<Products />} />
              <Route path='protocols' element={<Protocols />}/>
              <Route path='tokens' element={<Tokens />} />
              <Route path='use-cases' element={<UseCases />} />
              <Route path='*' element={<PageNotFound />} />
          </Routes>
        </div>
    </div>
  )
}

export default Router
