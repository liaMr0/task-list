describe.only('Task List Page', () => {
    it.only('should add a new task', () => {
        cy.visit('/')
        cy.get('input[placeholder="Type to add new task"]').type('New test task')
        cy.contains('Add').click()
        cy.contains('New test task')
    })
})