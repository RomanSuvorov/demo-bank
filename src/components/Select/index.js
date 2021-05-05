import React, { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ArrowSmallDownIcon, ArrowSmallUpIcon } from '../../assets/icons';
import './index.css';

function DropdownList({ show, value, options, withAlt, lang, onChoose }) {
  return (
    <div className={`select_list ${show ? 'show' : ''}`}>
      {
        options.map(option => {
          const isSelected = option.value === value;
          let text = '';

          if (option.translation && option.translation[lang]) {
            text = option.translation[lang];
          } else if (option.text) {
            text = option.text;
          } else {
            text = '';
          }

          return (
            <div
              key={option.value}
              title={(withAlt && text) ? text : null}
              className={`select_option${isSelected ? " select_option__selected" : ""}`}
              onClick={() => isSelected ? {} : onChoose(option.value)}
            >
              {option.Icon && <option.Icon id={option.id} />}
              {option.iconUrl && <img className={"select_option_logoImg"} src={option.iconUrl} alt={option.value} />}
              <span className={`select_option__text ${(option.Icon || option.iconUrl) ? 'withIcon' : ''}`}>{text ? text : ''}</span>
            </div>
          );
        })
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

  let initialOptText = '';
  if (!!initialOpt) {
    if (initialOpt.translation && initialOpt.translation[i18n.language]) {
      initialOptText = initialOpt.translation[i18n.language];
    } else if (initialOpt.text) {
      initialOptText = initialOpt.text;
    } else {
      initialOptText = '';
    }
  }

  return (
    <div
      ref={selectRef}
      className={`select ${className ? className : ''} ${showSelectList ? "show" : ""} ${disable ? 'disable' : ''}`}
      onClick={handleClick}
    >
      <div
        className="select_selected"
        title={(withAlt && !!initialOptText) ? initialOptText : null}
      >
        {
          initialOpt ? (
            <>
              {initialOpt.Icon && <initialOpt.Icon />}
              {initialOpt.iconUrl && <img className={"select_selected__logoImg"} src={initialOpt.iconUrl} alt={initialOpt.value} />}
              <span className={`select_selected__text ${initialOpt.Icon || initialOpt.iconUrl ? 'withIcon' : ''}`}>
                {!!initialOptText ? initialOptText : null}
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
