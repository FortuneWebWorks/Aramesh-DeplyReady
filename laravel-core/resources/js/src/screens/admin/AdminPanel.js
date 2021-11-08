import React, { useCallback, useState } from 'react';
import { Link } from '@inertiajs/inertia-react';
import AdminPanelHeader from '../../components/AdminPanelHeader';
import FolderIcon from '../../svg_components/FolderIcon';
import themeSession from '../../sessions/themeSession';

const AdminPanel = () => {

  const [light, setLight] = useState(themeSession().getSession());
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  
  let logo;
  if(!light) {
    logo = <FolderIcon style={{ fill: '#f4f4f4' }} className="admin-files-logo"/>
  } else {
    logo = <FolderIcon className="admin-files-logo"/>;
  }

  const darkModeChange = () => {
    themeSession().setSession(!light);
    setLight(!light);
    forceUpdate();
  }

  return (
    <div className="admin-panel-container">
      <AdminPanelHeader title="عنوان تست"/>
      <div className="container">
        <p className="admin-panel-title">خوش آمدید</p>

        <Link href="/admin/files" className="admin-files-container">
          <p className="admin-files-title">وارد شدن به قسمت فایل ها</p>
          {logo}
        </Link>
        <div className="admin-panel-card">
          <div className="admin-panel-card-title">
            <p className="admin-panel-card-title-name">دکتر ایپسوم</p>
            <p className="seperator"></p>
            <p className="admin-panel-card-title-clinic-num">کلینیک شماره 2</p>
          </div>
          <div className="admin-panel-card-body">
            <div className="admin-panel-card-body-text-container">
              <p>تعداد بیمار</p>
              <p>:</p>
              <p>24</p>
            </div>
            <div className="admin-panel-card-body-text-container">
              <p>تعداد پرونده</p>
              <p>:</p>
              <p>8</p>
            </div>
          </div>
        </div>

        {/* Toggler */}
        <div className="admin-panel-darkmode-container">
          <p>حالت {light ? 'تاریک' : 'روشن'}</p>
          <label className="label toggle">
            <input type="checkbox" className="toggle_input" checked={light} onChange={(e) => darkModeChange(e)}/>
            <div className="toggle-control"></div>
          </label>
        </div>
      </div>
    </div>
  )
}

export default AdminPanel;
