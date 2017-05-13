import React from 'react';
import {Editor, EditorState, ContentState, convertFromRaw, convertToRaw} from 'draft-js';
import {ModalBox} from '../components_General/ModalBox.jsx';
import {ModalBackground} from '../components_General/ModalBackground.jsx';
import {StyleGroup} from '../components_General/draft/StyleGroup.jsx';

export class CreationGroup extends React.Component {
  constructor(props){
    super(props);
    this.state={
      isCreatingTopic: false
    }
    this.close_Creation = (event) => {event.preventDefault();event.stopPropagation();this.setState({isCreatingTopic: false});};
    this.handle_Click_TopicCreate = this.handle_Click_TopicCreate.bind(this);
    this.handle_NewSubmit = this.handle_NewSubmit.bind(this);
  }

  handle_Click_TopicCreate(event){
    event.preventDefault();
    event.stopPropagation();
    this.setState({isCreatingTopic: true})
  }

  handle_NewSubmit(){
    this.props.handle_NewSubmit(this.inputTopic.value);
    this.inputTopic.value = null;
  }

  render() {
    return(
      <div className="main-top-activetopics-creationgroup">
        <span
          onClick={this.handle_Click_TopicCreate}>
          {"+"}
          {
            this.state.isCreatingTopic &&
            <ModalBox>
              <ModalBackground
                onClose={this.close_Creation}>
                <CreatingTopic
                  handle_dispatch_NewTopicSubmit={this.props.handle_dispatch_NewTopicSubmit}/>
              </ModalBackground>
            </ModalBox>
          }
        </span>
      </div>
    )
  }
}

class CreatingTopic extends React.Component {
  constructor(props){
    super(props);
    this.state={
      editorState: EditorState.createEmpty()
    }
    this.changeEditorState = (newState) => {this.setState({editorState: newState})};
    this.handle_Click_NewTopicSubmit = this.handle_Click_NewTopicSubmit.bind(this);
  }

  handle_Click_NewTopicSubmit(event){
    event.preventDefault();
    event.stopPropagation();
    let topicText = $('.topic-box-title-text').text();
    let editorData = convertToRaw(this.state.editorState.getCurrentContent());
    this.props.handle_dispatch_NewTopicSubmit(topicText, editorData);
  }

  render(){
    return(
      <div className="main-top-activetopics-creationgroup-creatingTopic">
        <div className="main-top-activetopics-creationgroup-creatingTopic-editor">
          <Editor
            editorState={this.state.editorState}
            onChange={this.changeEditorState}
            ref={(element) => {this.records = element;}}
          />
          <StyleGroup
            editorState={this.state.editorState}
            onChange={this.changeEditorState}/>
        </div>
        <span onClick={this.handle_Click_NewTopicSubmit}>建立</span>
        <div className="topic-box-title-box">
          <div className="topic-box-title-text">
            {this.state.editorState.getCurrentContent().getPlainText()}
          </div>
        </div>
      </div>
    )
  }
}
