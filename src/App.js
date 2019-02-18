import React, {Component} from 'react';
import SberData from './resources/data.json'
import Table from "./table/Table";

const data = SberData;

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: data,
            normalData: [{}],
            modMax: 0,
            sortDirection: 0
        }
    }

    componentDidMount() {
        this.normalizeData();
    }

    sortBy = (column) => {
        const {normalData} = this.state;
        let {sortDirection} = this.state;

        function sortByKey(array, key) {
            return array.sort(function (a, b) {
                const x = a[key];
                const y = b[key];
                if (sortDirection === 0) {
                    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                } else {
                    return ((x > y) ? -1 : ((x < y) ? 1 : 0));
                }
            });
        }

        const sortData = sortByKey(normalData, column);
        sortDirection = this.state.sortDirection === 1 ? 0 : 1;
        console.log(sortDirection);
        this.setState({
            normalData: sortData,
            sortDirection
        });
    };

    normalizeData = () => {
        if (this.state.data.fa.fa_data.axis.r!==null &&
            this.state.data.fa.fa_data.axis.r!==undefined &&
            this.state.data.fa.fa_data.r!== null &&
            this.state.data.fa.fa_data.r!== undefined) {
            const columnNames = this.state.data.fa.fa_data.axis.r;
            const dataArray = this.state.data.fa.fa_data.r;
            const dataAmount = this.state.data.fa.fa_data.r.length;
            const normalData = [];
            let modMax = 0;
            for (let i = 0; i < dataAmount; i++) {
                const object = {};
                dataArray[i].axis.r.forEach((el, index) => {
                    const key = columnNames[index].sAxisName.toUpperCase();
                    object[key] = el.sName_RU;
                });
                object['ВАЛЮТА'] = dataArray[i].sMeasDelta_RU;
                object['ОТКЛОНЕНИЕ ОТ ПЛАНА, П.П.'] = dataArray[i].fDeltaPlan;
                modMax = Math.max(modMax, Math.abs(dataArray[i].fDeltaPlan));

                normalData.push(object);
            }
            return this.setState({normalData, modMax});
        } else (console.log('data is undefined'))
    };

    render() {
        return (
            <div className='App'>
                <div className='container'>
                    <Table data={this.state.normalData} modMax={this.state.modMax} sortBy={this.sortBy}/>
                </div>
            </div>
        );
    }
}

export default App;