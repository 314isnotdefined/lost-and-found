import { Selector } from 'testcafe';
import { navBar } from './navbar.component';

class AddFoundItemPage {
  constructor() {
    this.pageId = '#add-found-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async addFoundItem(testController) {
    const foundItemTest = { itemName: 'Cinnamoroll', locationFound: 'Hamilton Library', email: 'cashbake@hawaii.edu', description: 'a silly lil guy' };
    await testController.typeText('#found-name', foundItemTest.itemName);
    await testController.setFilesToUpload('#file-input', '../public/images/meteor-logo.png');
    const categorySelect = Selector('#found-cat');
    const categoryOption = categorySelect.find('option');
    await testController.click(categorySelect);
    await testController.click(categoryOption.withText('Miscellaneous'));
    await testController.typeText('#found-location', foundItemTest.locationFound);
    await testController.typeText('#found-desc', foundItemTest.description);
    await testController.typeText('#found-email', foundItemTest.email);
    await testController.click('#submit-btn input.btn.btn-primary');
    await testController.click('.swal-button--confirm');
    // Check if newly created item is added to lost items page
    await navBar.gotoListFoundItemPage(testController);
    await testController.click(Selector('.card-title').withText((foundItemTest.itemName)));
  }
}

export const addFoundItemPage = new AddFoundItemPage();
