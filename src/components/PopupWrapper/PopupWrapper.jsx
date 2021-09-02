import React, { useCallback, useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import "./PopupWrapper.scss";

const PopupWrapper = ({
  popupOpen,
  setPopupOpen,
  className,
  children,
  ...otherProps
}) => {
  const popupEl = useRef();

  const onClose = useCallback(
    (e) => {
      if (popupOpen && popupEl.current && !popupEl.current.contains(e.target)) {
        setPopupOpen(false);
        console.log("call onClose");
      }
      e.stopPropagation();
    },
    [popupOpen, setPopupOpen, popupEl]
  );

  useEffect(() => {
    document.addEventListener("mousedown", onClose);
    return () => {
      document.removeEventListener("mousedown", onClose);
    };
  }, [onClose]);

  return (
    <div
      className={`PopupWrapper ${popupOpen ? "active" : ""} ${
        className ? className : ""
      }`}
      {...otherProps}
    >
      <div ref={popupEl} className="PopupWrapper__wrapper">
        <div
          className="PopupWrapper__close"
          onClick={() => setPopupOpen(false)}
        >
          <IoClose className="logo-md" />
        </div>
        {children}
      </div>
    </div>
  );
};

export default PopupWrapper;
