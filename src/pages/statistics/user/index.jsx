import React, { Component } from 'react';
import { connect } from 'umi';
import { Row, Col, Radio, Form, Select } from 'antd';
import { titleMap, popMap, trendMap, userOptions, legendMap } from './map';
import DkCard from '@/components/dkCard/index';
import ExportButton from '@/components/exportButton';
import DkFilter from '@/components/dkFilter/index';
import DkEchart from '@/components/dkEchart/index';
import DkAnalysis from '@/components/dkAnalysis/index';
import { formatDate } from '@/utils/util';
import { getUserTrendOption, getAnalysisOption } from '../option';
import columns from './columns';
import styles from './index.less';

const { Button, Group } = Radio;
const { Item } = Form;
const { Option } = Select;

class UserStatistics extends Component {
  params = null;
  type = 'Platform';
  platforms = ['ANDROID', 'IOS', 'PC', 'WEB'];
  state = {
    activeType: 'All',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'stat/getUserDau',
      payload: {
        date: formatDate(),
      },
    });
    this.getUserAnalysis({
      date: formatDate(),
      type: this.type,
    });
  }

  getUserAnalysis = async query => {
    const { dispatch } = this.props;
    await dispatch({
      type: 'stat/getUserAnalysis',
      payload: {
        ...query,
      },
    });
  };

  getUserTrend = async params => {
    const { dispatch } = this.props;
    this.params = params;
    await dispatch({
      type: 'stat/getUserTrend',
      payload: {
        ...params,
      },
    });
  };

  handleClick = item => {
    this.setState({
      activeType: item.statisticsType,
    });
  };

  handleTypeChange = e => {
    this.type = e.target.value;
    this.getUserAnalysis({
      date: formatDate(),
      type: this.type,
    });
  };

  handlePlatChange = value => {
    this.getUserAnalysis({
      date: formatDate(),
      type: this.type,
      platform: value,
    });
  };

  getUserTrendData = () => {
    const { userTrend } = this.props;
    const { compareType, comparedPeriod } = this.params;
    if (compareType) {
      if (comparedPeriod) {
        const len = userTrend.length;
        const preData = userTrend.slice(len / 2, len);
        const curData = userTrend.slice(0, len / 2);
        const row1 = [];
        curData.slice(0, len / 4).forEach((item, index) => {
          row1.push(item, preData.slice(0, len / 4)[index]);
        });
        const row2 = [];
        curData.slice(len / 4, len / 2).forEach((item, index) => {
          row2.push(item, preData.slice(len / 4, len / 2)[index]);
        });
        return {
          legendData: row1
            .map((item, index) =>
              index % 2 === 0
                ? `---${legendMap[item.type]}(${item.platform})`
                : `${legendMap[item.type]}(${item.platform})`,
            )
            .concat([''])
            .concat(
              row2.map((item, index) =>
                index % 2 === 0
                  ? `---${legendMap[item.type]}(${item.platform})`
                  : `${legendMap[item.type]}(${item.platform})`,
              ),
            ),
          seriesData: row1.concat(row2).map((item, index) => ({
            platform: item.platform,
            name:
              index % 2 === 0
                ? `---${legendMap[item.type]}(${item.platform})`
                : `${legendMap[item.type]}(${item.platform})`,
            data: item.dailyCommonDataList.map(day => day.value),
            type: 'line',
          })),
          xAxisData: userTrend[0].dailyCommonDataList.map(item => item.date),
        };
      } else {
        const len = userTrend.length;
        const row1 = userTrend.slice(0, len / 2);
        const row2 = userTrend.slice(len / 2, len);
        return {
          legendData: row1
            .map(item => `${legendMap[item.type]}(${item.platform})`)
            .concat([''])
            .concat(
              row2.map(item => `${legendMap[item.type]}(${item.platform})`),
            ),
          seriesData: row1.concat(row2).map((item, index) => ({
            platform: item.platform,
            name: `${legendMap[item.type]}(${item.platform})`,
            data: item.dailyCommonDataList.map(day => day.value),
            type: 'line',
          })),
          xAxisData: userTrend[0].dailyCommonDataList.map(item => item.date),
        };
      }
    } else {
      if (comparedPeriod) {
        const len = userTrend.length;
        const data = [];
        userTrend.slice(0, len / 2).forEach((item, index) => {
          data.push(item, userTrend.slice(len / 2, len)[index]);
        });
        return {
          legendData: data.map((item, index) =>
            index % 2 === 0
              ? `---${legendMap[item.type]}(${item.platform})`
              : `${legendMap[item.type]}(${item.platform})`,
          ),
          seriesData: data.map((item, index) => ({
            platform: item.platform,
            name:
              index % 2 === 0
                ? `---${legendMap[item.type]}(${item.platform})`
                : `${legendMap[item.type]}(${item.platform})`,
            data: item.dailyCommonDataList.map(day => day.value),
            type: 'line',
          })),
          xAxisData: userTrend[0].dailyCommonDataList.map(item => item.date),
        };
      } else {
        return {
          legendData: userTrend.map(
            item => `${legendMap[item.type]}(${item.platform})`,
          ),
          seriesData: userTrend.map(item => ({
            platform: item.platform,
            name: `${legendMap[item.type]}(${item.platform})`,
            data: item.dailyCommonDataList.map(day => day.value),
            type: 'line',
          })),
          xAxisData: userTrend[0].dailyCommonDataList.map(item => item.date),
        };
      }
    }
  };
  render() {
    const { userDau, userTrend, analysis } = this.props;
    const { activeType } = this.state;
    return (
      <>
        <div className={styles.top}>
          <Row gutter={20}>
            {userDau &&
              userDau.map(item => (
                <Col
                  key={item.statisticsType}
                  span={6}
                  onClick={() => this.handleClick(item)}
                >
                  <DkCard
                    title={titleMap[item.statisticsType]}
                    count={item.dailyProportionStat.currentCount}
                    percent={item.dailyProportionStat.proportion}
                    popContent={popMap[item.statisticsType]}
                    isActive={activeType === item.statisticsType}
                  />
                </Col>
              ))}
          </Row>
          <div className={styles.wrapper}>
            <span style={{ fontSize: 18 }}>{trendMap[activeType]}</span>
            <ExportButton>导出</ExportButton>
          </div>
          <DkFilter
            options={userOptions.filter(item => item.key !== activeType)}
            getUserTrend={this.getUserTrend}
            type={activeType}
          />
          {userTrend && this.params && (
            <DkEchart
              options={getUserTrendOption({
                ...this.getUserTrendData(),
                params: this.params,
              })}
            />
          )}
        </div>
        <div className={styles.bottom}>
          <div className={styles.title}>昨日活跃用户分析</div>
          <Group defaultValue={this.type} onChange={this.handleTypeChange}>
            <Button value="Platform">平台</Button>
            <Button value="Geography">地理信息</Button>
            <Button value="SDK">SDK版本</Button>
            <Button value="OS">操作系统</Button>
            <Button value="ISP">运营商</Button>
          </Group>
          {this.type !== 'Platform' && (
            <Item label="平台">
              <Select
                style={{ width: 100 }}
                defaultValue="ALL"
                onChange={this.handlePlatChange}
              >
                <Option value="ALL">全部</Option>
                {this.platforms.map(item => (
                  <Option key={item} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </Item>
          )}
          {analysis && (
            <DkAnalysis
              type={this.type}
              data={analysis}
              options={getAnalysisOption(this.type, analysis)}
              columns={columns[this.type]}
            />
          )}
        </div>
      </>
    );
  }
}

export default connect(({ stat }) => ({
  ...stat,
}))(UserStatistics);
