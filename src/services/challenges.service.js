import { test } from '@playwright/test';

export class ChallengesService {
  constructor(request) {
    this.request = request;
  }

  async get(token) {
    return test.step('GET /challenges', async () => {
      const response = await this.request.get(`${process.env.CHALLENGER_API_URL}/challenges`, {
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
