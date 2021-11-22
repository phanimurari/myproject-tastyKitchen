import {Component} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

class App extends Component {
  state = {
    cartList: [],
  }

  deleteCartItem = () => {}

  render() {
    const {cartList} = this.state

    return (
      <Switch>
        <Route exact path="/login" component={LoginForm} />
        <ProtectedRoute exact path="/" component={Home} />
      </Switch>
    )
  }
}

export default App
