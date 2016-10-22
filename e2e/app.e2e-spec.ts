import { TutFirebase201610Page } from './app.po';

describe('tut-firebase-2016-10 App', function() {
  let page: TutFirebase201610Page;

  beforeEach(() => {
    page = new TutFirebase201610Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
