import { UIChupiFlumPage } from './app.po';

describe('ui-chupi-flum App', () => {
  let page: UIChupiFlumPage;

  beforeEach(() => {
    page = new UIChupiFlumPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
