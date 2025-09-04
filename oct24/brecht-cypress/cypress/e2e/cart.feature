Feature: Cart
    
    As a logged in user 
    I have an overview of the items currently in my cart, which I can edit

    Scenario: Empty cart
        Given I am browsing the inventory
        When I click on the cart
        Then I see that there are no items in my cart

    Scenario: UI elements of cart items
        Given I am browsing the inventory
        And I click on Add to Cart for product "<name>"
        When I click on the cart
        Then I can see a qty, title, description, price and a remove button
        
        Examples:
            | name |
            | Sauce Labs Backpack |

    Scenario: Modify Qty of product in cart
        Given I am browsing the inventory
        And I click on Add to Cart for product "<name>"
        When I click on the cart
        Then I can update the quantity of product "<name>"

        Examples:
            | name |
            | Sauce Labs Backpack |

    Scenario: Cart persists after logging out
        Given I log out with "<productName>" in my cart
        When I log in
        And I click on the cart
        Then "<productName>" product is in my cart

        Examples:
            | productName |
            | Sauce Labs Backpack |