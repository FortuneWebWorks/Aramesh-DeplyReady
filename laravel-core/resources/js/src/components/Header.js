import React from 'react';
import { Link } from '@inertiajs/inertia-react';

const Header = ({title, backTo, noBack}) => {
  return (
    <header className="header" style={{justifyContent: noBack ? 'center' : ''}}>
      <h4 className="header-text" style={{paddingRight: noBack ? '0' : ''}}>{title}</h4>
      {!noBack ? <Link href={backTo} className="header-back-btn"></Link> : ''}
    </header>
  )
}

export default Header;
