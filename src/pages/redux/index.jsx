import React, { Component } from "react";
import store from "./store";

export default class TestRedux extends Component {
	componentDidMount() {
		store.subscribe(() => {
			this.forceUpdate();
		});
	}

	render() {
		return (
			<div>
				{store.getState()}
				<button onClick={() => store.dispatch({ type: "add" })}>+</button>
				<button onClick={() => store.dispatch({ type: "minus" })}>-</button>
				<button
					onClick={() =>
						store.dispatch((dispatch) => {
							setTimeout(() => {
								dispatch({ type: "add" });
								dispatch({ type: "add" });
							}, 1000);
						})
					}
				>
					异步+
				</button>
			</div>
		);
	}
}
