describe('Task List', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('allows adding a new task', () => {
        const newTask = 'New task for testing'
        cy.get('input[placeholder="Type to add new task"]').type(newTask)
        cy.contains('Add').click()
        cy.contains(newTask).should('be.visible')
    })

    it('allows editing an existing task', () => {
        const initialTask = 'Initial task'
        const editedTask = 'Edited task'


        cy.get('input[placeholder="Type to add new task"]').type(initialTask)
        cy.contains('Add').click()

        cy.contains(initialTask).click()
        cy.get('input[placeholder="Type to add new task"]').clear().type(editedTask)
        cy.contains('Update').click()

        cy.contains(editedTask).should('be.visible')
        cy.contains(initialTask).should('not.exist')
    })

    it('displays loading state', () => {
        cy.intercept('GET', '/api/tasks', (req) => {
            req.reply((res) => {
                res.send({ fixture: 'tasks.json' })
            })
        }).as('getTasks')

        cy.visit('/')
        cy.contains('Loading tasks...').should('be.visible')
        cy.wait('@getTasks')
        cy.contains('Loading tasks...').should('not.exist')
    })

    it('displays error state', () => {
        cy.intercept('GET', '/api/tasks', { statusCode: 500, body: { error: 'Server error' } }).as('getTasksError')

        cy.visit('/')
        cy.wait('@getTasksError')
        cy.contains('Failed to load tasks').should('be.visible')
    })

    it('handles mobile view', () => {
        cy.viewport('iphone-x')
        cy.visit('/')
    })
})