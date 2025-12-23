import { expect, test } from 'vitest';
import {
  CreateAccount,
  CreateTask,
  DeleteAccount,
  DeleteTask,
  GetAccount,
  GetAccounts,
  GetTask,
  GetTasks,
  UpdateAccount,
  UpdateTask,
} from '../components/utility/ApiServices';
import type { Account, Task } from '../components/utility/Interfaces';

test('API Account Service, Integration Test', async () => {
  const testAdmin: Account = {
    id: 1,
    name: 'test admin',
    username: 'testadmin',
    password: 'testadmin',
    admin: true,
    active: true,
  };

  const testAccount: Account = {
    id: 2,
    name: 'test account',
    username: 'testaccount',
    password: 'testaccount',
    admin: false,
    active: true,
  };

  const testUpdateAccount: Account = {
    id: 2,
    name: 'test account',
    username: 'test',
    password: 'test',
    admin: false,
    active: true,
  };

  const createResponse = await CreateAccount(
    testAdmin,
    testAccount.id,
    testAccount.name,
    testAccount.username,
    testAccount.password,
    testAccount.admin
  );
  expect([createResponse[0], createResponse[1]]).toEqual([true, testAccount]);

  const accountsResponse = await GetAccounts(testAdmin);
  expect([accountsResponse[0], accountsResponse[1].length > 1]).toEqual([
    true,
    true,
  ]);

  const getResponse = await GetAccount(testAdmin, testAccount.id!);
  expect([getResponse[0], getResponse[1]]).toEqual([true, testAccount]);

  const updateResponse = await UpdateAccount(
    testAccount.id!,
    testAdmin,
    testUpdateAccount
  );
  expect([updateResponse[0], updateResponse[1]]).toEqual([
    true,
    testUpdateAccount,
  ]);

  const deleteResponse = await DeleteAccount(testAdmin, testUpdateAccount.id!);
  expect([deleteResponse[0], deleteResponse[1]]).toEqual([
    true,
    testAccount.id,
  ]);
});

test('API Task Service, Integration Test', async () => {
  const testAccount: Account = {
    id: 3,
    name: 'test account',
    username: 'testaccount',
    password: 'testaccount',
    admin: false,
    active: true,
  };

  const testTask: Task = {
    id: 1,
    name: 'test task',
    description: 'test',
    created: new Date().toISOString(),
    username: testAccount.username,
    active: true,
  };

  const testUpdateTask: Task = {
    id: 1,
    name: 'test task updated',
    description: 'update test',
    created: testTask.created,
    username: testTask.username,
    active: testTask.active,
  };

  const createResponse = await CreateTask(
    testAccount,
    testTask.id,
    testTask.name,
    testTask.description
  );
  expect(createResponse[0]).toEqual(true);
  expect(createResponse[1]).not.toBeNull();

  const tasksResponse = await GetTasks();
  expect([tasksResponse[0], tasksResponse[1].length > 1]).toEqual([true, true]);

  const getResponse = await GetTask(testTask.id!);
  expect(getResponse[0]).toEqual(true);
  expect(getResponse[1]).not.toBeNull();

  const updateResponse = await UpdateTask(testTask.id!, testUpdateTask);
  expect([updateResponse[0], updateResponse[1]]).toEqual([
    true,
    testUpdateTask,
  ]);

  const deleteResponse = await DeleteTask(testTask.id!);
  expect([deleteResponse[0], deleteResponse[1]]).toEqual([true, testTask.id]);
});
