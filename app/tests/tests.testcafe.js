import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { addLostItemPage } from './addlostitem.page';
import { addFoundItemPage } from './addfounditem.page';
import { listFoundItemAdminPage } from './listfounditemadmin.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { email: 'john@foo.com', password: 'changeme', username: 'John Smith' };
const admin = { email: 'admin@foo.com', password: 'changeme', username: 'Admin Doe' };

fixture('Item Depot localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Test that signin and signout work', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.email, credentials.password, credentials.username);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test that add lost item page works', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.email, credentials.password, credentials.username);
  await navBar.gotoAddLostItemPage(testController);
  await addLostItemPage.isDisplayed(testController);
  await addLostItemPage.addLostItem(testController);
});

test('Test that add found item page works', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.email, credentials.password, credentials.username);
  await navBar.gotoAddFoundItemPage(testController);
  await addFoundItemPage.isDisplayed(testController);
  await addFoundItemPage.addFoundItem(testController);
});

test.only('Test that admins can remove found items via found items admin page', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, admin.email, admin.password, admin.username);
  await navBar.gotoListFoundItemAdminPage(testController);
  await listFoundItemAdminPage.editAndRemoveItem(testController);
});
