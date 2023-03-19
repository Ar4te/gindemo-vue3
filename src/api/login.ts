import { httpRequest } from '@/utils/request';
import { MessageModel } from '@/utils/messageModel'

export const login = (params: any): Promise<MessageModel> => httpRequest({
  url: '/api/auth/login',
  method: 'post',
  data: params,
});

export const rePwd = (params: any): Promise<MessageModel> => httpRequest({
  url: '/api/auth/rePwd',
  method: 'post',
  data: params,
});
