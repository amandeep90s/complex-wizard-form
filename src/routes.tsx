import { BrowserRouter, Route, Routes } from 'react-router';
import { EmployeeHistory } from './features/employee/history/page';
import { EmployeePersonalInfo } from './features/employee/personal-info/page';
import { EmployeeSkills } from './features/employee/skills/page';
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
          <Route
            path="/employee/history"
            element={<EmployeeHistory />}
          />
          <Route
            path="/employee/skills"
            element={<EmployeeSkills />}
          />
          <Route path="/employee/additional-info" />
          <Route path="/employee/review" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export { RoutesWrapper };
