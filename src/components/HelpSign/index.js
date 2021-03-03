import React from 'react';

import { TooltipIcon } from '../../assets/icons';
import './index.css';

export function HelpSign({ className }) {
  return (
    <div className={`help ${className ? className : ''}`}>
      <TooltipIcon />
    </div>
  )
}
