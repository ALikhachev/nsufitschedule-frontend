import { NsufitscheduleFrontendPage } from './app.po';

describe('nsufitschedule-frontend App', function() {
  let page: NsufitscheduleFrontendPage;

  beforeEach(() => {
    page = new NsufitscheduleFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
