import { BrowserRouter, Route, Routes } from 'react-router';
import { DashboardLayout } from './features/layout/components/dashboard-layout';

const RoutesWrapper = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<DashboardLayout />}
        />
        <Route path="/employee">
          <Route path="/employee/personal-info" />
          <Route path="/employee/history" />
          <Route path="/employee/skills" />
          <Route path="/employee/additional-info" />
          <Route path="/employee/review" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export { RoutesWrapper };
