import React, { Component } from 'react';
import Routes from './routes';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import './global.css'

class App extends Component {
  state ={
    darkMode: false,
    modeLabel: 'Dark Mode',
  }

  handleTheme = () => {
    const { darkMode } = this.state;
    const newLabel = darkMode? 'Dark Mode': 'White Mode';
    this.setState((prevState) => ({
      darkMode: !prevState.darkMode,
      modeLabel: newLabel,
    }));

    document.body.style.backgroundColor = darkMode ?  '#f0f0f5' : '#111111';
  }

  render(){
    const { darkMode, modeLabel } = this.state;
    
    const appTheme = darkMode ? 'dark-mode': 'white-mode';
    return (
      <div className={appTheme}>
        <nav className={`nav-bar ${appTheme} `}>
          <div className={`nav-content ${appTheme}`}>
          <FormControlLabel
            control={<Switch onChange={this.handleTheme}/>}
            label={modeLabel}
          />
          </div>
        </nav>
        <Routes />
      </div>
    )
  }
}

export default App;
