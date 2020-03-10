import * as React from "react";

import Floor from "./Floor";
// import * as css from "./ButtonPanel.module.scss";

interface IProperties {
  nFloors: number;
  elevatorPosition: number;

}

class Elevator extends React.Component<IProperties> {

  public render() {
    const {nFloors, elevatorPosition} = this.props;

    const items = [];

    for (let i = 0; i < nFloors ; i++) {
      items.push(<Floor name={i} color={elevatorPosition === i ? true : false}/>);
    }

    return (
      <div>
        {items}
      </div>
    );
  }
}

export default Elevator;
