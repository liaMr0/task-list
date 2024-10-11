import React from 'react'
import { useTaskManager } from '@/hooks/useTaskManager'

const TestComponent = () => {
    const { tasks, addTask, editTask, isLoading, error } = useTaskManager()

    return (
        <div>
            <div data-testid="loading">{isLoading ? 'Loading' : 'Not Loading'}</div>
            <div data-testid="error">{error || 'No Error'}</div>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>{task.description}</li>
                ))}
            </ul>
            <button onClick={() => addTask('New Task')}>Add Task</button>
            <button onClick={() => editTask(1, 'Edited Task')}>Edit Task</button>
        </div>
    )
}

describe('useTaskManager Hook', () => {
    beforeEach(() => {
        cy.intercept('GET', '/api/tasks', { fixture: 'tasks.json' }).as('getTasks')
    })

    it('fetches tasks on mount', () => {
        cy.mount(<TestComponent />)
        cy.wait('@getTasks')
        cy.get('li').should('have.length', 2)
    })

    it('adds a new task', () => {
        cy.intercept('POST', '/api/tasks', { id: 3, description: 'New Task' }).as('addTask')
        cy.mount(<TestComponent />)
        cy.contains('Add Task').click()
        cy.wait('@addTask')
        cy.get('li').should('have.length', 3)
    })

    it('edits an existing task', () => {
        cy.intercept('PUT', '/api/tasks', { id: 1, description: 'Edited Task' }).as('editTask')
        cy.mount(<TestComponent />)
        cy.contains('Edit Task').click()
        cy.wait('@editTask')
        cy.contains('Edited Task').should('be.visible')
    })

    it('handles fetch error', () => {
        cy.intercept('GET', '/api/tasks', { statusCode: 500, body: { error: 'Server error' } }).as('getTasksError')
        cy.mount(<TestComponent />)
        cy.wait('@getTasksError')
        cy.get('[data-testid="error"]').should('contain', 'Failed to load tasks')
    })
})