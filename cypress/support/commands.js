// Авторизация
Cypress.Commands.add(
  "login",
  (email = "user@example.com", password = "password") => {
    cy.request({
      method: "POST",
      url: "/api/auth/login",
      body: { email, password },
    }).then((resp) => {
      window.localStorage.setItem("token", resp.body.token);
    });
    cy.visit("/");
  },
);

// Добавление книги в избранное
Cypress.Commands.add("addBookToFavorites", (bookTitle) => {
  cy.contains(bookTitle)
    .parent()
    .within(() => {
      cy.get("[data-cy=add-to-favorites]").click();
    });
});

// Удаление из избранного
Cypress.Commands.add("removeBookFromFavorites", (bookTitle) => {
  cy.contains(bookTitle)
    .parent()
    .within(() => {
      cy.get("[data-cy=remove-from-favorites]").click();
    });
});
