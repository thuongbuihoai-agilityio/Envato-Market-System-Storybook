import { Route, RouteObject, Routes } from 'react-router-dom';
import { Routers } from './routes';
import { Suspense } from 'react';

// Layouts
import MainLayout from './Layouts/MainLayout';

// Providers
import { ChakraProvider } from '@providers/index';

// Styles
import './App.css';

const App = () => {
  return (
    <ChakraProvider>
      <Routes>
        <Route element={<MainLayout />}>
          {Routers.map(({ path, element }: RouteObject) => (
            <Route
              key={path}
              path={path}
              element={
                //TODO: Implement Loading component later
                <Suspense fallback={<p>Loading...</p>}>{element}</Suspense>
              }
            />
          ))}
        </Route>
      </Routes>
    </ChakraProvider>
  );
};

export default App;
