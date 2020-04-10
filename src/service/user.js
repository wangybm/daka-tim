import request from '@/utils/request';

export const login = async params => {
  return await request.post('/dev/user/login', {
    data: params,
  });
};
