import { httpRequest } from '@/utils/request';
import { MessageModel } from '@/utils/messageModel'

export let getAllArticles = (params: any): Promise<MessageModel> => httpRequest({
  url: '/api/article/getAll',
  method: 'get',
  data: params,
});

export let downloadFile = (params: any): Promise<MessageModel> => httpRequest({
  url: '/api/article/download',
  method: 'get',
  params,
});
