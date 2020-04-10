export const cardMap = {
  Upside: "单聊上行消息数（昨日）",
  UpsideAverage: "单聊人均上行消息数（昨日）",
  Dispatch: "单聊分发消息数（昨日）",
  Downside: "单聊下行消息数（昨日）",
  DownsideAverage: '单聊人均下行消息数（昨日）',
  Push: '单聊Push消息数（昨日）'
}

export const popMap = {
  Upside: "用户发送到消息服务器的单聊消息数(包含用户和API发送)。",
  UpsideAverage: "每个发送单聊消息的用户平均发送的单聊上行消息数(包含用户和API发送)。",
  Dispatch: "消息服务器分发给指定用户的单聊消息数及单聊Push消息数。",
  Downside: "用户在线时接收到的单聊消息数、上线后接收到的离线单聊消息数及单聊历史消息数之和。",
  DownsideAverage: '每个接收到单聊消息的用户平均接收到的单聊下行消息数。',
  Push: '用户离线时服务端直接推送的单聊 Push 消息数。'
}

export const trendMap = {
  Upside: "单聊上行消息数据走势",
  UpsideAverage: "单聊人均上行消息数据走势",
  Dispatch: "单聊分发消息数据走势",
  Downside: "单聊下行消息数据走势",
  DownsideAverage: "单聊人均下行消息数据走势",
  Push: "单聊Push消息数据走势",
}

export const msgOptions = [{
    key: 'Upside',
    label: '单聊上行消息'
  },
  {
    key: 'UpsideAverage',
    label: '单聊人均上行消息'
  },
  {
    key: 'Dispatch',
    label: '单聊分发消息'
  },
  {
    key: 'Downside',
    label: '单聊下行消息'
  },
  {
    key: 'DownsideAverage',
    label: '单聊人均下行消息'
  },
  {
    key: 'Push',
    label: '单聊Push消息'
  },
]

export const legendMap = {
  All: "活跃用户",
  SendMessage: "发消息用户",
  NewUser: "新增用户",
  Peak: "同时在线峰值",
}
