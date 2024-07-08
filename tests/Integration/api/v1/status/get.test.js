import orchestrator from "../orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  // expect(responseBody.update_at).toBeDefined();
  const parsedUpdatedAt = new Date(responseBody.update_at).toISOString();
  expect(responseBody.update_at).toEqual(parsedUpdatedAt);
  expect(responseBody.dependencies.database.version).toEqual("16.0");
  expect(
    Number.isInteger(responseBody.dependencies.database.max_connections),
  ).toBe(true);
  expect(
    Number.isInteger(responseBody.dependencies.database.opened_connections),
  ).toBe(true);
  expect(responseBody.dependencies.database.opened_connections).toEqual(1);
});
