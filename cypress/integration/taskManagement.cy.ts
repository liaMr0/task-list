describe('Task Management Integration', () => {
    beforeEach(() => {
        cy.intercept('GET', '/api/tasks', { fixture: 'tasks.json' }).as('getTasks')
        cy.intercept('POST', '/api/tasks', (req) => {
            req.reply({
                statusCode: 201,
                body: { id: 3, description: req.body.description }
            })
        }).as('addTask')
        cy.intercept('PUT', '/api/tasks', (req) => {
            req.reply({
                statusCode: 200,
                body: { id: req.body.id, description: req.body.description }
            })
        }).as('editTask')
        cy.visit('/')
    })

    it('loads and displays tasks', () => {
        cy.wait('@getTasks')
        cy.get('li').should('have.length', 2)
        cy.contains('Task 1').should('be.visible')
        cy.contains('Task 2').should('be.visible')
    })

    it('adds a new task', () => {
        cy.get('input[placeholder="Type to add new task"]').type('New Integration Task')
        cy.contains('Add').click()
        cy.wait('@addTask')
        cy.contains('New Integration Task').should('be.visible')
        cy.get('li').should('have.length', 3)
    })

    it('edits an existing task', () => {
        cy.contains('Task 1').click()
        cy.get('input[placeholder="Type to add new task"]').clear().type('Updated Integration Task')
        cy.contains('Update').click()
        cy.wait('@editTask')
        cy.contains('Updated Integration Task').should('be.visible')
        cy.contains('Task 1').should('not.exist')
    })

    it('toggles action bar visibility', () => {
        cy.get('input[placeholder="Type to add new task"]').focus()
        cy.get('.bg-[#FAFBFB]').should('be.visible')
        cy.get('body').click('top')
        cy.get('.bg-[#FAFBFB]').should('not.be.visible')
    })

    it('handles errors gracefully', () => {
        cy.intercept('GET', '/api/tasks', { statusCode: 500, body: { error: 'Server error' } }).as('getTasksError')
        cy.reload()
        cy.wait('@getTasksError')
        cy.contains('Failed to load tasks').should('be.visible')
    })

    it('maintains state across reloads', () => {
        cy.get('input[placeholder="Type to add new task"]').type('Persistent Task')
        cy.contains('Add').click()
        cy.wait('@addTask')
        cy.reload()
        cy.wait('@getTasks')
        cy.contains('Persistent Task').should('be.visible')
    })
})