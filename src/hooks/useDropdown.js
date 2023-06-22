import { useState } from "react";
const useDropdown = (initialValue) => {
  const [selectedkey, setSelectedKey] = useState();

  const onChangeHandler = (key) => {
    setSelectedKey(key);
  };

  return { selectedkey, onChangeHandler };
};

export default useDropdown;
