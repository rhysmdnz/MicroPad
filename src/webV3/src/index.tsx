import 'material-icons-font/material-icons-font.css';
import 'materialize-css/dist/css/materialize.min.css';
import 'jquery/dist/jquery.slim.js';
import 'materialize-css/dist/js/materialize.js';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { IStoreState } from './types';
import { applyMiddleware, createStore } from 'redux';
import { BaseReducer } from './reducers/BaseReducer';
import HeaderComponent from './components/header/HeaderComponent';
import { Provider } from 'react-redux';
import { epicMiddleware } from './epics';
import { composeWithDevTools } from 'redux-devtools-extension';
import * as localforage from 'localforage';

const baseReducer: BaseReducer = new BaseReducer();
export const store = createStore<IStoreState>(
	baseReducer.reducer,
	baseReducer.initialState,
	composeWithDevTools(applyMiddleware(epicMiddleware)));

export const NOTEPAD_STORAGE = localforage.createInstance({
	name: 'MicroPad',
	storeName: 'notepads'
});

export const ASSET_STORAGE = localforage.createInstance({
		name: 'MicroPad',
		storeName: 'assets'
});

Promise.all([NOTEPAD_STORAGE.ready(), ASSET_STORAGE.ready()])
	.then(() => ReactDOM.render(
		<Provider store={store}>
			<HeaderComponent />
		</Provider>,
		document.getElementById('root') as HTMLElement
	));

registerServiceWorker();