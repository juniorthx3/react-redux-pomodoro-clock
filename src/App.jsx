import React from 'react'
import Container from './Container'
import {Provider} from 'react-redux'
import store from './store'

function App() {
  return (
     <Provider store={store}>
        <Container />
     </Provider>
  )
}

export default App
