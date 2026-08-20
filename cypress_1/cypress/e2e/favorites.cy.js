describe('Функциональность "Избранное"', () => {
  beforeEach(() => {
    cy.login();
    cy.intercept("GET", "/api/books").as("getBooks");
    cy.visit("/");
    cy.wait("@getBooks");
  });

  it("позволяет добавить книгу в избранное со страницы каталога", () => {
    const bookTitle = "Чистый код";
    cy.addBookToFavorites(bookTitle);
    cy.get("[data-cy=favorites-counter]").should("have.text", "1");

    cy.visit("/favorites");
    cy.contains(bookTitle).should("be.visible");
  });

  it("отображает счетчик избранного при добавлении нескольких книг", () => {
    const firstBook = "Чистый код";
    const secondBook = "Рефакторинг";

    cy.addBookToFavorites(firstBook);
    cy.addBookToFavorites(secondBook);

    cy.get("[data-cy=favorites-counter]").should("have.text", "2");
  });

  it("удаляет книгу из избранного и обновляет состояние кнопки", () => {
    const bookTitle = "Чистый код";
    cy.addBookToFavorites(bookTitle);
    cy.visit("/favorites");

    cy.removeBookFromFavorites(bookTitle);
    cy.contains(bookTitle).should("not.exist");
    cy.get("[data-cy=favorites-counter]").should("have.text", "0");

    //Проверка кнопки на главной странице
    cy.visit("/");
    cy.contains(bookTitle)
      .parent()
      .within(() => {
        cy.get("[data-cy=add-to-favorites]").should("be.visible");
      });
  });
});
