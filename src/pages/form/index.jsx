import React, { Component } from "react";
import CFormCreate from "./CWrappedForm";
import Input from "./Input";

class CForm extends Component {
	constructor(props) {
		super(props);
		console.log(props);
		this.state = {};
	}

	handleSubmit() {
		this.props.validateFields();
	}

	render() {
		const { getFieldDecorator } = this.props;
		return (
			<div>
				{getFieldDecorator("username", { require: true, message: "请输入用户名" })(
					<Input type="text" placeholder="请输入用户名" />
				)}
				{getFieldDecorator("password", { require: true, message: "请输入密码" })(
					<Input type="password" placeholder="请输入密码" />
				)}
				<button onClick={this.handleSubmit.bind(this)}>提交</button>
			</div>
		);
	}
}

export default CFormCreate(CForm);
