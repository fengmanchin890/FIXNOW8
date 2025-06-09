import { Route, Switch } from 'wouter';
import Header from './components/Header';
import Home from './pages/Home';
import UserDashboard from './pages/UserDashboard';
import ArtisanDashboard from './pages/ArtisanDashboard';
import BookingFlow from './pages/BookingFlow';
import TrackingPage from './pages/TrackingPage';
import FeatureDemo from './pages/FeatureDemo';
import FeatureTest from './pages/FeatureTest';
import ArtisanAuth from './pages/ArtisanAuth';
import UserAuth from './pages/UserAuth';
import UserSchedule from './pages/UserSchedule';
import UserRecords from './pages/UserRecords';
import ArtisanAvailability from './pages/ArtisanAvailability';
import ArtisanIncome from './pages/ArtisanIncome';
import ArtisanSkills from './pages/ArtisanSkills';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/user" component={UserDashboard} />
        <Route path="/user/auth" component={UserAuth} />
        <Route path="/user/schedule" component={UserSchedule} />
        <Route path="/user/records" component={UserRecords} />
        <Route path="/artisan" component={ArtisanDashboard} />
        <Route path="/artisan/auth" component={ArtisanAuth} />
        <Route path="/artisan/availability" component={ArtisanAvailability} />
        <Route path="/artisan/income" component={ArtisanIncome} />
        <Route path="/artisan/skills" component={ArtisanSkills} />
        <Route path="/book" component={BookingFlow} />
        <Route path="/track/:orderId" component={TrackingPage} />
        <Route path="/demo" component={FeatureDemo} />
        <Route path="/test" component={FeatureTest} />
      </Switch>
    </div>
  );
}

export default App;