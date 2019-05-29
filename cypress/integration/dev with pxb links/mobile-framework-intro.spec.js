/// <reference types="cypress" />

describe('Mobile framework intro links', () => {
    it('Verify status for Cordova home page ', function () {
        cy.visit('localhost:3000/development/frameworks-mobile/intro')
        cy.get(':nth-child(4) > :nth-child(6) > a').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });
});

describe('Mobile framework intro links', () => {
    it('Verify status for Native Script home page', function () {
        cy.get(':nth-child(7) > :nth-child(6) > a').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });
});

describe('Mobile framework intro links', () => {
    it('Verify status for React Native home page', function () {
        cy.get(':nth-child(8) > a').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });
});

describe('Mobile framework intro links', () => {
    it('Verify status for PXB Apache Cordova page', function () {
        cy.get(':nth-child(14) > :nth-child(1) > a').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });
});

describe('Mobile framework intro links', () => {
    it('Verify status for PXB NativeScript page', function () {
        cy.get(':nth-child(14) > :nth-child(2) > a').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });
});

describe('Mobile framework intro links', () => {
    it('Verify status for PXB React Native page', function () {
        cy.get(':nth-child(3) > a').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });
});