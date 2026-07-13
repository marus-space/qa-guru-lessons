import { test } from '@playwright/test';

export class ChallengerService {
  constructor(request) {
    this.request = request;
  }

  async post() {
    return test.step('POST /challenger', async () => {
      const response = await this.request.post(`${process.env.CHALLENGER_API_URL}/challenger`);
      
      const headers = await response.headers();
      console.log(`${process.env.CHALLENGER_API_URL}${headers.location}`);
      
      return headers;
    });
  }
}
