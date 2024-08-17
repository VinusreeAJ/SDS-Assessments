describe('Login Form Validation', () => {
  // Common setup for each test
  beforeEach(() => {
    cy.visit('/');
    cy.wait(2000);
  });

  it('displays error messages when form is submitted without filling required fields', () => {

    // Attempt to submit the form without entering values
    cy.get('button[type="submit"]').click();
    cy.wait(2000);

    // Check that the Email error message is displayed
    cy.get('.text-danger')
      .should('be.visible')
      .and('contain.text', 'Email is required');
    cy.wait(2000);

    // Check that the password error message is displayed
    cy.get('.text-danger')
      .should('be.visible')
      .and('contain.text', 'Password is required');
  });

  it('check Email and password fields are getting values', () => {

    // Type into the Email field
    cy.get('#email').type('example.x@gmail.com');
    cy.wait(2000);
    cy.get('#email').should('have.value', 'example.x@gmail.com');

    // Type into the password field
    cy.get('#password').type('password123');
    cy.wait(2000);
    cy.get('#password').should('have.value', 'password123');
  });

  it('displays success message when form is submitted with valid email and password', () => {
    // Type into the Email field
    cy.get('#email').type('example.x@gmail.com');

    // Type into the password field
    cy.get('#password').type('password123');

    // Submit the form
    cy.get('button[type="submit"]').click();
    cy.wait(2000);

    // Check that the success message is displayed
    cy.get('.Toastify__toast--success')
      .should('be.visible')
      .and('contain.text', 'Successfully logged in');
  });
});