// sample test
/// <reference types="Cypress" />
describe('Landing page visual cross-browser', () => {
    it('renders on common browsers', () => {
        cy.visit('http://localhost:3000/');
        cy.eyesOpen({
            appName: 'Power Xpert Blue Doc-it Site',
            testName: 'Doc-it landing page baseline',
            browser: [
                { width: 1024, height: 768, name: 'chrome' },
                { width: 1024, height: 768, name: 'ie11' },
                { width: 1024, height: 768, name: 'firefox' },
                { width: 1024, height: 768, name: 'safari' },
            ],
        });
        cy.eyesCheckWindow();
        cy.eyesClose();
    });
});
