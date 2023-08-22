import { by, element, expect } from 'detox';

describe('Main', () => {
  it('should redirect to the home or sign-in screen based on user login', async () => {
    await expect(element(by.id('home-screen'))).toBeVisible();
  });
});
