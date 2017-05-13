import React from 'react'
import {Provider} from 'react-redux'
import {RouterContext} from 'react-router'
import {clearError} from './app/actions/Main.js'

export default class Index extends React.Component {

  render () {
    return (
      <Provider store={this.props.store}>
        <RouterContext {...this.props.matchProps}/>
      </Provider>
    )
  }
}
