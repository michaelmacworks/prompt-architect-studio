import React from 'react';
import {hydrateRoot} from 'react-dom/client';
import {App} from './App.jsx';
import {aliases} from './content.js';
const path=window.location.pathname.replace(/\/$/,'') || '/';
hydrateRoot(document.getElementById('root'),<App pageRoute={aliases[path] || path}/>);
