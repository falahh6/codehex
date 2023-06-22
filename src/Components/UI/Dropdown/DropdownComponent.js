import React from "react";
import Select from "react-select";

const DropdownComponent = ({
  dropdownHook,
  items,
  dropdownStyle,
  onOptionSelect,
}) => {
  const { selectedKey, onChangeHandler } = dropdownHook;

  const options = items.map((item) => ({
    value: item.key,
    label: item.label,
    extension: item.extension,
  }));

  const handleChange = (selectedOption) => {
    onChangeHandler(selectedOption.value);
    onOptionSelect(selectedOption);
  };

  return (
    <Select
      options={options}
      value={options.find((option) => option.value === selectedKey)}
      onChange={handleChange}
      className={dropdownStyle}
      maxMenuHeight
    />
  );
};

export default DropdownComponent;
