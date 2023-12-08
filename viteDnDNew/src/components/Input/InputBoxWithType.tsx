import React, { ChangeEvent } from "react";

interface CustomInputProps<T> {
  name: keyof T;
  type: string;
  value: string | number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
const InputBoxWithType: <T>(
  props: CustomInputProps<T>
) => React.ReactElement = ({ name, type, value, onChange }) => {
  return (
    <div className="row my-3">
      <div className="col-md-6">
        <label className="form-label">{name.toString()}:</label>
      </div>
      <div className="col-md-4">
        <input
          className="form-control"
          type={type}
          name={name.toString()}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default InputBoxWithType;
