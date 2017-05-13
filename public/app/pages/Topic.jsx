import React from 'react';
import {connect} from 'react-redux';
import {TopicBox} from './components_Topic/TopicBox.jsx';
import {TopicWall} from './components_Topic/TopicWall.jsx';
import {TopicExplore} from './components_Topic/TopicExplore.jsx';
import {TopicEditBrick} from './components_Topic/TopicEditBrick.jsx';
import {TopicRecords} from './components_Topic/TopicRecords.jsx';
import {EndingBar} from './components_Topic/EndingBar.jsx';
import {ModalBackground} from './components_General/ModalBackground.jsx';
import {initialPosition} from '../tools/specialForTopic.js';
import {positionChangeSubmit, EditedContentSubmit, RecycleBrickSubmit} from '../actions/Topic.js';

class Topic extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      topicStatus: "wall",
      exploreStatus: null,
      isEditing: false,
      isEditingOld: false,
      editingPosition: [],
      focusPosition: [initialPosition(this.props.topicData[this.props.params.topicId]).row, initialPosition(this.props.topicData[this.props.params.topicId]).index],
      searchResult: false
    };
    this.topicId = this.props.params.topicId;
    this.open_EditBrickCol = this.open_EditBrickCol.bind(this);
    this.open_TopicExplore = this.open_TopicExplore.bind(this);
    this.open_EndRecords = this.open_EndRecords.bind(this);
    this.close_TopicExplore = this.close_TopicExplore.bind(this);
    this.close_EditBrickCol = (event) => {event.preventDefault();event.stopPropagation();this.setState({isEditing: false, isEditingOld: false, editingPosition: []})}
    this.set_EditingPosition = (clickedBrickRow, clickedBrickIndex, cellSource) => this.setState({isEditingOld: cellSource === "newBrick" ? false : true, editingPosition: [clickedBrickRow, clickedBrickIndex], focusPosition: [clickedBrickRow, clickedBrickIndex]})
    this.search_SubTopic = (searchResult) => this.state.searchResult ? this.setState({searchResult: false}) : this.setState({searchResult: searchResult});
    this.handle_dispatch_EditedContentSubmit = (subEditorData, hashTagObj, hyphenObj, questionMarkobj) => this.props.dispatch(EditedContentSubmit(subEditorData, hashTagObj, hyphenObj, questionMarkobj, this.state.editingPosition[0], this.state.editingPosition[1], this.topicId, this.props.userData.userName));
    this.handle_dispatch_positionChangeSubmit = (originIndex, originRow, newIndex, newRow) => this.props.dispatch(positionChangeSubmit(originIndex, originRow, newIndex, newRow, this.topicId, this.props.userData.userName));
    this.handle_dispatch_RecycleBrickSubmit = (clickedBrickRow, clickedBrickIndex) => this.props.dispatch(RecycleBrickSubmit(clickedBrickRow, clickedBrickIndex, this.topicId, this.props.userData.userName));
    this.handle_Drop_CellFocus = (newIndex, newRow) => this.setState({focusPosition: [newRow, newIndex]});
  }

  open_EditBrickCol(clickedBrickRow, clickedBrickIndex, cellSource){
    let editingOld = cellSource === "newBrick" ? false : true ;
    this.setState({isEditing: true, isEditingOld: editingOld, editingPosition: [clickedBrickRow, clickedBrickIndex], focusPosition: [clickedBrickRow, clickedBrickIndex], searchResult: false})
  }

  open_TopicExplore(event){
    this.setState({topicStatus: "explore", exploreStatus: "world", isEditing: false, isEditingOld: false, searchResult: false})
  }

  open_EndRecords(event){
    event.preventDefault();
    event.stopPropagation();
    this.setState({topicStatus: "end-records", focusPosition: [], searchResult: false})
  }

  close_TopicExplore(event){
    event.preventDefault();
    event.stopPropagation();
    let focusPosition = !this.state.isEditingOld ? this.state.focusPosition : [initialPosition(this.props.topicData[this.props.params.topicId]).row, initialPosition(this.props.topicData[this.props.params.topicId]).index];
    this.setState({topicStatus: "wall", exploreStatus: null, isEditing: false, isEditingOld: false, editingPosition: [], focusPosition: focusPosition});
  }

  componentWillReceiveProps(nextProps){
    console.log('Topic will Receive Props')
    if(this.state.isEditing){
      this.setState({isEditing: false, isEditingOld: false, editingPosition: []})
    }
  }

  render(){
    console.log('enter page Topic')
    let topicThis = this.props.topicData[this.topicId];

    return(
        <section className="topic">
          <div className="topic-base">
            <TopicBox
              topicThis={topicThis}
              topicId={this.topicId}
              topicStatus={this.state.topicStatus}
              isEditing={this.state.isEditing}
              focusPosition={this.state.focusPosition}
              editingPosition={this.state.editingPosition}
              open_TopicExplore={this.open_TopicExplore}
              open_EditBrickCol={this.open_EditBrickCol}
              set_EditingPosition = {this.set_EditingPosition}
              search_SubTopic={this.search_SubTopic}/>
            {this.state.topicStatus==="wall"&&
              <div className="topic-base-container-wall">
                <TopicWall
                  topicThis = {topicThis}
                  topicId={this.topicId}
                  searchResult={this.state.searchResult}
                  open_EditBrickCol={this.open_EditBrickCol}
                  handle_dispatch_positionChangeSubmit={this.handle_dispatch_positionChangeSubmit}
                  handle_dispatch_RecycleBrickSubmit={this.handle_dispatch_RecycleBrickSubmit}
                  />
              </div>
            }
            {this.state.topicStatus==="explore"&&
              <div className="topic-base-container-rightcol">
                <TopicExplore
                  exploreStatus={this.state.exploreStatus}
                  isEditing={this.state.isEditing}
                  close_TopicExplore={this.close_TopicExplore}/>
              </div>
            }
            {
              this.state.isEditing &&
              <div className="topic-base-container-centralcol-small">
                  <ModalBackground className="topic-base-container-centralcol-small-background">
                    <TopicEditBrick
                      topicThis={topicThis}
                      isEditingOld={this.state.isEditingOld}
                      editingPosition={this.state.editingPosition}
                      close_EditBrickCol={this.close_EditBrickCol}
                      handle_dispatch_EditedContentSubmit={this.handle_dispatch_EditedContentSubmit}
                      />
                  </ModalBackground>
              </div>
            }
            {
              this.state.topicStatus==="wall" &&
              <EndingBar
                topicStatus={this.state.topicStatus}
                open_EndRecords={this.open_EndRecords}/>
            }
            {
              this.state.topicStatus==='end-records' &&
              <div className="topic-base-container-leftcol">
                <ModalBackground className="topic-base-container-leftcol-background">
                  <TopicRecords/>
                </ModalBackground>
              </div>
            }
          </div>
        </section>
    )
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
  Topic
)
