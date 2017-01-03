import { NgTestPageObjPage } from './app.po';

describe('ng-test-page-obj App', function() {
  let page: NgTestPageObjPage;

  beforeEach(() => {
    page = new NgTestPageObjPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
