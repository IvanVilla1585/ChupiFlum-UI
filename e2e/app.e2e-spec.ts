import { ChupiFlumUIPage } from './app.po';

describe('chupi-flum-ui App', function() {
  let page: ChupiFlumUIPage;

  beforeEach(() => {
    page = new ChupiFlumUIPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
