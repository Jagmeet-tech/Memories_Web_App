import React from "react";
import ReactDOM  from "react-dom";
import { Provider } from "react-redux";
import {createStore,applyMiddleware,compose} from "redux";
import thunk from "redux-thunk";
import "./index.css";

import reducers from "./reducers";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";

const store = createStore(reducers,compose(applyMiddleware(thunk)));

ReactDOM.render(
    <Provider store={store}>
        <GoogleOAuthProvider clientId="<GOOGLE_CLIENT_ID>">
            <App/>
        </GoogleOAuthProvider>    
    </Provider>
,document.getElementById("root")); 