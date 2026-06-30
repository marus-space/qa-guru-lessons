import { test } from '@playwright/test';

// FIXME: Вынести
const url = 'https://apichallenges.eviltester.com';

export class ChallengerService {
  constructor(request) {
    this.request = request;
  }

  async post() {
    return test.step('POST /challenger', async () => {
      const response = await this.request.post(`${url}/challenger`);
      
      const headers = await response.headers();
      console.log(`${url}${headers.location}`);
      
      return headers;
    });
  }
}
