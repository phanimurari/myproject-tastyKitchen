import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

const LOGO_IMG_SRC_URL =
  'https://res.cloudinary.com/imphanimurari/image/upload/v1637500886/Mini%20Projects/Tasty%20Kitchen/Vector_1_kjlhlr.png'

const LOGIN_PAGE_DESKTOP_LANDING_PAGE =
  'https://res.cloudinary.com/imphanimurari/image/upload/v1637501465/Mini%20Projects/Tasty%20Kitchen/Rectangle_1456_fb4iv7.png'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-field"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Password"
        />
      </>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-field"
          value={username}
          onChange={this.onChangeUsername}
          placeholder="Username"
        />
      </>
    )
  }

  renderLoginLogo = () => (
    <div className="logo-image-container">
      <img src={LOGO_IMG_SRC_URL} alt="logo" />
      <p className="app-name">Tasty Kitchen</p>
    </div>
  )

  renderFormElements = () => {
    const {showSubmitError, errorMsg} = this.state

    return (
      <div className="login-form-main-container">
        <form className="form-container" onSubmit={this.submitForm}>
          {this.renderLoginLogo()}
          <div className="input-container">{this.renderUsernameField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          <button type="submit" className="login-button">
            Login
          </button>
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
    )
  }

  renderDesktopLoginLandingImage = () => (
    <div className="login-page-desktop-landing-page-container">
      <img
        src={LOGIN_PAGE_DESKTOP_LANDING_PAGE}
        alt="landing page"
        className="login-page-desktop-landing-image"
      />
    </div>
  )

  renderLoginFormContainer = () => (
    <div className="login-form-container">
      {this.renderFormElements()}
      {this.renderDesktopLoginLandingImage()}
    </div>
  )

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return this.renderLoginFormContainer()
  }
}

export default LoginForm
