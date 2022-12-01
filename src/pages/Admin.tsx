import useSetDocTitle from '../hooks/useSetDocTitle';
import NotFound from './NotFound';
import { LinksWrapper, AdminFormsWrapper } from '../components/admin/styles';
import AdminPageBtn from '../components/admin/AdminPageBtn';
import { Outlet } from 'react-router-dom';
import { useGetCurrentUser } from '../store/login-ctx';

const pages = ['new-product', 'products-type', 'products-group', 'promotion'];

const Admin = () => {
  useSetDocTitle('Admin');
  const { isAdmin } = useGetCurrentUser();

  if (!isAdmin) return <NotFound />;

  return (
    <>
      <LinksWrapper>
        {pages.map((btn) => (
          <AdminPageBtn key={btn} btn={btn} />
        ))}
      </LinksWrapper>
      <AdminFormsWrapper>
        <Outlet />
      </AdminFormsWrapper>
    </>
  );
};

export default Admin;
