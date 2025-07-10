import React from 'react'
import Footer from './Components/Footer'
import Navbar from './Components/Navbar'
import { Outlet } from 'react-router-dom'

function Root() {
  return (
    <div class='font-custom'>
      <div class='md:mx-20 lg:mx-28'>
        <Navbar></Navbar>
          <div class='min-h-[80vh]'>
              <Outlet></Outlet>
          </div>
      </div>
        <Footer></Footer>
    </div>
  )
}

export default Root