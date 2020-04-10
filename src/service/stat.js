import request from '@/utils/request';

export const getUserDau = async params => {
  return await request.get('/dev/stat/user/dau', {
    params: params,
  });
};

export const getUserTrend = async params => {
  return await request.get('/dev/stat/user/trend', {
    params: params,
  });
};

export const getUserAnalysis = async params => {
  return await request.get('/dev/stat/user/analysis', {
    params: params,
  });
};

export const getMessageDsm = async params => {
  return await request.get('/dev/stat/message/dsm', {
    params: params,
  });
};
