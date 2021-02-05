import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { ArrowSmallDownIcon, ArrowSmallUpIcon } from '../../constants/icons';
import './Select.css';

function Option({ selected, id, value, text, Icon, iconUrl, withAlt, onClick }) {
  const isSelected = selected === value;
  return (
    <div
      title={(withAlt && text) ? text : null}
      className={`select_option${isSelected ? " select_option__selected" : ""}`}
      onClick={() => isSelected ? {} : onClick(value)}
    >
      {Icon && <Icon id={id} />}
      {iconUrl && <img className={"select_option_logoImg"} src={iconUrl} alt={value} />}
      <span className={`select_option__text ${(Icon || iconUrl) ? 'withIcon' : ''}`}>{text ? text : ''}</span>
    </div>
  );
}

function DropdownList({ show, value, options, withAlt, onChoose }) {
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
            iconUrl={option.iconUrl}
            withAlt={withAlt}
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
  withAlt = true,
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

  const handleClick = () => {
    if (disable) return;

    setSelectListVisibility(!showSelectList)
  }

  return (
    <div
      ref={selectRef}
      className={`select ${className ? className : ''} ${showSelectList ? "show" : ""} ${disable ? 'disable' : ''}`}
      onClick={handleClick}
    >
      <div
        className="select_selected"
        title={(withAlt && initialOpt && initialOpt.text) ? initialOpt.text : null}
      >
        {
          initialOpt ? (
            <>
              {initialOpt.Icon && <initialOpt.Icon />}
              {initialOpt.iconUrl && <img className={"select_selected__logoImg"} src={initialOpt.iconUrl} alt={initialOpt.value} />}
              <span className={`select_selected__text ${initialOpt.Icon || initialOpt.iconUrl ? 'withIcon' : ''}`}>{initialOpt.text && initialOpt.text}</span>
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
        withAlt={withAlt}
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
      iconUrl: PropTypes.any,
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
