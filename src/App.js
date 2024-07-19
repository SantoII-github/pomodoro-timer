import './App.scss';
import Clock from './components/Clock';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Pomodoro Timer</h1>
        <Clock />
      </header>
    </div>
  );
}

export default App;
