export const visitChecker = {
  isNewUser: () => (!localStorage.getItem('tt__newuser')),
  markUserVisited: () => {
    localStorage.setItem('tt__newuser', Date.now());
  },
};

export const welcomeMessage = {
  _id: 0,
  message: 'SNUTT 웹사이트가 모바일 어플과 함께 업데이트 되었습니다. 이전 SNUTT 웹사이트를 사용하시려면 http://old.snutt.kr 를 방문해주세요.',
  created_at: '2016-07-21T14:36:24.322Z',
  type: 0,
};
