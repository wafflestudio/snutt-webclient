import React from 'react';

import IconWrapper from './IconWrapper.jsx';
import { ReactComponent as ArrowUpFocusNormal } from 'assets/ic-arrow-up-focused.svg';
import { ReactComponent as ArrowUpFocusHover } from 'assets/ic-arrow-up-focused-over.svg';
import { ReactComponent as ArrowDownNormal } from 'assets/ic-arrow-down-normal.svg';
import { ReactComponent as ArrowDownHover } from 'assets/ic-arrow-down-over.svg';
import { ReactComponent as ArrowDownFocusNormal } from 'assets/ic-arrow-down-focused.svg';

const arrowRenderer = ({ isOpen }) =>
  isOpen ? (
    <IconWrapper
      normalIcon={<ArrowUpFocusNormal />}
      hoveredIcon={<ArrowUpFocusHover />}
    />
  ) : (
    <IconWrapper
      normalIcon={<ArrowDownNormal />}
      hoveredIcon={<ArrowDownHover />}
      focusedIcon={<ArrowDownFocusNormal />}
    />
  );

export default arrowRenderer;
