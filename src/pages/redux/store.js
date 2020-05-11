import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

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

export default createStore(reducer, applyMiddleware(logger, thunk));
