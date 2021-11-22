import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <>
      <h1>Home</h1>
    </>
  )
}

export default Home
