import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import './styles.scss';

interface Props {
  background?: string;
  marginTop?: number | string;
  display?: string;
  justifyContent?: string;
  zIndex?: number;
  width?: number | string;
  height?: number | string;
  textAlign?: string;
  color?: string;
  animation?: Animation;
}

export enum Animation {
  BORDER = 'border',
  GROW = 'grow',
}

const Loader: React.FC<Props> = ({
  background = '',
  marginTop = '240px',
  display = 'flex',
  justifyContent = 'center',
  zIndex = 11,
  width = '40px',
  height = '40px',
  textAlign = 'center',
  color = '#f91880',
  animation = Animation.BORDER,
}) => {
  const containerStyle = {
    display,
    justifyContent,
    zIndex,
  } as React.CSSProperties;

  const spinnerStyle = {
    background,
    marginTop,
    zIndex,
    width,
    height,
    textAlign,
    color,
  } as React.CSSProperties;

  return (
    <div style={containerStyle}>
      <Spinner style={spinnerStyle} animation={animation} />
    </div>
  );
};

export default Loader;
