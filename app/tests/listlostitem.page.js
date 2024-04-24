import { Selector } from 'testcafe';

class ListLostItemPage {
  constructor() {
    this.pageId = '#list-lost-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const listLostItemPage = new ListLostItemPage();
