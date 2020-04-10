import React, { Component } from 'react';
import echarts from 'echarts';
import _ from 'lodash';
import { Table } from 'antd';
import 'echarts/map/js/china';
import styles from './index.less';

export default class DkAnalysis extends Component {
  componentDidMount() {
    setTimeout(() => {
      const { options } = this.props;
      this.echarts = echarts.init(this.refs.echart);
      this.echarts.clear();
      this.echarts.setOption(options || {});
      window.onresize = () => this.echarts.resize();
    }, 1000);
  }

  componentWillReceiveProps(nextProps) {
    if (!_.eq(this.props, nextProps)) {
      const { options } = nextProps;
      this.echarts && this.echarts.clear();
      this.echarts && this.echarts.setOption(options || {});
    }
  }
  render() {
    const { columns, data } = this.props;
    return (
      <div className={styles.dkAnalysis}>
        <div ref="echart" style={{ height: 350 }}></div>
        <Table
          columns={columns}
          dataSource={data}
          size="small"
          rowKey="name"
          pagination={false}
        />
      </div>
    );
  }
}
