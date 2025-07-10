import React from 'react'
import { Link } from 'react-router-dom'

function ErrorPage() {
  return (
    <div class='font-custom text-red-500 min-h-screen flex gap-4 flex-col justify-center items-center'>
      <p class='text-2xl font-bold'>Oops! You have entered the wrong way!</p>

      <Link class='btn' to = "/"> Back to home</Link>
    </div>
  )
}

export default ErrorPage