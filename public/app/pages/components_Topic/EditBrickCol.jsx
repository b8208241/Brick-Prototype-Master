import React from 'react';
import {StyleGroup} from '../components_General/draft/StyleGroup.jsx'
import {keyBindingFn} from '../components_General/draft/KeyBindingFn.js';
import {compositeDecorator} from '../components_General/draft/CompositeDecorator.jsx';
import {Editor, EditorState, ContentState, convertToRaw, convertFromRaw, Modifier, RichUtils} from 'draft-js';
import createHashtagPlugin from 'draft-js-hashtag-plugin';
import createLinkifyPlugin from 'draft-js-linkify-plugin';

const linkifyPluginContent = createLinkifyPlugin({target: '_blank'});
const linkifyPluginSub = createLinkifyPlugin({target: '_blank'});
const hashtagPluginContent = createHashtagPlugin();
const hashtagPluginSub = createHashtagPlugin();
const pluginDecoratorsContent = [linkifyPluginContent, hashtagPluginContent];
const pluginDecoratorsSub = [linkifyPluginSub, hashtagPluginSub];

export class EditBrickCol extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      subEditorState: this.props.oldData? EditorState.createWithContent(convertFromRaw(this.props.oldData.draftData_Sub), compositeDecorator(pluginDecoratorsSub)) : EditorState.createEmpty(compositeDecorator(pluginDecoratorsSub))
    };
    this.changeSubEditorState = (newState) => this.setState({subEditorState: newState});
    this.handle_Click_Editor = () => this.subEditor.focus();
    this.handle_Click_BrickSubmit = this.handle_Click_BrickSubmit.bind(this);
    this.handle_KeyCommand = this.handle_KeyCommand.bind(this);
  }

  handle_Click_BrickSubmit(event){
    event.preventDefault();
    event.stopPropagation();
    let subEditorData = convertToRaw(this.state.subEditorState.getCurrentContent());
    let currentPosition = this.props.editingPosition;
    let hashTagObj = {}
    let hyphenObj = {}
    let questionMarkobj = {}

    $(".topic-editbrick-col-editorgroup .draftJsHashtagPlugin__hashtag__1wMVC span>span").each(
      function(index){
        let tagText = $(this).text();
        hashTagObj[tagText] = tagText;
      }
    )
    $(".topic-editbrick-col-editorgroup .draftJsHyphen_hyphen span>span").each(
      function(index){
        let hyphenText = $(this).text();
        let itemName = hyphenText + "_" + currentPosition;
        hyphenObj[itemName] = {text: hyphenText, position: currentPosition};
      }
    )
    $(".topic-editbrick-col-editorgroup .draftJsQuestionmark__questionmark span>span").each(
      function(index){
        let questionText = $(this).text();
        let itemName = questionText + "_" + currentPosition;
        questionMarkobj[itemName] = {text: questionText, position: currentPosition};
      }
    )

    this.props.handle_dispatch_EditedContentSubmit(subEditorData, hashTagObj, hyphenObj, questionMarkobj);
  }

  handle_KeyCommand(command){
    console.log('handleKeyCommand, ContentEditor')
    //RichUtils is like a library, handling most of default command used in editor, like Ctrl + B
    //It will modified the editorState naturally, and return a new editorState
    const newState = RichUtils.handleKeyCommand(this.state.subEditorState, command);
    if(newState) {
      this.changeSubEditorState(newState);
      return 'handled';
    };
    /*
    if(command === 'Enter Pressed in Topic Editing contentEditor'){
      this.setState({
        subEditorState: EditorState.createWithContent(ContentState.createFromText(''),compositeDecorator(pluginDecoratorsSub)),
        contentEditorClass: "topic-editbrick-col-editorgroup-contentEditor topic-editbrick-col-editorgroup-contentEditor-active",
        firstEditorExist: true
      })
      return 'handled';
    }*/

    return 'not-handled';
  }

  componentWillMount(){

  }

  componentDidMount(){
    console.log('EditBrickCol did Mount')
  }

  componentWillReceiveProps(nextProps){
    console.log('EditBrickCol will Receive Props')
    if(nextProps.oldData){
      this.setState({
        subEditorState: EditorState.createWithContent(convertFromRaw(nextProps.oldData.draftData_Sub),compositeDecorator(pluginDecoratorsSub)),
        firstEditorExist: true
      })
    }else{
      let newSubEditor = EditorState.push(this.state.subEditorState, ContentState.createFromText(''));
      this.setState({
       subEditorState: newSubEditor,
       firstEditorExist: false
     })
    }
  }

  componentWillUpdate(nextProps, nextState){

  }

  componentDidUpdate(){
    console.log('EditBrickCol did Update')
  }

  render(){
    return(
      <div className="topic-editbrick-col">
        <div className="topic-editbrick-col-editorgroup">
          <div className="topic-editbrick-col-editorgroup-subEditor" onClick={this.handle_Click_Editor}>
            <Editor
              editorState={this.state.subEditorState}
              onChange={this.changeSubEditorState}
              ref={(element) => {this.subEditor = element;}}
              handleKeyCommand={this.handle_KeyCommand}
            />
          </div>
          <StyleGroup
            editorState={this.state.subEditorState}
            onChange={this.changeSubEditorState}/>
        </div>
        <input
          value="save"
          className="topic-editbrick-col-input-save"
          onClick={this.handle_Click_BrickSubmit}
          readOnly
        />
        <input
          value="cancel"
          className="topic-editbrick-col-input-cancel"
          onClick={this.props.close_EditBrickCol}
          readOnly/>
      </div>
    )
  }
}
