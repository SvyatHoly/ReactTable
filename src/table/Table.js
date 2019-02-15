import React, {Component} from 'react';
import TableBody from "./TableBody";
import TableHead from "./TableHead";

class Table extends Component {

    render() {
        const data = this.props.data;
        const columns = Object.keys(data[0]);
        return (
            <table>
                <thead>
                <TableHead columns={columns} sortBy={this.props.sortBy}/>
                </thead>
                <tbody>
                <TableBody columns={columns} data={data}/>
                </tbody>
            </table>
        );
    }
}

export default Table;