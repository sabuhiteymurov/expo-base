const { openApp } = require('../utils/openApp');
import { by, element, expect } from 'detox';

describe('Example', () => {
  beforeAll(async () => {
    await openApp();
  }); 

  it('should have welcome screen', async () => {
    await expect(element(by.id('home-screen'))).toBeVisible();  
  });
});
