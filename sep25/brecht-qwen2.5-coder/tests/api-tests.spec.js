// tests/api-tests.spec.js

const { test, expect } = require("@playwright/test");
require("dotenv").config();

const TRELLO_API_KEY = process.env.TRELLO_API_KEY;
const TRELLO_TOKEN = process.env.TRELLO_TOKEN;

let boardId;
let listId1;
let listId2;
let cardId;

test.describe("Trello API Tests", () => {
  test.beforeAll(async ({ request }) => {
    // Create a new board before running any tests
    const response = await request.post(
      `https://api.trello.com/1/boards/?name=TestBoard&key=${TRELLO_API_KEY}&token=${TRELLO_TOKEN}`,
    );
    expect(response.ok()).toBe(true);
    const body = await response.json();
    boardId = body.id;

    // Create two lists in the board
    let newListResponse1 = await request.post(
      `https://api.trello.com/1/lists?name=List 1&idBoard=${boardId}&key=${TRELLO_API_KEY}&token=${TRELLO_TOKEN}`,
    );
    expect(newListResponse1.ok()).toBe(true);
    const newListBody1 = await newListResponse1.json();
    listId1 = newListBody1.id;

    let newListResponse2 = await request.post(
      `https://api.trello.com/1/lists?name=List 2&idBoard=${boardId}&key=${TRELLO_API_KEY}&token=${TRELLO_TOKEN}`,
    );
    expect(newListResponse2.ok()).toBe(true);
    const newListBody2 = await newListResponse2.json();
    listId2 = newListBody2.id;
  });

  test.afterAll(async ({ request }) => {
    // Remove the board after all tests
    if (boardId) {
      const response = await request.delete(
        `https://api.trello.com/1/boards/${boardId}?key=${TRELLO_API_KEY}&token=${TRELLO_TOKEN}`,
      );
      expect(response.ok()).toBe(true);
    }
  });

  test("should create a card", async ({ request }) => {
    // Create a new card in the first list
    const response = await request.post(
      `https://api.trello.com/1/cards?name=TestCard&idList=${listId1}&key=${TRELLO_API_KEY}&token=${TRELLO_TOKEN}`,
    );
    expect(response.ok()).toBe(true);
    const body = await response.json();
    cardId = body.id;
  });

  test("should move a card to another list", async ({ request }) => {
    // Move the card to the second list
    let moveCardResponse = await request.put(
      `https://api.trello.com/1/cards/${cardId}?idList=${listId2}&key=${TRELLO_API_KEY}&token=${TRELLO_TOKEN}`,
    );
    expect(moveCardResponse.ok()).toBe(true);
  });

  test("should modify a card", async ({ request }) => {
    // Modify the card's description
    const response = await request.put(
      `https://api.trello.com/1/cards/${cardId}?desc=UpdatedDescription&key=${TRELLO_API_KEY}&token=${TRELLO_TOKEN}`,
    );
    expect(response.ok()).toBe(true);
  });
});
