Feature: Inventory

    As a logged in user
    I want to browse the different products in the inventory

    Scenario: Browse displayed products
        Given I visit a login page
        When I fill the login form with valid credentials
        Then I can browse the inventory of products

    Scenario: A product contains a number of elements
        Given I am browsing the inventory
        When I look at product number <number>
        Then I can see a title, picture, description, price and a buy button

        Examples:
            | number |
            | 1 |
            | 2 |
            | 3 |

    Scenario: The inventory can be sorted
        Given I am browsing the inventory
        When I sort the products based on price "<option>"
        Then I can see the products sorted based on the price "<option>"

        Examples:
            | option |
            | lohi |
            | hilo |
            | az |
            | za |

    Scenario: Item can be bought from the inventory overview
        Given I am browsing the inventory
        When I click on Add to Cart for product "<name>"
        Then I can see that product in my cart

        Examples:
            | name |
            | Sauce Labs Backpack |

    Scenario: Item cannot be added to the cart more than once
        Given I am browsing the inventory
        When I click on Add to Cart for product "<name>"
        Then I cannot add product "<name>" again

        Examples:
        | name |
        | Sauce Labs Backpack |