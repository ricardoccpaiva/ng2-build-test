import { Ng2ProgressTestPage } from './app.po';

describe('ng2-progress-test App', function() {
  let page: Ng2ProgressTestPage;

  beforeEach(() => {
    page = new Ng2ProgressTestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
