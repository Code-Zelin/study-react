import React, { Component } from "react";
import { SProvider } from "./fake/react-redux";
import TestReactRedux from "./react-redux-index";
import store from "./store";

export default class ReduxOut extends Component {
	render() {
		return (
			<SProvider store={store}>
				<TestReactRedux />
			</SProvider>
		);
	}
}
