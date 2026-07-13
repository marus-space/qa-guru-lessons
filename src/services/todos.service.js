import { test } from '@playwright/test';

export class TodosService {
  constructor(request) {
    this.request = request;
  }

  async post({ token, data }) {
    return test.step('POST /todos', async () => {
      const response = await this.request.post(`${process.env.CHALLENGER_API_URL}/todos`, {
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
