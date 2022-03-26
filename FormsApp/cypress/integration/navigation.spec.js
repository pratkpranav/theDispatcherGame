/// <reference types="cypress" />

context('Navigation', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080')
  })

  it('is homepage', () => {
    cy.get('.page-title').should('contain', 'HOME')
    cy.location('pathname').should('equal', '/')
  })

  it('opens home page', () => {
    cy.get('body > nav > ul').contains('Home').click()
    cy.location('pathname', { timeout: 10000 }).should('contain', '/index.html')
    cy.get('.page-title').should('contain', 'HOME')
  })

  it('opens survey page', () => {
    cy.get('body > nav > ul').contains('Survey').click()
    cy.location('pathname', { timeout: 10000 }).should('contain', '/survey.html')
    cy.get('.page-title').should('contain', 'SURVEY')
  })

  it('opens game page', () => {
    cy.get('body > nav > ul').contains('Game').click()
    cy.location('pathname', { timeout: 10000 }).should('equal', '/game.html')
    cy.get('.page-title').should('contain', 'GAME')
  })

  it('navigation: home > survey > home', () => {
    cy.get('body > nav > ul').contains('Survey').click()
    cy.location('pathname', { timeout: 10000 }).should('contain', '/survey.html')
    cy.get('body > nav > ul').contains('Home').click()
    cy.location('pathname', { timeout: 10000 }).should('contain', '/index.html')
  })

  it('navigation: home > survey > game', () => {
    cy.get('body > nav > ul').contains('Survey').click()
    cy.location('pathname', { timeout: 10000 }).should('contain', '/survey.html')
    cy.get('body > nav > ul').contains('Game').click()
    cy.location('pathname', { timeout: 10000 }).should('contain', '/game.html')
  })

  it('navigation: home > game > home', () => {
    cy.get('body > nav > ul').contains('Game').click()
    cy.location('pathname', { timeout: 10000 }).should('contain', '/game.html')
    cy.get('body > nav > ul').contains('Home').click()
    cy.location('pathname', { timeout: 10000 }).should('contain', '/index.html')
  })

  it('navigation: home > game > survey', () => {
    cy.get('body > nav > ul').contains('Game').click()
    cy.location('pathname', { timeout: 10000 }).should('contain', '/game.html')
    cy.get('body > nav > ul').contains('Survey').click()
    cy.location('pathname', { timeout: 10000 }).should('contain', '/survey.html')
  })
})
