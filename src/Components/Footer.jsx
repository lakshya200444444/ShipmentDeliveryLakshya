import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer class="footer p-10 bg-neutral text-neutral-content mt-8">
      <nav>
        <h6 class="footer-title">Services</h6> 
        <Link to = '' class="link link-hover">Branding     </Link>
        <Link to = '' class="link link-hover">Design       </Link>
        <Link to = '' class="link link-hover">Marketing    </Link>
        <Link to = '' class="link link-hover">Advertisement</Link>
      </nav> 
      <nav>
        <h6 class="footer-title">Company</h6> 
        <Link to = '' class="link link-hover">About us    </Link>
        <Link to = '' class="link link-hover">Contact     </Link>
        <Link to = '' class="link link-hover">Jobs        </Link>
        <Link to = '' class="link link-hover">Press kit   </Link>
      </nav> 
      <nav>
        <h6 class="footer-title">Legal</h6> 
        <Link to = '' class="link link-hover">Terms of use  </Link>
        <Link to = '' class="link link-hover">Privacy policy</Link>
        <Link to = '' class="link link-hover">Cookie policy </Link>
      </nav>
    </footer>
  )
}

export default Footer