import React from 'react';
import {SubTopic} from './SubTopic.jsx';
import {TopicWallSimple} from './TopicWallSimple.jsx';

export class TopicBox extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }

  render(){
    let boxClass
    if(this.props.topicStatus==="wall"){
      boxClass = "topic-box_wall"
    }else{
      boxClass = "topic-box_left"
    }
    return(
      <div className={boxClass}>
        <div className="topic-box-title-box">
          <div className="topic-box-title-text" style={this.props.isEditing?{color: "#FFFFFF"}:null}>
            {this.props.topicThis["topic"]}
          </div>
        </div>
        {
          this.props.topicStatus==='wall' &&
          <div className="topic-box-panel">
            <SubTopic
              topicThis={this.props.topicThis}
              open_TopicExplore={this.props.open_TopicExplore}
              search_SubTopic={this.props.search_SubTopic}/>
          </div>
        }
        {
          this.props.topicStatus==="explore" &&
          <div className="topic-box-panel">
            <div className="topic-box-panel-wallsimple">
              <TopicWallSimple
                topicThis = {this.props.topicThis}
                topicId={this.props.topicId}
                isEditing={this.props.isEditing}
                focusPosition={this.props.focusPosition}
                editingPosition={this.props.editingPosition}
                open_EditBrickCol={this.props.open_EditBrickCol}
                set_EditingPosition = {this.props.set_EditingPosition}/>
            </div>
          </div>
        }
      </div>
    )
  }
}
