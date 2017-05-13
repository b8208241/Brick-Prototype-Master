import React from 'react';
import {Editor, ContentState, EditorState, convertFromRaw} from 'draft-js';

export class TopicRecords extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    };
    this.changeEditorState = () => {};
    this.handle_Click_Records = this.handle_Click_Records.bind(this);
  }

  handle_Click_Records(event) {
    event.preventDefault();
    event.stopPropagation();

  }

  render(){
    return(
      <div className="topic-records">
        <div className="topic-records-records" onClick={this.handle_Click_Records}>
          <Editor
            editorState={this.state.editorState}
            onChange={this.changeEditorState}
            ref={(element) => {this.records = element;}}
            readOnly
          />
        </div>
      </div>
    )
  }
}
