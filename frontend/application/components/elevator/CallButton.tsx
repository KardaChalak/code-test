import * as React from "react";

interface IProperties {
    // TODO: call should have the functions interface
    call: any;
    floor: number;
}

const CallButton: React.SFC<IProperties> = ({ call, floor}) => {
  return (
    <button onClick={(e) => call(e)} name={name}>
      {floor}
    </button>
  );
};

export default CallButton;
