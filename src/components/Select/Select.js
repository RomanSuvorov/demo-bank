import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { ArrowSmallDownIcon, ArrowSmallUpIcon } from '../../constants/icons';
import './Select.css';

function Option({ selected, id, value, text, Icon, onClick }) {
  const isSelected = selected === value;
  return (
    <div
      className={`select_option${isSelected ? " select_option__selected" : ""}`}
      onClick={() => isSelected ? {} : onClick(value)}
    >
      {Icon && <Icon id={id} />}
      <span className={`select_option_text ${Icon ? 'withIcon' : ''}`}>{text ? text : ''}</span>
    </div>
  );
}

function DropdownList({ show, value, options, onChoose }) {
  return (
    <div className={`select_list ${show ? 'show' : ''}`}>
      {
        options.map(option => (
          <Option
            selected={value}
            key={option.key}
            id={option.key}
            value={option.value}
            text={option.text}
            Icon={option.Icon}
            onClick={onChoose}
          />
        ))
      }
    </div>
  )
}

function Select({
  className,
  value,
  placeholder,
  options,
  disable,
  onChange,
}) {
  const selectRef = useRef(null);
  const [showSelectList, setSelectListVisibility] = useState(false);
  const initialOpt = options.find(item => item.value === value);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside)
  });

  function handleClickOutside(event) {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      setSelectListVisibility(false);
    }
  }

  function handleChooseOption(value) {
    setSelectListVisibility(false);
    onChange(value);
  }

  return (
    <div
      ref={selectRef}
      className={`select ${className ? className : ''} ${showSelectList ? "show" : ""}`}
      onClick={() => setSelectListVisibility(!showSelectList)}
    >
      <div className="select_selected">
        {
          initialOpt ? (
            <>
              {initialOpt.Icon && <initialOpt.Icon />}
              <span className={`select_selected__text ${initialOpt.Icon ? 'withIcon' : ''}`}>{initialOpt.text && initialOpt.text}</span>
            </>
          ) : (
            <span className={"select_selected__placeholder"}>{placeholder}</span>
          )
        }
      </div>
      <div className="select_icon">
        {showSelectList ? <ArrowSmallUpIcon /> : <ArrowSmallDownIcon />}
      </div>
      <DropdownList
        show={showSelectList}
        value={value}
        options={options}
        onChoose={handleChooseOption}
      />
    </div>
  )
}

Select.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      value: PropTypes.string,
      text: PropTypes.string,
      Icon: PropTypes.any,
    }),
  ),
  disable: PropTypes.bool,
  onChange: PropTypes.func,
};

Select.defaultProps = {
  value: '',
  placeholder: '',
  options: [{ value: '' }],
  disable: false,
  onChange: () => {},
};

export { Select };
