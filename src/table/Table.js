import React, {Component} from 'react';
import TableBody from "./TableBody";
import TableHead from "./TableHead";

class Table extends Component {

    render() {
        const {data, modMax, sortBy} = this.props;
        const columns = Object.keys(data[0]);
        return (
            <table>
                <thead>
                <TableHead columns={columns} sortBy={sortBy}/>
                </thead>
                <tbody>
                <TableBody columns={columns} modMax={modMax} data={data}/>
                </tbody>
            </table>
        );
    }
}

export default Table;