import * as React from "react";

interface IProperties {
    color: boolean;
    name: number;
}

const styleBlue = {
  backgroundColor: "blue",
};

const styleWhite = {
  backgroundColor: "white",
};

const Floor: React.SFC<IProperties> = ({color, name}) => {
  return (
    <button disabled style={color ? styleBlue : styleWhite}>
      {name}
    </button>
  );
};

export default Floor;
