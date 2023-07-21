import React from "react";
import { Select } from "antd";

const { Option } = Select;

const DropdownComponent = ({
  dropdownHook,
  items,
  dropdownStyle,
  onOptionSelect,
  maxMenuHeight,
  placeHolder,
}) => {
  const { selectedKey, onChangeHandler } = dropdownHook;

  const handleChange = (selectedOption) => {
    onChangeHandler(selectedOption);
    onOptionSelect(selectedOption);
    console.log(selectedOption);
  };

  if (!items || !Array.isArray(items) || items.length === 0) {
    return null; // Or render a default state, or a message indicating no items available
  }

  return (
    <Select
      showSearch
      value={selectedKey}
      onChange={handleChange}
      className={dropdownStyle}
      dropdownRender={(menu) => <div>{menu}</div>}
      optionFilterProp="label"
      filterOption={(input, option) =>
        option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
      placeholder={placeHolder}
      listHeight={maxMenuHeight}
    >
      {items.map((item) => (
        <Option key={item.key} value={item.key} label={item.label}>
          {item.label}
        </Option>
      ))}
    </Select>
  );
};

export default DropdownComponent;
