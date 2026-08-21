describe('template spec', () => {
  it('Should successfully login', {} => {
    cy.visit('http://localhost:3000');
    cy.get('#responsive-navbar-nav button.btn').click();
    cy.get('#mail').click();
    cy.get('#mail').type('test@test.com');
    cy.get('#pass').click();
    cy.get('#pass').type('test');
    cy.get('button.btn-success').click();
    cy.get('#responsive-navbar-nav span.pt-2').should('have.text', 'Добро пожаловать test@test.com');
  })
}) 
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
