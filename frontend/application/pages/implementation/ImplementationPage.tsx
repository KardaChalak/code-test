import axios from "axios";
import * as React from "react";
// import API from "../../api/elevator"
import ButtonPanel from "../../components/elevator/ButtonPanel";
import Elevator from "../../components/elevator/Elevator";

import * as css from "./ImplementationPage.module.scss";

const URL = "http://localhost:3000";

interface IState {
  elevators?: [];
}
class ImplementationPage extends React.Component<IState> {

  private interval: any;
  constructor(props: any) {
    super(props);
    this.state = {
      elevators: [],
    };
  }

  public componentDidMount() {

    // Get elevators each 0.2 second
    this.interval = setInterval(() => {
      axios.get(`${URL}/elevators`).then((response) => {
        this.setState({
          elevators: response.data.elevators,
        });
        // console.log(response);
    }).catch(() => {
      // console.log(err);
    }); }, 200);

  }

  public componentWillUnmount() {
    clearInterval(this.interval);
  }

  public render() {

    return (
      <>
        <h2 className={css.title}>Lägg implementationen här</h2>
        {"Floor panel"} <br/>
        <br/>
        <ButtonPanel call={this.requestFloor} nButtons={20}/>
        <br/>
        {"Elevators"} <br/>
        <br/>
        {this.state.elevators.map((value: any, index: number) => <Elevator nFloors={20} elevatorPosition={value.floor} key={index}/>)}

      </>
    );
  }

  private requestFloor(floor: number) {
    axios.post(`${URL}/elevators/request`, {floor}).then((response) => {
      // console.log(response);
    }).catch((error) => {
      // console.log(error);
    });
  }
}

export default ImplementationPage;
