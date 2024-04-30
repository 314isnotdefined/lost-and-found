import { Selector } from 'testcafe';
import { navBar } from './navbar.component';

class AddLostItemPage {
  constructor() {
    this.pageId = '#add-lost-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async addLostItem(testController) {
    const lostItemTest = { itemName: 'Cinnamoroll', lastSeen: 'Hamilton Library', email: 'cashbake@hawaii.edu', description: 'a silly lil guy' };
    await testController.typeText('#item-name-field', lostItemTest.itemName);
    await testController.setFilesToUpload('#file-input', '../public/images/meteor-logo.png');
    const categorySelect = Selector('#category-field');
    const categoryOption = categorySelect.find('option');
    await testController.click(categorySelect);
    await testController.click(categoryOption.withText('Miscellaneous'));
    await testController.typeText('#last-seen-field', lostItemTest.lastSeen);
    await testController.typeText('#description-field', lostItemTest.description);
    await testController.typeText('#email-field', lostItemTest.email);
    await testController.click('#submit-btn input.btn.btn-primary');
    await testController.click('.swal-button--confirm');
    // Check if newly created item is added to lost items page
    await navBar.gotoListLostItemPage(testController);
    await testController.click(Selector('.card-title').withText((lostItemTest.itemName)));
  }
}

export const addLostItemPage = new AddLostItemPage();
