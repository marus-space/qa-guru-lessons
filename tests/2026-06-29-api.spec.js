import { expect } from '@playwright/test';

import { test } from '../src/helpers/fixtures';

test('API', async ({ api }) => {
  let body, headers;

  headers = await api.challenger.post();
  const token = headers['x-challenger'];

  ({ body } = await api.challenges.get(token));

  expect(body.challenges).toHaveLength(59);

  // TODO: Вынести в билдер
  const todo = {
    'title': 'Заголовок задачи',
    'doneStatus': false,
    'description': 'Описание задачи',
  };

  ({ body } = await api.todos.post({
    token,
    data: todo,
  }));

  expect(body.title).toEqual('Заголовок задачи');
  expect(body.doneStatus).toEqual(false);
  expect(body.description).toEqual('Описание задачи');
});
