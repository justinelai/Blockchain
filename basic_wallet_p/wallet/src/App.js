import React from 'react';
import { Route } from "react-router-dom";
import Feed from './components/Feed'


function App() {
  return (
    <div>
      <Route exact path="/" component={Feed} />
    </div>
  );
}

export default App;
