import { AdminNavLink } from './styles';

const AdminPageBtn: React.FC<{ btn: string }> = ({ btn }) => {
  const buttonText = btn
    .split('-')
    .map((word) => `${word[0].toUpperCase()}${word.slice(1, word.length)}`)
    .join(' ');

  return (
    <AdminNavLink
      className={({ isActive }) => (isActive ? 'active' : '')}
      to={btn}
    >
      Add {buttonText}
    </AdminNavLink>
  );
};

export default AdminPageBtn;
