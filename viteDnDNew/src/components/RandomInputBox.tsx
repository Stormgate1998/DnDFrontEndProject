import React, { ChangeEvent, useState } from "react";
import InputBox from "./inputBox";

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
    <div>
      <InputBox
        name={name}
        type="number"
        value={boxValue}
        onChange={onBoxChange}
      />
      <button onClick={handleRoll}>Roll</button>
      {rolls.length > 0 && <p>{rolls.map((roll) => roll).join(" ")}</p>}
    </div>
  );
};

export default RandomInputBox;
