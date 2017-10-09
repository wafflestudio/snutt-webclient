import React from 'react';

import IconWrapper from './IconWrapper.jsx';
import ArrowUpFocusNormal from '../../../assets/ic-arrow-up-focused.svg';
import ArrowUpFocusHover from '../../../assets/ic-arrow-up-focused-over.svg';
import ArrowDownNormal from '../../../assets/ic-arrow-down-normal.svg';
import ArrowDownHover from '../../../assets/ic-arrow-down-over.svg';
import ArrowDownFocusNormal from '../../../assets/ic-arrow-down-focused.svg';

const arrowRenderer = ({ isOpen }) => (
  isOpen ?
    <IconWrapper
      normalIcon={<ArrowUpFocusNormal />}
      hoveredIcon={<ArrowUpFocusHover />}
    /> :
    <IconWrapper
      normalIcon={<ArrowDownNormal />}
      hoveredIcon={<ArrowDownHover />}
      focusedIcon={<ArrowDownFocusNormal />}
    />
);

export default arrowRenderer;
