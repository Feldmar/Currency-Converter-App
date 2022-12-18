import { useState } from "react";

const ButtonToggle = ({ onClick, defaultValue }) => {
  const [isOff, setIsOff] = useState(defaultValue || false);
  return (
    <button onClick={() => {
      setIsOff(!isOff)
      onClick();
    }}>{isOff ? 'ON' : 'OFF'}</button>
  )
}
export default ButtonToggle;
