import React, {Component} from "react";
import * as PropTypes from "prop-types";

export class SorterBar extends Component {
    render() {
        return <>
            <div className="form-check form-check-inline">
                <label className="form-check-label">Order</label>
                <select className="custom-select mx-2" value={this.props.sortType} onChange={this.props.onChangeType}>
                    <option value="asc">Asc</option>
                    <option value="desc">Desc</option>
                </select>
            </div>
            <div className="form-check form-check-inline">
                <label className="form-check-label">By</label>
                <select className="custom-select mx-2" value={this.props.sortBy} onChange={this.props.onChangeBy}>
                    {this.props.data.map(item => {
                        return <option key={item.key} value={item.key}>{item.label}</option>
                    })
                    }

                </select>
            </div>
        </>;
    }
}

SorterBar.propTypes = {
    sortType: PropTypes.string,
    onChangeType: PropTypes.func,
    sortBy: PropTypes.string,
    onChangeBy: PropTypes.func,
    data: PropTypes.any
};