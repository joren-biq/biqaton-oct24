const {
  Given,
  When,
  Then,
} = require('@badeball/cypress-cucumber-preprocessor');

beforeEach(() => {
  cy.visit(Cypress.config().baseUrl);
  login();
});

afterEach(() => {
  cy.writeFile('cypress/reports/browser/browserDetails.json', Cypress.browser);
});

/* Given */

Given('I am browsing the inventory', () => {
    cy.visit(Cypress.config().urls.inventory);
});

Given('I visit a login page', () => {
  cy.visit(Cypress.config().urls.inventory);
});

Given('I log out with {string} in my cart', (productName) => {
  cy.visit(Cypress.config().urls.inventory);
  addProductToCart(productName);
  cy.get('button#react-burger-menu-btn').click();
  cy.get('a#logout_sidebar_link').click();
});

Given('I click on Add to Cart for product {string}', (name) => {
  addProductToCart(name);
});

/* When */

When('I click on the cart', () => {
  cy.get('a.shopping_cart_link').should('be.visible').click();
});

When('I fill the login form with valid credentials', () => {

});

When('I log in', () => {
  login();
});

When('I look at product number {int}', (number) => {
  
});

When('I sort the products based on price {string}', (option) => {
  
});

When('I fill the login form with a locked-out user', () => {
  
});

When('I fill the login form with {string} and {string}', (username, password) => {
  
});

/* Then */

Then('I see that there are no items in my cart', () => {
  cy.get('div.cart_item').should('not.exist');
});

Then('I can see a qty, title, description, price and a remove button', () => {
  cy.get('div.cart_item > div.cart_quantity').first().should('exist');
  cy.get('div.cart_item div.inventory_item_desc').first().should('exist');
  cy.get('div.cart_item div.inventory_item_price').first().should('exist');
  cy.get('div.cart_item button').first().should('exist');
});

Then('I can update the quantity of product {string}', (name) => {
  cy.get('div.cart_item > div.cart_quantity').first().should('be.visible').should('be.enabled').type("2");
});

Then('{string} product is in my cart', (productName) => {
  cy.get(`div.cart_item div.inventory_item_name:contains(${productName})`).should('exist');
});

Then('I can browse the inventory of products', () => {
  
});

Then('I can see a title, picture, description, price and a buy button', () => {
  
});

Then('I can see the products sorted based on the price {string}', (option) => {

});

Then('I can see that product in my cart', () => {
  
});

Then('I cannot add product {string} again', (name) => {
  
});

Then('I should see the home page', () => {
  
});

Then('I should see a locked-out error message', () => {
  
});

Then('I should see an invalid credentials error message', () => {
  
});

const login = () => {
  cy.get('input[name="user-name"]').should('be.visible').should('be.enabled').type(Cypress.config().username);
  cy.get('input[name="password"]').should('be.visible').should('be.enabled').type(Cypress.config().password);
  cy.get('input[type="submit"]').should('be.visible').should('be.enabled').click();
};

const addProductToCart = (name) => {
  cy.get(`div.inventory_item_name:contains(${name})`)
    .parents('div.inventory_item_description')
    .find('button')
    .click();
};