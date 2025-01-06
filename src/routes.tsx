import { BrowserRouter, Route, Routes } from 'react-router';
import { EmployeePersonalInfo } from './features/employee/personal-info/page';
import { EmployeeWrapper } from './features/employee/wrapper/page';
import { DashboardLayout } from './features/layout/components/dashboard-layout';

const RoutesWrapper = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<DashboardLayout />}
        />
        <Route
          path="/employee"
          element={<EmployeeWrapper />}>
          <Route
            path="/employee/personal-info"
            element={<EmployeePersonalInfo />}
          />
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
