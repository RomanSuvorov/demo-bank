import React from 'react';

import { TooltipIcon } from '../../assets/icons';
import './HelpSign.css';

function HelpSign({ className }) {
  return (
    <div className={`help ${className ? className : ''}`}>
      <TooltipIcon />
    </div>
  )
}

export { HelpSign };
