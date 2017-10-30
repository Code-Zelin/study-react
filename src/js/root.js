import React, { Component } from 'react'
import ReactDom from 'react-dom'
import PCIndex from './components/pc_index'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'


export default class Root extends Component{
    render(){
        return (
            <div>
                <PCIndex/>
            </div>
        )
    }
}

ReactDom.render(
    <Root/>,
    document.getElementById('mainContainer')
);