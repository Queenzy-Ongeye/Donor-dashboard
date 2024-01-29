import React, { useState } from "react";

function ActionButton(props: any) {
  const [working, setWorking] = useState(false);

  const onClick = async (...args: any) => {
    setWorking(true);
    try {
      await props.onClick(...args);
    } finally {
      setWorking(false);
    }
  };

  const { disabled, ...otherProps } = props;

  return (
    <button {...otherProps} onClick={onClick} disabled={disabled || working} />
  );
}

export default ActionButton;
