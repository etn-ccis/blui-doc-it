/// <reference types="cypress" />

describe('Framework intro links', () => {
    it('Verify status for Angular home page ', function () {
        cy.visit('localhost:3000/development/frameworks-web/intro')
        cy.get(':nth-child(4) > :nth-child(6) > a').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });

    it('Verify status for React home page', function () {
        cy.get(':nth-child(6) > :nth-child(6) > a').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });

    it('Verify status for PXB Angular guide', function () {
        cy.get(':nth-child(10) > :nth-child(1) > a').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });

    it('Verify status for PXB React guide', function () {
        cy.get(':nth-child(10) > :nth-child(2) > a').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });
});