/// <reference types="cypress" />

describe('Mobile framework Cordova links', () => {
    it('Verify status for PXB Environment setup page ', function () {
        cy.visit('localhost:3000/development/frameworks-mobile/cordova')
        cy.get(':nth-child(3) > a').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });

    it('Verify status for PXB Angular get started page', function () {
        cy.get('[href="/development/frameworks-web/angular"]').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });

    it('Verify status for PXB React get started page', function () {
        cy.get('[href="/development/frameworks-web/react"]').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });

    it('Verify status for Cordova cli page', function () {
        cy.get(':nth-child(16) > a').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });

    it('Verify status for Cordova quick start page', function () {
        cy.get('[href="https://cordova.apache.org/docs/en/latest/guide/cli/"]').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });

    it('Verify status for Cordova cli reference page', function () {
        cy.get('[href="https://cordova.apache.org/docs/en/latest/reference/cordova-cli/index.html"]').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });
});