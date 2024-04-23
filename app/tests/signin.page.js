import { Selector } from 'testcafe';
import { navBar } from './navbar.component';

class SigninPage {
  constructor() {
    this.pageId = '#signin-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Fills out and submits the form to signin, then checks to see that login was successful. */
  async signin(testController, email, password, username) {
    await this.isDisplayed(testController);
    await testController.typeText('#signin-form-email', email);
    await testController.typeText('#signin-form-password', password);
    await testController.click('#signin-form-submit input.btn.btn-primary');
    // Click on the confirm button in SweetAlert
    await testController.click('.swal-button--confirm');
    await navBar.isLoggedIn(testController, username);
  }
}

export const signinPage = new SigninPage();
