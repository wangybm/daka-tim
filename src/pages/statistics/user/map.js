export const titleMap = {
  All: "活跃用户数（昨日）",
  SendMessage: "发消息用户数（昨日）",
  NewUser: "新增用户数（昨日）",
  Peak: "同时在线峰值（昨日）",
}

export const popMap = {
  All: "通过设备连接消息服务器的用户数。当同一用户通过两台设备连接时，即为两次活跃。",
  SendMessage: "通过消息服务 API 和 SDK 发送消息的用户总数",
  NewUser: "消息服务器获取的应用的新增用户 ID 总数。",
  Peak: "平台连接消息服务器的最大同时连接数。",
}

export const trendMap = {
  All: "活跃用户数据走势",
  SendMessage: "发消息用户数据走势",
  NewUser: "新增用户数据走势",
  Peak: "同时在线峰值据走势",
}

export const userOptions = [{
    key: 'All',
    label: '活跃用户'
  },
  {
    key: 'SendMessage',
    label: '发消息用户'
  },
  {
    key: 'NewUser',
    label: '新增用户'
  },
  {
    key: 'Peak',
    label: '同时在线峰值'
  }
]

export const legendMap = {
  All: "活跃用户",
  SendMessage: "发消息用户",
  NewUser: "新增用户",
  Peak: "同时在线峰值",
}
