import React, { ChangeEvent } from "react";

interface CustomInputProps {
  name: string;
  value: string | number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  options: string[];
}

export const InputBox: React.FC<CustomInputProps> = ({
  name,
  value,
  onChange,
  options,
}) => {
  return (
    <div className="row my-3">
      <div className="col-md-6">
        <label className="form-label">{name}:</label>
      </div>
      <div className="col-md-4">
        <select
          className="form-control"
          name="Class"
          value={value}
          onChange={() => onChange}
        >
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default InputBox;
