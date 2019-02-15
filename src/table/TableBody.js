import React, {Component} from 'react';

class TableBody extends Component {
    render() {
        const {columns, data} = this.props;
        return data.map((row, i) => (
            <tr key={i}>
                {columns.map(cell => {
                    if (!isNaN(row[cell])) {
                        return <div className='row'>
                            <td>{row[cell]}</td>
                        </div>
                    } else return <td>{row[cell]}</td>
                })}
            </tr>
        ));
    }
}

export default TableBody;
