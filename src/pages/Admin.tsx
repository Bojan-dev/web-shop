import NotFound from './NotFound';
import {
  LinksWrapper,
  AdminNavLink,
  AdminFormsWrapper,
} from '../components/admin/styles';
import { Outlet } from 'react-router-dom';
import { useGetCurrentUser } from '../store/login-ctx';

const Admin = () => {
  const { isAdmin } = useGetCurrentUser();

  if (!isAdmin) return <NotFound />;

  return (
    <>
      <LinksWrapper>
        <AdminNavLink
          className={({ isActive }) => (isActive ? 'active' : '')}
          to="new-product"
        >
          Add New Product
        </AdminNavLink>
        <AdminNavLink
          className={({ isActive }) => (isActive ? 'active' : '')}
          to="add-type"
        >
          Add Products Type
        </AdminNavLink>
        <AdminNavLink
          className={({ isActive }) => (isActive ? 'active' : '')}
          to="add-group"
        >
          Add Products Group
        </AdminNavLink>
        <AdminNavLink
          className={({ isActive }) => (isActive ? 'active' : '')}
          to="add-promotion"
        >
          Add Promotion
        </AdminNavLink>
      </LinksWrapper>
      <AdminFormsWrapper>
        <Outlet />
      </AdminFormsWrapper>
    </>
  );
};

export default Admin;
