import React from 'react';
import { Component } from 'react';


class StateTest extends Component {

    constructor(props) {
        super(props)
        this.state = {
            count: 0
        }
    }

    componentDidMount() {
        document.getElementById("add").addEventListener("click", () => {
            this.setState({count: this.state.count + 1})
            console.log("原生++", this.state.count)
            this.setState({count: this.state.count + 1})
            console.log("原生++", this.state.count)
            this.setState({count: this.state.count + 1})
            console.log("原生++", this.state.count)
            this.setState({count: this.state.count + 1})
            console.log("原生++", this.state.count)
            this.setState({count: this.state.count + 1})
            console.log("原生++", this.state.count)
            this.setState({count: this.state.count + 1})
            console.log("原生++", this.state.count)
        })
    }

    add = () => {
        this.setState({count: this.state.count + 1})
        console.log(this.state.count)
        setTimeout(() => {
            this.setState({count: this.state.count + 1})
            console.log(this.state.count)
            this.setState({count: this.state.count + 1})
            console.log(this.state.count)
            this.setState({count: this.state.count + 1})
            console.log(this.state.count)
        }, 0)
        this.setState({count: this.state.count + 1})
        console.log(this.state.count)
    }
    subtract = () => {
        this.setState({count: this.state.count - 1})
    }

    render() {
        return (
            <div>
                <p>{this.state.count}</p>
                <button onClick={this.add}>+</button>
                <button onClick={this.subtract}>-</button>

                <button id="add">原生+</button>
            </div>
        )
    }
}

export default StateTest