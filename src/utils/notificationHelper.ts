import { ActionStatus } from '@laminar/api';
import { notification } from 'antd';

const notificationHelper = (request: Promise<ActionStatus>) => {
  const key = `${Math.random()}`;

  notification.info({
    message: 'Signing',
    key: key,
    duration: null,
  });

  return request
    .then(result => {
      notification.close(key);
      notification.success({
        message: result && result.action ? `${result.action} success` : 'Success',
      });
      return result;
    })
    .catch(errorResult => {
      notification.close(key);
      notification.error({
        message: errorResult && errorResult.action ? `${errorResult.action} error` : 'Error',
        description: errorResult && errorResult.message ? errorResult.message : '',
        duration: null,
      });
      return Promise.reject(errorResult);
    });
};

export default notificationHelper;
