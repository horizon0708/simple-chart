import * as React from "react";
import ModelColorPicker from "./modelColorPicker/modelColorPicker";

interface DataInputProps {
  onValueChange: (e: React.FormEvent<HTMLElement>) => void;
  onKeyChange: (e: React.FormEvent<HTMLElement>) => void;
  name: string | number;
  value: number;
  values?: number[];
  onValueChangeWithY?: (e: React.FormEvent<HTMLElement>) => void;
  color: any;
  onColorChange: (color:any) => void;
  onDelete: (e:React.MouseEvent<HTMLElement>)=>void;
}

export const DataInput = (props: DataInputProps) => {
  const { onKeyChange, onValueChange, name, value, values, onValueChangeWithY } = props;

  const renderY =()=>{
    if(values){
      return values.map((x,i)=>{
        return  <div className="column">
            <div className="field has-addons">
                <div className="control">
                    <input
                        value={x[i]}
                        onChange={onValueChangeWithY}
                        className="customInput"
                        type="text"
                        placeholder="Text input"
                    />
                </div>
                <div className={"control"}>
                    <i style={{fontSize: "1em"}} className="fa fa-minus-circle" aria-hidden="true" onClick={props.onDelete}/>

                </div>
            </div>
        </div>
      })
    }
    return <div className="column" style={{position:"relative"}}>
        <div className="field has-addons">
            <div className="control">
                <input
                    value={value}
                    onChange={onValueChange}
                    className="customInput"
                    type="text"
                    placeholder="Text input"
                />
            </div>

        </div>
        <div className={"control"} style={{
            position:"absolute" ,
            display:"flex",
            flexDirection:"column",
            justifyContent:"center",
            top:"0px",
            right: "0px",
            height: "36px"
        }}>
            <i style={{fontSize: "1em"}} className="fa fa-minus-circle" aria-hidden="true" onClick={props.onDelete}/>

        </div>
    </div>
  };

  return (
    <div className="columns is-gapless is-mobile" style={{margin: "0 0"}}>

        <div className={"column is-6"} style={{margin: "0 0"}}>
        <div className="field has-addons">
          <div className="control">
                <ModelColorPicker color={props.color} onChange={props.onColorChange}/>
    </div>
            <div className="control">
            <input
              onChange={onKeyChange}
              value={name}
              className="customInput"
              type="text"
              placeholder="Text input"
            />

          </div>

        </div>
      </div>
        {renderY()}
    </div>
  );
};
