import React from 'react';
import {TagList} from './TagList.jsx';
import {QuestionList} from './QuestionList.jsx';
import {HyphenList} from './HyphenList.jsx';

export class SubTopic extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      listDisplay: false,
      tagList: false,
      questionList: false,
      hyphenList: false
    }
  }

  render(){
    return(
      <div className="topic-subtopic">
        <div className={this.state.listDisplay? "topic-subtopic-controlbar-displaying" : "topic-subtopic-controlbar"}>
          <span onClick={(event) => this.setState({listDisplay: true, tagList: true, questionList: false, hyphenList: false})}>#</span>
          <span onClick={(event) => this.setState({listDisplay: true, tagList: false, questionList: false, hyphenList: true})}>{"-"}</span>
          <span onClick={(event) => this.setState({listDisplay: true, tagList: false, questionList: true, hyphenList: false})}>{"?"}</span>
        </div>
        {
          this.state.listDisplay &&
          <div className="topic-subtopic-list">
            {
              this.state.tagList&&
              <TagList
                topicThis={this.props.topicThis}
                handle_Click_Tag={this.props.search_SubTopic}/>
            }
            {
              this.state.questionList&&
              <QuestionList
                questions={this.props.topicThis.questions}
                handle_Click_Question={this.props.search_SubTopic}/>
            }
            {
              this.state.hyphenList&&
              <HyphenList
                hyphens={this.props.topicThis.hyphens}
                handle_Click_Hyphen={this.props.search_SubTopic}/>
            }
          </div>
        }
        <div className="topic-subtopic-explore" style={this.state.listDisplay?{top: "5%"}:null}>
          <span onClick={this.props.open_TopicExplore}>Explore</span>
        </div>
      </div>
    )
  }
}
