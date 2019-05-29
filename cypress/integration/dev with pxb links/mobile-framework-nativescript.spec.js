/// <reference types="cypress" />

describe('Mobile framework Native Script links', () => {
    it('Verify status for PXB Environment setup page ', function () {
        cy.visit('localhost:3000/development/frameworks-mobile/nativescript')
        cy.get('div > :nth-child(3) > a').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });
});

describe('Mobile framework Native Script links', () => {
    it('Verify status for Sidekick page', function () {
        cy.get(':nth-child(4) > li > a').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });
});

describe('Mobile framework Native Script links', () => {
    it('Verify status for Native Script cli page', function () {
        cy.get(':nth-child(6) > a').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });
});

describe('Mobile framework Native Script links', () => {
    it('Verify status for Native Script play ground', function () {
        cy.get(':nth-child(12) > a').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });
});

describe('Mobile framework Native Script links', () => {
    it('Verify status for Native Script components', function () {
        cy.get(':nth-child(24) > :nth-child(1) > a').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });
});

describe('Mobile framework Native Script links', () => {
    it('Verify status for NB Material components', function () {
        cy.get(':nth-child(24) > :nth-child(2) > a').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });
});

describe('Mobile framework Native Script links', () => {
    it('Verify status for Native Script Cards', function () {
        cy.get(':nth-child(24) > :nth-child(3) > a').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });
});

describe('Mobile framework Native Script links', () => {
    it('Verify status for Native Script drop downs', function () {
        cy.get(':nth-child(4) > a').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });
});

describe('Mobile framework Native Script links', () => {
    it('Verify status for Native Script snack bar', function () {
        cy.get(':nth-child(5) > a').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });
});