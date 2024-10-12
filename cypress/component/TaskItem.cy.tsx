import TaskItem from '@/components/taskList/TaskItem'
import React from 'react'

describe('TaskItem Component', () => {
    const mockTask = {
        id: 1,
        description: 'Test Task',
    }

    it('renders correctly', () => {
        cy.mount(
            <TaskItem
                task={mockTask}
                isFirst={true}
                onEdit={cy.stub()}
                showElements={false}
            />
        )
        cy.contains('Test Task').should('exist')
        cy.get('svg').should('have.class', 'text-gray-400')
    })

    it('calls onEdit when clicked', () => {
        const onEdit = cy.stub()
        cy.mount(
            <TaskItem
                task={mockTask}
                isFirst={true}
                onEdit={onEdit}
                showElements={false}
            />
        )
        cy.contains('Test Task').click()
        cy.wrap(onEdit).should('have.been.called')
    })

    it('shows avatar when isFirst is true', () => {
        cy.mount(
            <TaskItem
                task={mockTask}
                isFirst={true}
                onEdit={cy.stub()}
                showElements={false}
            />
        )
        cy.get('img[alt="@usuario"]').should('exist')
    })

    it('hides avatar when isFirst is false', () => {
        cy.mount(
            <TaskItem
                task={mockTask}
                isFirst={false}
                onEdit={cy.stub()}
                showElements={false}
            />
        )
        cy.get('img[alt="@usuario"]').should('not.exist')
    })
})