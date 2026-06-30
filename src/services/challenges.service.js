import { test } from '@playwright/test';

// FIXME: Вынести
const url = 'https://apichallenges.eviltester.com';

export class ChallengesService {
  constructor(request) {
    this.request = request;
  }

  async get(token) {
    return test.step('GET /challenges', async () => {
      const response = await this.request.get(`${url}/challenges`, {
        headers: {
          'x-challenger': token,
        },
      });

      const headers = await response.headers();
      const body = await response.json();
      
      return { headers, body };
    });
  }
}
