/** @jsx h */
import { h, JSX } from 'preact';
import * as styles from '../routes/results.module.less'
import { Option } from "./select.component"


type CheckboxProps = {
  groupName: string
  fields: Option[]
  filterName: string
  changeHandler:(event,name) => void 
  checkedBoxes: string[]
}

const CheckboxGroup = (props: CheckboxProps):JSX.Element => {
  return (
    <fieldset>
        <legend 
          className={styles["legend-class"]} 
          id={props?.groupName}>
            {props?.groupName}
        </legend>
        {
          props?.fields.map( field =>(
            <div 
              class={styles["fldset-class"]} 
              id={'fld-'+field?.value}
            >
              <input 
                type="checkbox" 
                id={field?.value} 
                name={field?.value} 
                value={field?.value}
                checked = { props?.checkedBoxes.find((ch) => (ch === field?.value))?true:false } 
                onChange={(event) => props.changeHandler(event,props.filterName)}
              />
              <label 
                for={field?.value}>
                  {field?.description}
              </label>
            </div>
          ))
        }
    </fieldset>
  )
}

export default CheckboxGroup