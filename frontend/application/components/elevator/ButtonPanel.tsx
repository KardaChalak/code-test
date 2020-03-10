import * as React from "react";

import CallButton from "./CallButton";
// import * as css from "./ButtonPanel.module.scss";

interface IProperties {
  nButtons: number;
  call: any;
}

class ButtonPanel extends React.Component<IProperties> {

  public render() {
    const {nButtons, call} = this.props;

    const items = [];

    for (let i = 0; i < nButtons; i++) {
      items.push(<CallButton call={call} floor={i}/>);
    }

    return (
      <div>
        {items}
      </div>
    );
  }
}

export default ButtonPanel;
