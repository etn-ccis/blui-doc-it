/// <reference types="cypress" />

describe('Testing app links', () => {
    it('Verify status for Jasmine page ', function () {
        cy.visit('localhost:3000/development/testing')
        cy.get('[href="https://jasmine.github.io/2.0/introduction"]').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });
});

describe('Testing app links', () => {
    it('Verify status for Karma page', function () {
        cy.get('[href="https://karma-runner.github.io/latest/index.html"]').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });
});

describe('Testing app links', () => {
    it('Verify status for Jest repo page', function () {
        cy.get('[href="https://github.com/facebook/jest"]').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });
});

describe('Testing app links', () => {
    it('Verify status for running tests page', function () {
        cy.get('[href="https://facebook.github.io/create-react-app/docs/running-tests"]').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });
});

describe('Testing app links', () => {
    it('Verify status for Enzyme page', function () {
        cy.get('[href="https://airbnb.io/enzyme/"]').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });
});

describe('Testing app links', () => {
    it('Verify status for React test library repo page', function () {
        cy.get('[href="https://github.com/kentcdodds/react-testing-library"]').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });
});

describe('Testing app links', () => {
    it('Verify status for PXB cypress doc page', function () {
        cy.get('[href="https://github.com/pxblue/pxblue-docs/blob/testing_strategies/cypress.md"]').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });
});

describe('Testing app links', () => {
    it('Verify status for Cypress doc page', function () {
        cy.get('[href="https://docs.cypress.io/guides/getting-started/installing-cypress.html#System-requirements"]').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });
});