import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';


function redirect(){
  window.location.href = "/logout"
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( <App logout={redirect} /> );