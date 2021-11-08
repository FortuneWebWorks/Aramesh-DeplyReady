import React from 'react'
import Logo from '../svg/logo.svg'

const AdminPanelHeader = ({title}) => {
  return (
    <div className="admin-panel-header-container">
      <img src={Logo} className="admin-panel-header-container-logo" alt="Brand Logo"/>
      <h1 className="admin-panel-header-container-title">{title}</h1>
    </div>
  )
}

export default AdminPanelHeader
