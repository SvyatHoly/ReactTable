import React, {Component} from 'react';
import SberData from './resources/data.json'
import Table from "./table/Table";
import memoize from "memoize-one";

const data = SberData;

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: data,
            normalData: [{}],
            filterText: ""
        }
    }

    filter = memoize(
        (list, filterText) => list.filter(item => item.text.includes(filterText))
    );

    componentDidMount() {
        this.normalizeData();
    }

    sortBy = (column) => {
        const {normalData} = this.state;

        function sortByKey(array, key) {
            return array.sort(function (a, b) {
                const x = a[key];
                const y = b[key];
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });
        }

        const sortData = sortByKey(normalData, column);

        console.log(sortData);
        this.setState({
            normalData: sortData,
            filterText: '1'
        });
    };

    normalizeData = () => {
        const columnNames = this.state.data.fa.fa_data.axis.r;
        const dataArray = this.state.data.fa.fa_data.r;
        const dataAmount = this.state.data.fa.fa_data.r.length;
        const normalData = [];
        for (let i = 0; i < dataAmount; i++) {
            const object = {};
            dataArray[i].axis.r.forEach((el, index) => {
                const key = columnNames[index].sAxisName;
                object[key] = el.sName_RU;
                object['Отклонение от плана'] = dataArray[i].fDeltaPlan;
                object['Валюта'] = dataArray[i].sMeasDelta_RU;
            });
            normalData.push(object);
        }
        return this.setState({normalData});
    };

    render() {
        return (
            <div className='App'>
                <div className='container'>
                <Table data={this.state.normalData} sortBy={this.sortBy}/>
                </div>
            </div>
        );
    }
}

export default App;