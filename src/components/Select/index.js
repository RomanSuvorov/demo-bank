import React, { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ArrowSmallDownIcon, ArrowSmallUpIcon } from '../../assets/icons';
import './index.css';

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

function DropdownList({ show, value, options, withAlt, lang, onChoose }) {
  return (
    <div className={`select_list ${show ? 'show' : ''}`}>
      {
        options.map(option => (
          <Option
            selected={value}
            key={option.value}
            id={option.value}
            value={option.value}
            text={option.translation && option.translation[lang] ? option.translation[lang] : null}
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

export function Select({
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
  const { i18n } = useTranslation('translation');
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
        title={(withAlt && initialOpt && initialOpt.translation && initialOpt.translation[i18n.language]) ? initialOpt.translation[i18n.language] : null}
      >
        {
          initialOpt ? (
            <>
              {initialOpt.Icon && <initialOpt.Icon />}
              {initialOpt.iconUrl && <img className={"select_selected__logoImg"} src={initialOpt.iconUrl} alt={initialOpt.value} />}
              <span className={`select_selected__text ${initialOpt.Icon || initialOpt.iconUrl ? 'withIcon' : ''}`}>
                {initialOpt && initialOpt.translation && initialOpt.translation[i18n.language] ? initialOpt.translation[i18n.language] : null}
              </span>
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
        lang={i18n.language}
        onChoose={handleChooseOption}
      />
    </div>
  )
}
