import logo from '../logo.svg';
import '../App.css';
import Navbar from '../components/NavBar';

interface MakerProps {}

export const CharacterMaker: React.FC<MakerProps>  = () => {
  return (
    <div className="App">
        <Navbar/>
      <header className="App-header">
        
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Here's where making a character will be implemented
        </p>
      </header>
    </div>
  );
}