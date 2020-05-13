// import { createStore, applyMiddleware } from "redux";
// import thunk from "redux-thunk";
// import logger from "redux-logger";
import { createStore, applyMiddleware, fake_logger, fake_thunk } from "./fake/redux"

const reducer = function (state = 0, action) {
	switch (action.type) {
		case "add":
			return state + 1;
		case "minus":
			return state - 1;
		default:
			return state;
	}
};

export default createStore(reducer, applyMiddleware(fake_logger, fake_thunk));
