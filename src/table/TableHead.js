import React, {Component} from 'react';

class TableHead extends Component {
    render() {
        const {columns} = this.props;
        return (
            <tr key='key'>
                {columns.map(header => {
                    return <th>
                        <button onClick={() => this.props.sortBy(header)}>
                            {header}
                        </button>
                    </th>;
                })}
            </tr>
        );
    }
}

export default TableHead;