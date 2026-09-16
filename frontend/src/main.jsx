import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import AdminApp from './AdminApp.jsx';
import './styles.css';
const RootApp = window.location.pathname.startsWith('/admin') ? AdminApp : App;
ReactDOM.createRoot(document.getElementById('root')).render(<React.StrictMode><RootApp/></React.StrictMode>);
