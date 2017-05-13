import React from 'react';
import {connect} from 'react-redux'
import { Route } from 'react-router'
import {ActiveTopicRow} from './components_Main/ActiveTopicRow.jsx'
import {CreationGroup} from './components_Main/CreationGroup.jsx'

import {newTopicSubmit} from '../actions/Main.js';

class Main extends React.Component {
  constructor(props){
    super(props);
    this.handle_dispatch_NewTopicSubmit = (topicText, editorData) => this.props.dispatch(newTopicSubmit(topicText, editorData, this.props.userData.userName));
  };

  render() {
    console.log('enter component in Main')
    let userData = this.props.userData
    let children = React.Children.map(this.props.children, function (child) {
      return React.cloneElement(
        child,
        {
          userData: userData
        })
    })

    return(
      <section style={{width: '100%', fontSize: '18pt'}}>
        <section className="main-top">
          <div className="main-top-user">{this.props.userData.userName}</div>
          <div className="main-top-logo">WallScape</div>
          <div className="main-top-activetopics">
            <ActiveTopicRow activeTopicRow = {this.props.topicData.activeTopicRow}/>
            <CreationGroup handle_dispatch_NewTopicSubmit = {this.handle_dispatch_NewTopicSubmit}/>
          </div>
        </section>
      </section>
    )
    //section not used, remain for demonstrating the usage of children, and illustrating the original design
    //SelfNav was deleted in later version, find in prototype-12-16 or online commit
    /*<section className='section-Self'>
      <SelfNav/>
      {children}
    </section>*/
  }
}

function mapStateToProps (state) {
  return {
    token: state.others.token,
    topicData: state.topicData,
    userData: state.others.userData
  }
}

export default connect(mapStateToProps)(
  Main
)
