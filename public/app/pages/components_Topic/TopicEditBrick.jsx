import React from 'react';
import {BrickDisplay} from './BrickDisplay.jsx';
import {EditBrickCol} from './EditBrickCol.jsx';

export class TopicEditBrick extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };

  }

  render(){
    let topicThis = this.props.topicThis;
    return(
      <div className="topic-editbrick">
        <EditBrickCol
          oldData={this.props.isEditingOld ? topicThis[this.props.editingPosition[0]][this.props.editingPosition[1]]: false}
          editingPosition={String(this.props.editingPosition[0])+String(this.props.editingPosition[1])}
          close_EditBrickCol={this.props.close_EditBrickCol}
          handle_dispatch_EditedContentSubmit={this.props.handle_dispatch_EditedContentSubmit}/>
        <div className="topic-editbrick-brickscol">
        </div>
      </div>
    )
  }
}
