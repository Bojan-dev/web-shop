import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';

import LoginProvider from './store/login-ctx';

import Navigation from './components/navigation/Navigation';
import Main from './pages/Main';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';
import Container from './components/UI/Container';
import NewProducts from './components/admin/NewProducts';
import AddProductsGroup from './components/admin/AddProductsGroups';
import AddProductType from './components/admin/AddProductType';
import AddPromotion from './components/admin/AddPromotion';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <LoginProvider>
          <Navigation />
          <Container>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/admin-panel" element={<Admin />}>
                <Route path="new-product" element={<NewProducts />} />
                <Route path="add-group" element={<AddProductsGroup />}></Route>
                <Route path="add-type" element={<AddProductType />} />
                <Route path="add-promotion" element={<AddPromotion />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Container>
        </LoginProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
