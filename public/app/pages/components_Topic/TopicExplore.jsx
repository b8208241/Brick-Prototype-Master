import React from 'react';

export class TopicExplore extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      exploreStatus: "world"
    };
    this.set_explorestatus_world = () => this.setState({exploreStatus: "world"})
  }

  render(){
    return(
      <div className="topic-explore">
        <div className="topic-explore-panel-exploreoption">
          <span onClick={this.set_explorestatus_world}>Explore</span>
          <span>Clips</span>
          <span onClick={this.props.close_TopicExplore}>Back</span>
        </div>
      </div>
    )
  }
}
