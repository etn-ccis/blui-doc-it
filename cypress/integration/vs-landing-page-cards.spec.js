// sameple test
/// <reference types="Cypress" />

context('Verify card links to page and displays correctly', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/');
    });

    afterEach(() => {
        cy.eyesClose();
    });
    it('Selecting Theme Guidelines Card displays theme page', () => {
        cy.eyesOpen({
            //baselineEnvName: "CrossBrowser",
            browser: [{ width: 1024, height: 768, name: 'chrome' }],
            batchName: 'Landing Page Card Data',
            appName: 'Power Xpert Blue Doc-it Site',
            testName: 'Theme guideline card displays themes page',
        });
        cy.contains('Theme Guidelines').click();
        cy.get('.MuiAppBar-positionSticky > .MuiToolbar-root').should('contain', 'Themes');
        cy.eyesCheckWindow();
    });
});
