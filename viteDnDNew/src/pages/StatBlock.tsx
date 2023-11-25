import React, { ChangeEvent, useEffect, useState } from "react";
import RandomInputBox from "../components/RandomInputBox";

interface StatProps {
  attributeName: string;
  boxValue: number;
  onBoxChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
const StatBlock: React.FC<StatProps> = ({
  attributeName,
  boxValue,
  onBoxChange,
}) => {
  const [sum, setSum] = useState<number | null>(null);
  const [list, setList] = useState<number[]>([]);

  useEffect(() => {
    if (list) {
      const sortedList = list.slice().sort((a, b) => b - a);
      const sumOfThreeBiggest = sortedList
        .slice(0, 3)
        .reduce((acc, val) => acc + val, 0);
      setSum(sumOfThreeBiggest);
    }
  }, [list]);

  return (
    <div className="border my-3 rounded-3">
      <RandomInputBox
        maxNumber={6}
        numberOfRolls={4}
        name={attributeName}
        boxValue={boxValue}
        onBoxChange={onBoxChange}
        setRollsList={setList}
      />
      {sum !== null && sum !== 0 && <p>{sum}</p>}
    </div>
  );
};

export default StatBlock;
