/// <reference types="cypress" />

describe('Color Palette page links', () => {
    it('Verify request status for Material Design Color', function () {
        cy.visit('localhost:3000/style/color')
        cy.contains('weighted color palettes').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });

    it('Verify request status for PXB NPM Colors', function () {
        cy.get('[href="https://www.npmjs.com/package/@pxblue/colors"]').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });

    it('Verify request status for PXB NPM Branding Colors', function () {
        cy.get('[href="https://www.npmjs.com/package/@pxblue/colors-branding"]').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });

});