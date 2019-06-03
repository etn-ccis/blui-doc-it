/// <reference types="cypress" />

describe('Landing page links', () => {
    it('Verify request status for Get Started', function () {
        cy.visit('localhost:3000')
        cy.contains('Get Started Guides').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });

    it('Verify request status for Framework Flexibility', function () {
        cy.contains('Framework Flexibility').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });

    it('Verify request status for Component Libraries', function () {
        cy.contains('Component Libraries').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });

    it('Verify request status for Design Patterns', function () {
        cy.contains('common interface').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });

    it('Verify request status for Code Samples', function () {
        cy.contains('Code SamplesLive').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });

    it('Verify request status for Style Guide', function () {
        cy.contains('Style GuideInformation').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });

    it('Verify request status for Resources', function () {
        cy.contains('Open Source').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });

    it('Verify request status for Eaton footer', function () {
        cy.contains('CCIS').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });

});