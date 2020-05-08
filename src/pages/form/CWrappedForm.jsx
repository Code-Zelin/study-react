import React, { Component } from "react";

function CFormCreate(CompForm) {
	return class extends Component {
		constructor(props) {
			super(props);

			this.state = {};
			this.check = {};
		}

		/**
		 * 校验
		 */
		validateFields = () => {
			console.log("根据设置的数据，校验表单", this.state, this.check);
			for (let key in this.check) {
				console.log(key);
				const item = this.state[key];
				const itemRules = this.check[key];
				if (itemRules.require && !item) {
					alert(itemRules.message);
					return false;
				}
			}
			console.log("校验成功！");
		};

		validateField = (name) => {
			const rule = this.check[name];

			if (rule.require && !this.state[name]) {
				this.setState({
					[name + "_message"]: rule.message,
				});
				return false;
			}
			return true;
		};

		getFieldDecorator = (name, rules) => {
			const that = this;
			console.log(that);
			that.check[name] = rules;

			// 装饰器，装饰input等表单组件
			return (CompForm) => {
				return (
					<div>
						{React.cloneElement(CompForm, {
							name,
							value: that.state[name],
							onChange(e) {
								that.setState(
									{
										[name]: e.target.value,
									},
									() => {
										that.validateField(name);
									}
								);
							},
						})}

						{this.state[`${name}_message`] && (
							<p
								style={{
									color: "red",
									margin: "0 0 10px 0",
									fontSize: 12,
								}}
							>
								{this.state[`${name}_message`]}
							</p>
						)}
					</div>
				);
			};
		};

		render() {
			return (
				<CompForm
					validateFields={this.validateFields}
					getFieldDecorator={this.getFieldDecorator}
					{...this.props}
				/>
			);
		}
	};
}

function CWrappedForm() {
	return <div></div>;
}

export default CFormCreate;
