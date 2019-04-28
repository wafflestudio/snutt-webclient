import get from 'lodash/get';
import { getErrorMessage } from 'utils/errorTable';

/**
 * Promise가 실패하면 에러코드가 있을 경우 alert로 에러 메시지 띄우고,
 * error를 {error}형태로 감싸서 resolve.
 */
const errorHandler = async (promise, showAlert = true) => {
  try {
    const result = await promise;
    return result;
  } catch (e) {
    let error = {
      error: e,
    };

    // Handle API error with error code
    if (get(e, 'response.data.errcode')) {
      const errorCode = e.response.data.errcode;
      const errorMessage = getErrorMessage(errorCode);
      if (showAlert) {
        alert(errorMessage);
      }
      error = {
        ...error,
        errorCode,
        errorMessage,
      };
    }
    return {
      error,
    };
  }
};

export default errorHandler;
