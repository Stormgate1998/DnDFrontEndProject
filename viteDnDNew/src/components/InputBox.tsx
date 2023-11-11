import React, { ChangeEvent } from "react";

interface CustomInputProps {
  name: string;
  type: string;
  value: string | number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const InputBox: React.FC<CustomInputProps> = ({
  name,
  type,
  value,
  onChange,
}) => {
  return (
    <div>
      <label className="form-label">{name}:</label>
      <input
        className="form-control"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputBox;
