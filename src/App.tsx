import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { useEffect, lazy } from 'react';
import { Suspense } from 'react';

import LoginProvider from './store/login-ctx';

import Loading from './components/UI/Loading';
import Navigation from './components/navigation/Navigation';
import Main from './pages/Main';
import NotFound from './pages/NotFound';
import Container from './components/UI/Container';

const SignIn = lazy(() => import('./pages/SignIn'));
const SignUp = lazy(() => import('./pages/SignUp'));
const Admin = lazy(() => import('./pages/Admin'));
const NewProducts = lazy(() => import('./components/admin/NewProducts'));
const AddProductsGroup = lazy(
  () => import('./components/admin/AddProductsGroups')
);
const AddProductType = lazy(() => import('./components/admin/AddProductType'));
const AddPromotion = lazy(() => import('./components/admin/AddPromotion'));

function App() {
  useEffect(() => {
    document.addEventListener(
      'dragover',
      (event) => {
        event.preventDefault();
      },
      false
    );
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <LoginProvider>
          <Navigation />
          <Container>
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/admin-panel" element={<Admin />}>
                  <Route path="new-product" element={<NewProducts />} />
                  <Route
                    path="products-group"
                    element={<AddProductsGroup />}
                  ></Route>
                  <Route path="products-type" element={<AddProductType />} />
                  <Route path="promotion" element={<AddPromotion />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </Container>
        </LoginProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
