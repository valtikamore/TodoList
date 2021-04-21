import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppRedux from "./components/App/AppRedux";
import {Provider} from "react-redux";
import {store} from "./state/redux/store";


//redux - ducks
ReactDOM.render(
    <Provider store={store}>
        <AppRedux />
    </Provider> ,  document.getElementById('root'));


