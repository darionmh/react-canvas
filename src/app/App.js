import React, {Component} from 'react';
import Editor from "../components/Editor";

class App extends Component {
  render() {
    return (
      <div className="App noSelect">
        <header className="App-header">
        </header>
        <Editor/>
      </div>
    );
  }
}

export default App;
