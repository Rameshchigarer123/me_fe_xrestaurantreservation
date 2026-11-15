import React, { useEffect, useRef, useState } from "react";

// A simple custom dropdown. The wrapper <div> carries the id (state / city)
// so it can be found by tests; options are <li role="option"> items.
export default function Dropdown({
  id,
  placeholder,
  options,
  value,
  onChange,
  disabled = false,
  loading = false,
}) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const choose = (option) => {
    onChange(option);
    setOpen(false);
  };

  return (
    <div
      id={id}
      ref={wrapperRef}
      className={`dropdown${disabled ? " dropdown-disabled" : ""}`}
    >
      <button
        type="button"
        className="dropdown-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
      >
        <span className={value ? "" : "dropdown-placeholder"}>
          {value || placeholder}
        </span>
        <span className="dropdown-caret" aria-hidden="true">
          ▾
        </span>
      </button>

      {open && (
        <ul role="listbox" className="dropdown-list">
          {options.length === 0 ? (
            <li className="dropdown-empty">
              {loading ? "Loading..." : "No options available"}
            </li>
          ) : (
            options.map((option) => (
              <li
                key={option}
                role="option"
                aria-selected={option === value}
                onClick={() => choose(option)}
              >
                {option}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
