/** @jsx h */
import { h, JSX } from 'preact';
import * as styles from '../routes/results.module.less'
import { Option } from "./select.component"


type RadioGroupProps = {
  groupName: string
  fields: Option[]
  filterName: string
  changeHandler:(event,name) => void
  checkedBoxes: string[] 
}

const RadioGroup = (props: RadioGroupProps):JSX.Element => {
  return (
    <fieldset>
        <legend className={styles["legend-class"]} id={props?.groupName}>{props?.groupName}</legend>
        {
          props?.fields.map( field =>(
            <div class={styles["fldset-class"]} id={field?.value}>
              <input 
                type="radio" 
                id={`rating-${field?.value}`} 
                name="rating"
                checked = { props?.checkedBoxes.find((ch) => (ch === `rating-${field?.value}`))?true:false }
                onChange={(event) => props.changeHandler(event,props.filterName)}
              />
              <label for={`rating${field?.value}`}>{field?.description}</label>
            </div>
          ))
        }
    </fieldset>
  )
}

export default RadioGroup