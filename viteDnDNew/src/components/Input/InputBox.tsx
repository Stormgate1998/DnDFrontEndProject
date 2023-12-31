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
    <div className="row my-3">
      <div className="col-md-6">
        <label className="form-label">{name}:</label>
      </div>
      <div className="col-md-4">
        <input
          className="form-control"
          type={type}
          name={name}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default InputBox;
