Feature: Website Navigation

Scenario: Verify the navigation to Projects section
  Given I view the homepage
  When I click "Projects"
  Then I should see the "Projects" page

Scenario: Verify the navigation to About section
  Given I view the homepage
  When I click "About"
  Then I should see the "About" page

Scenario: Verify the navigation to Contact section
  Given I view the homepage
  When I click "Contact"
  Then I should see the "Contact" page
