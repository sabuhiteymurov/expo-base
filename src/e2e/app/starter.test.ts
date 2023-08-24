import { by, element, expect } from 'detox';
import { MMKV } from 'react-native-mmkv';

describe('Main', () => {
  let storage: MMKV;

  beforeAll(() => {
    storage = new MMKV();
  });

  it('should redirect to the home or sign-in screen based on user session', async () => {
    const isSignedIn = storage.getString('user');
    await expect(
      element(by.id(isSignedIn ? 'home-screen' : 'sign-in-screen'))
    ).toBeVisible();
  });
});
