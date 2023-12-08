import React, { ChangeEvent } from "react";
import { Character } from "../../objects/Character";
import InputBoxWithType from "./InputBoxWithType";

interface RandomRollerProps<T> {
  maxNumber: number;
  numberOfRolls: number;
  name: keyof T;
  boxValue: number;
  onBoxChange: (event: ChangeEvent<HTMLInputElement>) => void; // New prop to receive the list of rolls
  setRollsList: React.Dispatch<React.SetStateAction<number[]>>; // New prop to set rollsList
}

const RandomInputBoxWithType: React.FC<RandomRollerProps<Character>> = ({
  maxNumber,
  numberOfRolls,
  name,
  boxValue,
  onBoxChange,
  setRollsList,
}) => {
  const handleRoll = () => {
    const newRolls = Array.from(
      { length: numberOfRolls },
      () => Math.floor(Math.random() * maxNumber) + 1
    );

    // Calculate the sum of the three biggest values
    const sumOfTop3 = newRolls
      .sort((a, b) => b - a)
      .slice(0, 3)
      .reduce((acc, val) => acc + val, 0);

    // Update the InputBox value using onBoxChange
    onBoxChange({
      target: {
        name,
        value: sumOfTop3,
      },
    } as unknown as ChangeEvent<HTMLInputElement>);

    // Set the rollsList using setRollsList prop
    setRollsList(newRolls);
  };

  return (
    <div className="container-sm">
      <div className="">
        <div className="row">
          <div className="col-md-6">
            <InputBoxWithType<Character>
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

export default RandomInputBoxWithType;
