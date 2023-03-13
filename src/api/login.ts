import { httpRequest } from '@/utils/request';

interface MessageModel {
  code: number;
  data: any;
  msg: string;
}

export const login = (params: any): Promise<MessageModel> => httpRequest({
  url: '/api/auth/login',
  method: 'post',
  data: params,
});

export const rePwd = (params: any): Promise<MessageModel> => httpRequest({
  url: '/api/auth/repwd',
  method: 'post',
  data: params,
});
