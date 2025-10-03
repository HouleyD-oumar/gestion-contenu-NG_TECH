import Sidebar from './Sidebar';
import Header from './Header';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="dashboard-layout">
    <Sidebar />
    <div className="main-content">
      <Header />
      <main>{children}</main>
    </div>
  </div>
);

export default DashboardLayout;