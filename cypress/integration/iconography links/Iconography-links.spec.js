/// <reference types="cypress" />

describe('Iconography page links', () => {
    it('Verify request status for PXB github icons', function () {
        cy.visit('localhost:3000/style/iconography')
        cy.contains('GitHub').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)
                })
        });
    });

    it('Verify PX Blue email', function () {
        cy.contains('Contact Us').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)
                })
        });
    });

    it('Verify request status for Material icons', function () {
        cy.contains('Material Icon Guidelines').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)
                })
        });
    });
});