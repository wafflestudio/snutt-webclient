import store from 'store';

let newUser = 'PLEASE_INIT';

export const visitChecker = {
  isNewUser: () => {
    if (newUser !== 'PLEASE_INIT') {
      return newUser;
    }
    newUser = !store.get('tt__newuser');
    return newUser;
  },
  markUserVisited: () => {
    if (newUser !== 'PLEASE_INIT' && newUser === true) {
      store.set('tt__newuser', Date.now());
      newUser = false;
    }
  },
};

export const welcomeMessage = {
  _id: 0,
  message:
    'SNUTT 웹사이트가 모바일 어플과 함께 업데이트 되었습니다. 이전 SNUTT 웹사이트를 사용하시려면 <a href="http://old.snutt.kr">old.snutt.kr</a> 로 접속해주세요.',
  created_at: '2017-11-19T14:36:24.322Z',
  type: 0,
};
