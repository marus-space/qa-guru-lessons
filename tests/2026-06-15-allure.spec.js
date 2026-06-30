import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { allure } from 'allure-playwright';
import { MainPage } from '../src/pages/main.page';
import { RegisterPage } from '../src/pages/register.page';
import { AuthenticatedMainPage } from '../src/pages/authenticated-main.page';

const url = 'https://realworld.qa.guru/';
const username = faker.person.fullName();
const email = faker.internet.email({ firstName: 'Sniper', provider: 'example.com' });
const password = faker.internet.password({ length: 20 });

test('Пользователь может зарегистрироваться, используя email и пароль', async ({ page }) => {
  allure.epic('Регистрация');
  allure.story('Положительный сценарий');
  allure.label('register');
  allure.severity('Blocker');
  allure.owner('marus');

  await page.goto(url);

  const mainPage = new MainPage({ page });
  const registerPage = new RegisterPage({ page });
  const authenticatedMainPage = new AuthenticatedMainPage({ page });
  
  await mainPage.goToRegister();
  await registerPage.signUp({ username, email, password });

  await expect(authenticatedMainPage.getProfileDropdown()).toContainText(username);
});
