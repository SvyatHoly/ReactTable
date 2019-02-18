import React, {Component} from 'react';

class TableBody extends Component {
    render() {
        const {columns, data, modMax} = this.props;
        return data.map((row, i) => (
            <tr key={i}>
                {columns.map(cell => {
                    if (!isNaN(row[cell])) {
                        const val = Math.round(row[cell]*100/modMax);
                        let sign = '+';
                        if (val<0) sign = '-';
                        return <td className='numbers'>
                        {sign+Math.abs(val)+' п.п.'}
                            <div className='chart'>
                                <div className={'bg-'+sign+val}>
                                </div>
                                <div className={'bar-'+val}/>
                            </div>
                        </td>
                    } else return <td className='text'>{row[cell]}</td>
                })}
            </tr>
        ));
    }
}

export default TableBody
