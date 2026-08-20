describe("Главная страница", () => {
  it("должна загружаться и содержать заголовок", () => {
    cy.visit("/");
    cy.get("h1").should("contain.text", "Книжная полка"); // Или другой текст из вашего UI
    cy.url().should("eq", `${Cypress.config("baseUrl")}/`);
  });
});
