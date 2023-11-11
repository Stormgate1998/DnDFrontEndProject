import React, { ChangeEvent, useState } from "react";
import InputBox from "./InputBox";

interface RandomRollerProps {
  maxNumber: number;
  numberOfRolls: number;
  name: string;
  boxValue: number;
  onBoxChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const RandomInputBox: React.FC<RandomRollerProps> = ({
  maxNumber,
  numberOfRolls,
  name,
  boxValue,
  onBoxChange,
}) => {
  const [rolls, setRolls] = useState<number[]>([]);

  const handleRoll = () => {
    const newRolls = Array.from(
      { length: numberOfRolls },
      () => Math.floor(Math.random() * maxNumber) + 1
    );
    setRolls(newRolls);
  };

  return (
    <div className="container-sm">
      <div className="border my-3 rounded-3">
        <div className="row">
          <div className="col-md-4">
            <InputBox
              name={name}
              type="number"
              value={boxValue}
              onChange={onBoxChange}
            />
          </div>
          <div className="col-md-4">
            <button className="btn btn-primary" onClick={handleRoll}>
              Roll
            </button>
          </div>
          <div className="col-md-4">
            {rolls.length > 0 && <p>{rolls.map((roll) => roll).join(" ")}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RandomInputBox;
