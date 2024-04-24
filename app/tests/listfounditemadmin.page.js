import { Selector } from 'testcafe';
import { navBar } from './navbar.component';

class ListFoundItemAdminPage {
  constructor() {
    this.pageId = '#list-found-admin-nav';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async editAndRemoveItem(testController) {
    const editItemTest = { email: 'testcafe@hawaii.edu' };
    const editbtn = Selector('.btn.btn-primary').withText(' Edit');
    await testController.click(editbtn);
    const textField = Selector('#edit-found-email');
    await testController.selectText(textField);
    await testController.pressKey('delete');
    await testController.typeText('#edit-found-email', editItemTest.email);
    await testController.click('#submit-btn input.btn.btn-primary');
    await testController.click('.swal-button--confirm');
    // Verify admin changes show in non-admin found items page
    await navBar.gotoListFoundItemPage(testController);
    await testController.expect(Selector('.card-text').withText((editItemTest.email))).exists;
  }
}

export const listFoundItemAdminPage = new ListFoundItemAdminPage();
