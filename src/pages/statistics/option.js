import moment from 'moment';
import { hexToRgba } from '@/utils/util';
export const getUserTrendOption = ({
  legendData,
  xAxisData,
  seriesData,
  params,
}) => {
  const getColor = color => {
    if (!params.comparedPeriod) {
      return color;
    } else {
      const colors = [];
      color.forEach(item => {
        colors.push(item, hexToRgba(item, 0.5));
      });
      return colors;
    }
  };
  return {
    tooltip: {
      trigger: 'axis',
      formatter(obj) {
        if (params.comparedPeriod) {
          const data1 = obj.filter(item => item.seriesName.startsWith('---'));
          const data2 = obj.filter(item => !item.seriesName.startsWith('---'));
          let html = `<div>${data1[0].name}</div>`;
          const days = moment(params.endDate).diff(
            moment(params.startDate),
            'days',
          );
          data1.forEach(item => {
            html += `
              <div style="display:flex;align-items:center">
                <span style="background: ${
                  item.color
                };width: 6px;height:6px;border-radius: 3px;display:inline-block"></span>
                <span style="padding: 0 5px">${item.seriesName.replace(
                  '---',
                  '',
                )}:</span>
                <span>${item.value}</span>
              </div>`;
          });
          html += `<div>${moment(data2[0].name)
            .subtract(days, 'days')
            .format('YYYY-MM-DD')}</div>`;
          data2.forEach((item, index) => {
            html += `
              <div style="display:flex;align-items:center">
                <span style="background: ${hexToRgba(
                  data1[index].color,
                  0.5,
                )};width: 6px;height:6px;border-radius: 3px;display:inline-block"></span>
                <span style="padding: 0 5px">${item.seriesName}:</span>
                <span>${item.value}</span>
              </div>
            `;
          });
          return html;
        } else {
          let html = `<div>${obj[0].name}</div>`;
          obj.forEach(item => {
            html += `
              <div style="display:flex;align-items:center">
                <span style="background: ${item.color};width: 6px;height:6px;border-radius: 3px;display:inline-block"></span>
                <span style="padding: 0 5px">${item.seriesName}:</span>
                <span>${item.value}</span>
              </div>`;
          });
          return html;
        }
      },
    },
    color: getColor([
      '#3A80FC',
      '#36D56B',
      '#FCD232',
      '#FF892A',
      '#4FA8F4',
      '#E54545',
      '#D073F4',
      '#5E62FF',
    ]),
    legend: {
      data: legendData,
      icon: 'rect',
      bottom: 0,
      itemWidth: 12,
      itemHeight: 3,
      itemGap: 5,
      textStyle: {
        color: '#606266',
      },
      formatter(name) {
        if (name.startsWith('---')) {
          return '';
        }
        return name;
      },
    },
    grid: {
      left: '20',
      right: '40',
      bottom: '98',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: xAxisData,
      axisLine: {
        lineStyle: {
          color: '#DCDFE6',
        },
      },
      axisLabel: {
        color: '#606266',
      },
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        lineStyle: {
          color: '#DCDFE6',
          type: 'dotted',
        },
      },
    },
    series: seriesData,
  };
};

export const getAnalysisOption = (type, data) => {
  if (type === 'Platform' || type === 'ISP') {
    return {
      color: ['#F85E4E', '#FFCD41', '#3198FF', '#4FA8F4'],
      tooltip: {
        show: false,
      },
      legend: {
        icon: 'rect',
        bottom: 0,
        itemWidth: 12,
        itemHeight: 3,
        itemGap: 5,
        textStyle: {
          color: '#606266',
        },
        data: data.map(item => item.name),
      },
      series: [
        {
          name: '平台',
          type: 'pie',
          radius: [50, 100],
          center: ['50%', '45%'],
          label: {
            show: false,
          },
          labelLine: {
            length: 30,
            length2: 110,
          },
          emphasis: {
            label: {
              show: true,
              formatter(params) {
                return `${params.data.name}:${params.data.value}\n占比:${params.data.proportion}`;
              },
              color: '#5E5E5E',
              lineHeight: 22,
            },
            labelLine: {
              show: true,
              length: 30,
              length2: 110,
            },
          },
          data,
        },
      ],
    };
  }
  if (type === 'Geography') {
    return {
      tooltip: {
        show: true,
        formatter: function(params) {
          return `${params.name}</br>${params.marker}活跃人数：${params.value ||
            0}`;
        },
      },
      visualMap: {
        type: 'continuous',
        itemWidth: 17,
        itemHeight: 109,
        text: ['高', '低'],
        showLabel: true,
        seriesIndex: [0],
        min: 0,
        max: Math.max(...data.map(item => item.value)),
        inRange: {
          color: ['#e9f5fe', '#3762e4'],
        },
        textStyle: {
          color: '#2C3E50',
          fontSize: 14,
        },
        bottom: '40',
        right: '20%',
      },
      geo: {
        roam: false,
        map: 'china',
        layoutCenter: ['50%', '48%'],
        layoutSize: '100%',
        zoom: 1.2,
        label: {
          emphasis: {
            show: false,
          },
        },
        itemStyle: {
          borderColor: '#7bc0dc',
          emphasis: {
            areaColor: '#3762e4',
          },
        },
        regions: [
          {
            name: '南海诸岛',
            value: 0,
            itemStyle: {
              normal: {
                opacity: 0,
                label: {
                  show: false,
                },
              },
            },
          },
        ],
      },
      series: [
        {
          name: 'mapSer',
          type: 'map',
          roam: false,
          geoIndex: 0,
          aspectScale: 1.24,
          data,
          label: {
            show: false,
          },
        },
      ],
    };
  }
  if (type === 'SDK') {
    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
        formatter: function(params) {
          return `${params[0].marker}${params[0].name}&nbsp;&nbsp;&nbsp;&nbsp;${params[0].value}， ${params[0].data.proportion}`;
        },
      },
      grid: {
        top: '10%',
        bottom: '40',
        left: '0',
        right: '40',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          data: data.map(item => item.name),
          gridIndex: 0,
          axisLabel: {
            color: '#333',
          },
          axisLine: {
            lineStyle: {
              color: '#e7e7e7',
            },
          },
          axisTick: {
            lineStyle: {
              color: '#e7e7e7',
            },
          },
          zlevel: 2,
        },
      ],
      yAxis: [
        {
          type: 'value',
          gridIndex: 0,
          axisLabel: {
            color: '#333',
          },
          splitLine: {
            lineStyle: {
              type: 'dashed',
            },
          },
          axisLine: {
            lineStyle: {
              color: '#ccc',
            },
          },
          axisTick: {
            lineStyle: {
              color: '#ccc',
            },
          },
        },
      ],
      series: [
        {
          data: data,
          type: 'bar',
          barWidth: '50',
          label: {
            show: true,
            position: 'top',
            textStyle: {
              color: '#555',
            },
            formatter: function(params) {
              return `${params.value}, ${params.data.proportion}`;
            },
          },
          itemStyle: {
            normal: {
              color: params => {
                let colors = ['#36D56B', '#3A80FC', '#FF892A'];
                return colors[params.dataIndex % data.length];
              },
            },
          },
          xAxisIndex: 0,
          yAxisIndex: 0,
        },
      ],
    };
  }
  if (type === 'OS') {
    return {
      color: [
        '#F99104',
        '#FDBD10',
        '#586BFB',
        '#2E9FFF',
        '#008374',
        '#37AB2E',
        '#00CC00',
      ],
      tooltip: {
        trigger: 'item',
        formatter: params => {
          if (params.data) {
            return `${params.data.name}<br/>${params.marker}活跃人数：${params.data.value}`;
          }
          return params.name;
        },
      },
      series: [
        {
          type: 'treemap',
          width: 680,
          height: 372,
          breadcrumb: {
            show: false,
          },
          nodeClick: false,
          roam: false,
          data,
          label: {
            formatter(params) {
              return `${params.data.name}  ${params.data.proportion}`;
            },
          },
        },
      ],
    };
  }
};
