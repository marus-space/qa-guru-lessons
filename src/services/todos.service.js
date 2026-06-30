import { test } from '@playwright/test';

// FIXME: Вынести
const url = 'https://apichallenges.eviltester.com';

export class TodosService {
  constructor(request) {
    this.request = request;
  }

  async post({ token, data }) {
    return test.step('POST /todos', async () => {
      const response = await this.request.post(`${url}/todos`, {
        headers: {
          'x-challenger': token,
        },
        data,
      });

      const headers = await response.headers();
      const body = await response.json();
      
      return { headers, body };
    });
  }
}
