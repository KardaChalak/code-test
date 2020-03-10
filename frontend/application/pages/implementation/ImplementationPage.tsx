import * as React from "react";
import ButtonPanel from "../../components/elevator/ButtonPanel";
import Elevator from "../../components/elevator/Elevator";

import * as css from "./ImplementationPage.module.scss";

class ImplementationPage extends React.Component {
  public render() {
    return (
      <>
        <h2 className={css.title}>Lägg implementationen här</h2>
        {"Floor panel"} <br/>
        <br/>
        <ButtonPanel call={() => console.log("call")} nButtons={20}/>
        <br/>
        {"Elevators"} <br/>
        <br/>
        <Elevator nFloors={20} elevatorPosition={10}/>
        <Elevator nFloors={20} elevatorPosition={10}/>
        <Elevator nFloors={20} elevatorPosition={10}/>
        <Elevator nFloors={20} elevatorPosition={10}/>
        <Elevator nFloors={20} elevatorPosition={10}/>

      </>
    );
  }
}

export default ImplementationPage;
