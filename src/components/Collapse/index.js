import React, { useState, Fragment } from 'react';

import { ArrowDownIcon, ArrowUpIcon } from '../../assets/icons';
import { Loading } from '../Loading';
import './index.css';

export function Collapse({
  loading = false,
  loadingText = '',
  className,
  expanded = false,
  title,
  description,
  isFixed = false,
}) {
  const [isExpanded, expandHandler] = useState(!!expanded);

  const handleExpand = () => {
      if(isFixed) return;
      expandHandler(!isExpanded)
  };

  return (
    <div className={`collapse ${className} ${loading ? 'load' : ''}`}>
      {
        loading ? (
          <Loading text={loadingText} withDots block />
        ) : (
          <Fragment>
            <div
              className={`collapse_header ${isFixed ? 'fixed' : ''}`}
              onClick={handleExpand}
            >
              {title}
              <div className={`collapse_header__arrow ${isFixed ? 'fixed' : ''}`}>
                {isExpanded ? <ArrowUpIcon /> : <ArrowDownIcon />}
              </div>
            </div>
            <div className={`collapse_description ${(isExpanded || isFixed) ? 'expanded' : ''}`}>
              {description}
            </div>
          </Fragment>
        )
      }
    </div>
  );
}
