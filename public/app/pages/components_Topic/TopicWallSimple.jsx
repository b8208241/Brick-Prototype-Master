import React from 'react';
import {ContentRowSimple} from './ContentRowSimple.jsx';

export class TopicWallSimple extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }

  render() {
    console.log('enter TopicWallSimple')
    let topicId = this.props.topicId;
    let topicThis = this.props.topicThis;

    let children = [];
    let i
    for(i=1 ; i<5 ; i++){
      children.push(
        <ContentRowSimple
          key= {"rowsimple_"+ i}
          rowRecord = {topicThis[i]}
          topicId = {topicId}
          isEditing={this.props.isEditing}
          focusPosition={i===this.props.focusPosition[0] ? this.props.focusPosition : false}
          editingPosition={ i===this.props.editingPosition[0] ? this.props.editingPosition : false}
          set_EditingPosition = {this.props.set_EditingPosition}
          open_EditBrickCol={this.props.open_EditBrickCol}/>
      )
    };

    return(
      <div className='topic-wall'>
        {children}
      </div>
    )
  }
}
