import { Selector } from 'testcafe';

class ResolvedArchivePage {
  constructor() {
    this.pageId = '#resolved-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const resolvedArchivePage = new ResolvedArchivePage();
