const { openApp } = require('../utils/openApp');
import { by, element, expect, waitFor } from 'detox';

describe('User can sign in successfully', () => {
  beforeAll(async () => {
    await openApp();
  }); 

  it('should open sign in screen', async () => {
    await expect(element(by.id('sign-in-screen'))).toBeVisible();  
    await expect(element(by.id('sign-in-btn'))).toBeVisible();  
  });

  it('should open home screen when signed in', async () => {
    await element(by.id('sign-in-btn')).tap().then(async () => await expect(element(by.id('sign-in-screen'))).toBeVisible());
  });
});
