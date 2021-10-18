import styles from "./Dropdown.module.css";
import { Column } from "../data-models/Column";

type DropdownProps = {
  options: string[] | Column[];
  handleChange: Function;
  widthPct: number;
  selectedValue: number | string;
};

const Dropdown = (props: DropdownProps) => {
  const { options, handleChange, widthPct, selectedValue } = props;

  return (
    <div className={styles.DropdownContainer} style={{ width: `${widthPct}%` }}>
      <select
        onChange={e => {
          handleChange(e.target.value);
        }}
        value={selectedValue}
      >
        {options.map((option, index) => {
          if (typeof option === "string") {
            return (
              <option value={option} key={index}>
                {option}
              </option>
            );
          } else {
            return (
              <option value={option.metadataName} key={index}>
                {option.displayName}
              </option>
            );
          }
        })}
      </select>
    </div>
  );
};

export default Dropdown;
