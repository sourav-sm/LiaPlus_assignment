import LoginForm from './Login';
import SignupForm from './Signup';
import Navbar from '../components/Navbar';

const Home = () => (
  <div>
    <Navbar />
    <div className="container mx-auto p-4">
      <LoginForm />
      <SignupForm />
    </div>
  </div>
);

export default Home;
