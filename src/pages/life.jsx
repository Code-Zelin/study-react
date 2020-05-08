import React from "react";
import { Component } from "react";

export default class LifeCompoent extends Component {
	state = {
		number: 1,
	};

	constructor(props) {
		super(props);
	}

    // 根据nextProps和prevState计算出预期的状态改变，返回结果会被送给setState
	static getDerivedStateFromProps(nextProps, prevState) {
        console.log("getDerivedStateFromProps", nextProps, prevState);
        return {
            number: prevState.number + 1
        }
	}

	getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log("getSnapshotBeforeUpdate", prevProps, prevState);
    }
    
    componentDidUpdate(props, state, snapshot) {
        console.log(props, state, snapshot)
    }

	render() {
		return (
			<div>
				<h3>{this.props.title}</h3>
				<p>当前为: {this.state.number}</p>
			</div>
		);
	}
}
