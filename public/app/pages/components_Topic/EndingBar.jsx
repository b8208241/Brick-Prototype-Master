import React from 'react';

export class EndingBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }

  render(){
    return(
      <div className="topic-endingbar">
        <div onClick={this.props.open_EndRecords}>
          records
        </div>
        <div style={{float: "right"}}>SEAL</div>
        <div>Share</div>
      </div>
    )
  }
}
