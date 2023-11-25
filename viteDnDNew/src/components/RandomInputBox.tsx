import React, { ChangeEvent } from "react";
import InputBox from "./InputBox";

interface RandomRollerProps {
  maxNumber: number;
  numberOfRolls: number;
  name: string;
  boxValue: number;
  onBoxChange: (event: ChangeEvent<HTMLInputElement>) => void; // New prop to receive the list of rolls
  setRollsList: React.Dispatch<React.SetStateAction<number[]>>; // New prop to set rollsList
}

const RandomInputBox: React.FC<RandomRollerProps> = ({
  maxNumber,
  numberOfRolls,
  name,
  boxValue,
  onBoxChange, // New prop to receive the list of rolls
  setRollsList, // New prop to set rollsList
}) => {
  const handleRoll = () => {
    const newRolls = Array.from(
      { length: numberOfRolls },
      () => Math.floor(Math.random() * maxNumber) + 1
    );
    setRollsList(newRolls); // Set the rollsList using setRollsList prop
  };

  return (
    <div className="container-sm">
      <div className="">
        <div className="row">
          <div className="col-md-6">
            <InputBox
              name={name}
              type="number"
              value={boxValue}
              onChange={onBoxChange}
            />
          </div>
          <div className="col-md-2">
            <button className="btn btn-primary" onClick={handleRoll}>
              Roll
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RandomInputBox;
