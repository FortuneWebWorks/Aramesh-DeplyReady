import React, { useState } from 'react';
import SearchBar from '../../components/admin/SearchInput';
import SortdownIcon from '../../svg/sort-down.svg';
import AdminPanelHeader from '../../components/AdminPanelHeader';
import themeSession from '../../sessions/themeSession';
import FolderIcon from '../../svg_components/FolderIcon';
import { Link } from '@inertiajs/inertia-react'

const ListItem = ({ familyName, testNum, id }) => {

  const light = themeSession().getSession();

  let folderLogo = <FolderIcon className="list-item-icon"/>;

  if(!light) {
    folderLogo = <FolderIcon style={{ color: '#f4f4f4' }} className="list-item-icon"/>
  }

  return (
    <div className="list-item">
      <p className="family-name">{familyName}</p>
      <div className="test-num-container">
        <p className="test-num">{testNum === 2 ? 'تست دوم' : 'تست اول'}</p>
        <p className="seperator"></p>
      </div>
      <Link href={`/admin/charts/${id}`}> {folderLogo} </Link>
    </div>
  );
};

const AdminPanelFiles = (props) => {
  
  const [families, setFamilies] = useState(props.users);

  const search = (e) => {
    const filteredFamilies = props.users.filter(user => user.name.includes(e.target.value))
    setFamilies(filteredFamilies);
  }

  return (
    <div className="admin-panel-files-container">
      <AdminPanelHeader title="عنوان تست" />

      <section className="admin-panel-files">
        <p className="admin-panel-files-title">فایل ها</p>

        <div className="file-list-container">
          <div className="file-list-header">
            <SearchBar onChange={search}/>
            {/* <div className="sorting-container">
              <img src={SortdownIcon} className="sorting-icon"/>
              <p className="sorting-title">منظم کردن بر اساس</p>
            </div> */}
          </div>
          <div className="list-items-container">
            {
              families.map((user, index) => {
                return <ListItem key={`family-${index}`} familyName={user.name} id={user.id}/>
              })
            }

          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminPanelFiles;
