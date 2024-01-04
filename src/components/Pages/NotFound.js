import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

const NotFound = () => {
  return (
    <div><p>NotFound</p>
    <Link className = "btn" to= "new-quote" >Add Quoute</Link>
    </div>
  )
}

export default NotFound