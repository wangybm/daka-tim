import React, { Component } from 'react';
import echarts from 'echarts';
import _ from 'lodash';
import styles from './index.less';

export default class DkEchart extends Component {
  constructor(props) {
    super(props);
    this.echart = null;
  }

  componentDidMount() {
    setTimeout(() => {
      this.echart = echarts.init(this.refs.myEchart);
      this.echart.clear();
      this.echart.setOption(this.props.options);
      window.addEventListener('resize', this.resizeEchart);
    }, 1000);
  }

  componentWillReceiveProps(nextProps) {
    if (!_.eq(this.props, nextProps)) {
      this.echart && this.echart.clear();
      this.echart && this.echart.setOption(nextProps.options);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeEchart);
  }

  resizeEchart = () => this.echart.resize();
  render() {
    return <div ref="myEchart" className={styles.echart}></div>;
  }
}
