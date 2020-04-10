import React, { Component } from 'react';
import { connect } from 'umi';
import { Radio, Row, Col } from 'antd';
import { formatDate } from '@/utils/util';
import DkCard from '@/components/dkCard/index';
import DkFilter from '@/components/dkFilter/index';
import { cardMap, popMap, trendMap, msgOptions } from './map';
import styles from './index.less';

const { Group, Button } = Radio;

class MessageStatistics extends Component {
  type = 'Private';
  activeType = 'Upside';

  componentDidMount() {
    this.getMessageDsm({
      conversation: this.type,
      date: formatDate(),
    });
  }

  handleTypeChange = e => {
    this.type = e.target.value;
    this.activeType = 'Upside';
    this.getMessageDsm({
      conversation: this.type,
      date: formatDate(),
    });
  };

  getMessageDsm = params => {
    const { dispatch } = this.props;
    dispatch({
      type: 'stat/getMessageDsm',
      payload: {
        ...params,
      },
    });
  };
  render() {
    const { messageDsm } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.title}>昨日活跃用户分析</div>
        <Group defaultValue={this.type} onChange={this.handleTypeChange}>
          <Button value="Private">单聊</Button>
          <Button value="Group">群聊</Button>
        </Group>
        <Row gutter={20}>
          {messageDsm &&
            messageDsm.map(item => (
              <Col span={8} key={item.statisticsType}>
                <DkCard
                  isActive={this.activeType === item.statisticsType}
                  title={cardMap[item.statisticsType]}
                  popContent={popMap[item.statisticsType]}
                  percent={item.dailyProportionStat.proportion}
                  count={item.dailyProportionStat.currentCount}
                />
              </Col>
            ))}
        </Row>
        <div className={styles.trend}>{trendMap[this.activeType]}</div>
        <DkFilter
          options={msgOptions.filter(item => item.key !== this.activeType)}
        />
      </div>
    );
  }
}

export default connect(({ stat }) => ({
  ...stat,
}))(MessageStatistics);
