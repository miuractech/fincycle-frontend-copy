import React from 'react';
import dcycleLogoPath from '../assets/logo.png';
import dcycleSquarePath from '../assets/Dcyclesquare.svg';
import XcycleLogoPath from '../assets/xcycle.jpg';
type Props = {
  className?: string;
  style?: React.CSSProperties;
};

export function DcycleLogo({ className, style }: Props) {
  return <img src={dcycleLogoPath} className={className} style={style} alt="Dcycle" tabIndex={0} />;
}

export {dcycleLogoPath, dcycleSquarePath, XcycleLogoPath}