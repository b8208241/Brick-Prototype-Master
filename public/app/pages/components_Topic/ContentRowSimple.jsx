import React from 'react';

export class ContentRowSimple extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    }
    this.set_EditingPosition = this.set_EditingPosition.bind(this);
    this.open_EditBrickCol= this.open_EditBrickCol.bind(this);
  }

  set_EditingPosition(event){
    event.preventDefault();
    event.stopPropagation();
    let clickedBrickIndex = Number($(event.target).attr('id').charAt(0));
    let clickedBrickRow = Number($(event.target).attr('id').charAt(1));
    let cellSource = $(event.target).attr('class')==='brick' ? "oldBrick" : "newBrick";
    this.props.set_EditingPosition(clickedBrickRow, clickedBrickIndex, cellSource);
  }

  open_EditBrickCol(event){
    event.preventDefault();
    event.stopPropagation();
    let clickedBrickIndex = Number($(event.target).attr('id').charAt(0));
    let clickedBrickRow = Number($(event.target).attr('id').charAt(1));
    let cellSource = $(event.target).attr('class')==='brick' ? "oldBrick" : "newBrick";
    this.props.open_EditBrickCol(clickedBrickRow, clickedBrickIndex, cellSource);
  }

  componentDidMount(){

  }

  componentDidUpdate(){

  }

  render(){
    console.log('enter ContentRow')
    let props = this.props
    let set_EditingPosition = this.set_EditingPosition
    let open_EditBrickCol = this.open_EditBrickCol
    let date = new Date();
    let time = date.getTime();

    const rowContent = this.props.rowRecord.map(
      function(obj){
        let cellClass = obj.class
        switch (obj.class) {
          case 'cell':
          if(props.editingPosition){
            cellClass = obj.index===(props.editingPosition[1]) ? "cell-focus" : obj.class;
          }

          return (
            <div
              key={obj.id}
              className={cellClass}
              id={"cell_" + String(obj.index) + String(obj.row) + "_" + obj.id}>
              <div
                className="brick"
                id={String(obj.index) + String(obj.row) + "_brick_" + obj.id}
                onClick={props.isEditing?set_EditingPosition:open_EditBrickCol}>
              </div>
            </div>
          );
            break;
          case 'cell-default':
            if(props.editingPosition){
              cellClass = obj.index===(props.editingPosition[1]) ? "cell-focus" : "cell-default-simple";
            }else{
              cellClass = props.focusPosition? props.focusPosition[1]===obj.index ? "cell-focus" : "cell-default-simple" : "cell-default-simple";
            }
            return (
              <div
                key={String(obj.index) + String(obj.row) + time}
                className={cellClass}
                id={String(obj.index) + String(obj.row) + obj.class}
                onClick={props.isEditing?set_EditingPosition:open_EditBrickCol}/>
            );
            break;
          default:
            return (
              <div
                key={String(obj.index) + String(obj.row) + time}
                className={obj.class}
                id={String(obj.index) + String(obj.row) + obj.class}/>
            );
            break;
          }
      }
    )


    return(
      <div id={this.props.id}>
        <div className="placeholder"></div>
        {rowContent}
      </div>
    )
  }
}
