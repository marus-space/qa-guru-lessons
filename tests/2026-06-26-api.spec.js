import { test, expect } from '@playwright/test';

test('API', async ({ request }) => {
  let response = await request.post(`${process.env.CHALLENGER_API_URL}/challenger`);

  const headers = await response.headers();

  response = await request.get(`${process.env.CHALLENGER_API_URL}/challenges`, {
    headers: {
      'x-challenger': headers['x-challenger'],
    },
  });

  let body = await response.json();

  expect(body.challenges).toHaveLength(61);

  response = await request.post(`${process.env.CHALLENGER_API_URL}/todos`, {
    headers: {
      'x-challenger': headers['x-challenger'],
    },
    // TODO: Вынести в билдер
    data: {
      'title': 'Заголовок задачи',
      'doneStatus': false,
      'description': 'Описание задачи',
    },
  });

  body = await response.json();
  
  expect(body.title).toEqual('Заголовок задачи');
  expect(body.doneStatus).toEqual(false);
  expect(body.description).toEqual('Описание задачи');

  console.log(`${process.env.CHALLENGER_API_URL}${headers.location}`);
});
