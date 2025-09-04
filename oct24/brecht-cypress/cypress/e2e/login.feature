Feature: Login

    As a user
    I want to login into application

    Scenario: Login with valid credentials
        Given I visit a login page
        When I fill the login form with valid credentials
        Then I should see the home page

    Scenario: Attempt login with a locked out user
        Given I visit a login page
        When I fill the login form with a locked-out user
        Then I should see a locked-out error message

    Scenario: Try to login with invalid credentials
        Given I visit a login page
        When I fill the login form with "<username>" and "<password>"
        Then I should see an invalid credentials error message

        Examples:
            | username | password |
            | user | secret_sauce |
            | standard_user | psst |
            | fjklqfjq | jfkldqjfqdl |