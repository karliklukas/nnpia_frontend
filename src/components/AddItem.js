import React, { Component } from 'react'
import './style.css';

export class AddItem extends Component {
    state = {
        item: ''
    }
    handleChange = (e) => {
        this.setState({
            item: e.target.value
        });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addItem(this.state);
        this.setState({
            item: ''
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Add a new item:</label><br />
                    <input type="text" className="inputAdd" onChange={this.handleChange} value={this.state.item} />
                    <button className="btn btn-info float-sm-right" type="submit">Add item</button>
                </form>
            </div>
        )
    }
}