/**
 * @param { Promise } promise
 * @param { Object= } errorExt - Additional Information you can pass to the err object
 * @return { Promise }
 */
export function catchError<T, U extends object = Error> (
  promise: Promise<T>,
  errorExt?: object
): Promise<[U, undefined] | [null, T]> {
  return promise
    .then<[null, T]>((data: T) => [null, data]) // 执行成功，返回数组第一项为 null。第二个是结果。
    .catch<[U, undefined]>((err: U) => {
      if (errorExt) {
        Object.assign(err, errorExt);
      }
      return [err, undefined]; // 执行失败，返回数组第一项为错误信息，第二项为 undefined
    });
}

export function catchJsonExep<T>(data: any, type?: 'parse' | 'stringify'): Promise<T> {
  return new Promise((resolve, reject) => {
    let transformData = data;
    try {
      if (type === 'parse') {
        transformData = JSON.parse(data);
      } else {
        transformData = JSON.stringify(data);
      }
      resolve(transformData);
    } catch (e) {
      reject(e);
    }
  });
}

export function getHostUrl(protocol: string = '') {
  return process.env.EXPO_PUBLIC_HOST;
}


