import logo from '../logo.svg';
import '../App.css';
import Navbar from '../components/NavBar';

interface ViewerProps {}

export const CharacterViewer : React.FC<ViewerProps> = () => {
  return (
    <div className="App">
        <Navbar/>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Here's where viewing a character will be implemented
        </p>
      </header>
    </div>
  );
}