/// <reference types="cypress" />

context('Images', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/survey.html')
  })

  it('is survey page', () => {
    cy.get('.page-title').should('contain', 'SURVEY')
  })

  it('loads image 01', () => {
    cy.get('.img-src-uses-require')
      .should('be.visible')
      .and(($img) => {
        // "naturalWidth" and "naturalHeight" are set when the image loads
        expect($img[0].naturalWidth).to.be.greaterThan(0)
      })
  })

  it('loads image 02', () => {
    cy.get('.img-from-html-loader')
      .should('be.visible')
      .and(($img) => {
        // "naturalWidth" and "naturalHeight" are set when the image loads
        expect($img[0].naturalWidth).to.be.greaterThan(0)
      })
  })
})
