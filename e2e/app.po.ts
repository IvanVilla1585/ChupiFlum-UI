import { browser, element, by } from 'protractor';

export class UIChupiFlumPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    //noinspection TypeScriptUnresolvedFunction
    return element(by.css('app h1')).getText();
  }
}
