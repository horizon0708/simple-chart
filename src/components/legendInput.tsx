import * as React from "react";

export interface LegendInputProps {
  onChange: (e: React.FormEvent<HTMLElement>) => void;
  parameter: string;
  value: number;
  label?: string | null;
}

const LegendInput = (props: LegendInputProps) => {
  return (
    <div className="field">
      <label className="label">
        {props.label || props.parameter}
      </label>
      <div className="control">
        <input
          value={props.value}
          onChange={props.onChange}
          className="input"
          type="text"
          placeholder="Text input"
        />
      </div>
    </div>
  );
};

export { LegendInput };
