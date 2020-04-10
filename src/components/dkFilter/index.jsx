import React, { Component } from 'react';
import { Form, Select, Checkbox, Radio, DatePicker } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import locale from 'antd/es/date-picker/locale/zh_CN';
import { dateRange } from '@/utils/util';
import styles from './index.less';

const { Item } = Form;
const { Option } = Select;
const { Button, Group } = Radio;
const { RangePicker } = DatePicker;

export default class DkFilter extends Component {
  state = {
    radioType: '7日',
    range: dateRange(7),
    comparedPeriod: false,
    isGroupByPlatform: false,
    compareType: '',
  };

  componentDidMount() {
    this.getUserTrend();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.type !== nextProps.type) {
      this.getUserTrend(nextProps);
    }
  }

  handleChange = e => {
    const { value } = e.target;
    let range = [];
    switch (value) {
      case '今日':
        range = dateRange(1);
        break;
      case '昨日':
        range = dateRange(2);
        break;
      case '7日':
        range = dateRange(7);
        break;
      case '30日':
        range = dateRange(30);
        break;
      default:
        break;
    }
    this.setState(
      {
        range,
      },
      this.getUserTrend,
    );
  };

  handlePlatform = e => {
    this.setState(
      {
        isGroupByPlatform: e.target.checked,
      },
      this.getUserTrend,
    );
  };

  handleCompare = e => {
    this.setState(
      {
        comparedPeriod: e.target.checked,
      },
      this.getUserTrend,
    );
  };

  handleSelect = value => {
    this.setState(
      {
        compareType: value,
      },
      this.getUserTrend,
    );
  };

  handlePicker = value => {
    this.setState(
      {
        range: value,
      },
      this.getUserTrend,
    );
  };

  getUserTrend = (props = this.props) => {
    const { getUserTrend, type } = props;
    const {
      comparedPeriod,
      isGroupByPlatform,
      range,
      compareType,
    } = this.state;
    if (!range) return;
    const startDate = range[0].format('YYYY-MM-DD');
    const endDate = range[1].format('YYYY-MM-DD');
    getUserTrend &&
      getUserTrend({
        startDate,
        type,
        compareType,
        comparedPeriod,
        endDate,
        isGroupByPlatform,
      });
  };

  render() {
    const { options } = this.props;
    const { range, radioType } = this.state;
    return (
      <div className={styles.wrapper}>
        <Form layout="inline">
          <Item label="数据对比">
            <Select
              style={{ width: 120 }}
              size="middle"
              defaultValue=""
              onChange={this.handleSelect}
            >
              <Option value="">空</Option>
              {options.map(option => (
                <Option key={option.key} value={option.key}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Item>
          <Item>
            <Checkbox onChange={this.handlePlatform}>按平台拆分</Checkbox>
          </Item>
          <Item>
            <Checkbox onChange={this.handleCompare}>对比同一时段</Checkbox>
          </Item>
        </Form>
        <div className={styles.right}>
          <Group defaultValue={radioType} onChange={this.handleChange}>
            <Button value="今日">今日</Button>
            <Button value="昨日">昨日</Button>
            <Button value="7日">7日</Button>
            <Button value="30日">30日</Button>
          </Group>
          <RangePicker
            value={range}
            locale={locale}
            suffixIcon={<DownOutlined />}
            onChange={this.handlePicker}
          />
        </div>
      </div>
    );
  }
}
