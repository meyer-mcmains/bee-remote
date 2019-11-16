import { get } from 'dot-prop';
import { delayReject } from './delay';

export default (uri, options) => {
  const requestPromise = fetch(uri, options);
  const timeout = get(options, 'timeout', 10000);

  const timeoutPromise = delayReject(
    timeout,
    new Error('Network request timed out')
  );

  return Promise.race([timeoutPromise, requestPromise]);
};
