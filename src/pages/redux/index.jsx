import React, { Component } from "react";
import store from "./store";

export default class TestRedux extends Component {

    componentDidMount() {
        store.subscribe(() => {
            this.forceUpdate()
        })
    }

	render() {
		return (
			<div>
				{store.getState()}
				<button onClick={() => store.dispatch({ type: "add" })}>+</button>
				<button onClick={() => store.dispatch({ type: "minus" })}>-</button>
			</div>
		);
	}
}
