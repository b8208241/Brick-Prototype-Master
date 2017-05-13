import React from 'react';
import {ContentRow} from './ContentRow.jsx'

export class TopicWall extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }

  render() {
    console.log('enter TopicWall')
    let topicId = this.props.topicId;
    let topicThis = this.props.topicThis;

    let children = [];
    let i
    for(i=1 ; i<5 ; i++){
      children.push(
        // 0 is false, to avoid this on index 0, plus 1 in the judgement
        <ContentRow
          key= {"row_"+ i}
          rowRecord = {topicThis[i]}
          topicId = {topicId}
          editingStatus={this.props.editingStatus}
          searchResult = {this.props.searchResult ? this.props.searchResult[i-1] : false}
          open_EditBrickCol={this.props.open_EditBrickCol}
          handle_dispatch_positionChangeSubmit = {this.props.handle_dispatch_positionChangeSubmit}
          handle_dispatch_RecycleBrickSubmit={this.props.handle_dispatch_RecycleBrickSubmit}/>
      )
    };

    return(
      <div className='topic-wall'>
        {children}
      </div>
    )
  }
}
