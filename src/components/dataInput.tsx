import * as React from "react";

interface DataInputProps {
  onValueChange: (e: React.FormEvent<HTMLElement>) => void;
  onKeyChange: (e: React.FormEvent<HTMLElement>) => void;
  name: string | number;
  value: number;
}

export const DataInput = (props: DataInputProps) => {
  const { onKeyChange, onValueChange, name, value } = props;
  return (
    <div className="columns">
      <div className="column">
        <div className="field">
          <div className="control">
            <input
              onChange={onKeyChange}
              value={name}
              className="input"
              type="text"
              placeholder="Text input"
            />
          </div>
        </div>
      </div>
      <div className="column">
        <div className="field">
          <div className="control">
            <input
              value={value}
              onChange={onValueChange}
              className="input"
              type="text"
              placeholder="Text input"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
