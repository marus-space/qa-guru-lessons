import { test, expect } from '@playwright/test';

const apiUrl = 'https://apichallenges.eviltester.com';

test('API', async ({ request }) => {
  let response = await request.post(`${apiUrl}/challenger`);

  const headers = await response.headers();

  response = await request.get(`${apiUrl}/challenges`, {
    headers: {
      'x-challenger': headers['x-challenger'],
    },
  });

  let body = await response.json();

  expect(body.challenges).toHaveLength(59);

  response = await request.post(`${apiUrl}/todos`, {
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

  console.log(`${apiUrl}${headers.location}`);
});
