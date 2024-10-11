import React from 'react'
import { TaskList } from '@/components/taskList/TaskList'
import { Task } from '@/types/task'


const mockUseTaskManager = {
    tasks: [] as Task[],
    addTask: cy.stub().as('addTask'),
    editTask: cy.stub().as('editTask'),
    isLoading: false,
    error: null as string | null
};

const mockUseMobileDetection = cy.stub().returns(false);


cy.stub(require('@/hooks/useTaskManager'), 'useTaskManager').returns(mockUseTaskManager);
cy.stub(require('@/hooks/useMobileDetection'), 'useMobileDetection').returns(mockUseMobileDetection);

describe('TaskList Component', () => {
    it('renders loading state', () => {
        mockUseTaskManager.isLoading = true;
        cy.mount(<TaskList />)
        cy.contains('Loading tasks...').should('be.visible')
    })

    it('renders error state', () => {
        const errorMessage = 'Failed to load tasks'
        mockUseTaskManager.isLoading = false;
        mockUseTaskManager.error = errorMessage;
        cy.mount(<TaskList />)
        cy.contains(errorMessage).should('be.visible')
    })

    it('renders task form and list', () => {
        mockUseTaskManager.isLoading = false;
        mockUseTaskManager.error = null;
        mockUseTaskManager.tasks = [
            { id: 1, description: 'Task 1' },
            { id: 2, description: 'Task 2' },
        ];
        cy.mount(<TaskList />)
        cy.get('input[placeholder="Type to add new task"]').should('be.visible')
        cy.contains('Task 1').should('be.visible')
        cy.contains('Task 2').should('be.visible')
    })

    it('adds a new task', () => {
        mockUseTaskManager.isLoading = false;
        mockUseTaskManager.error = null;
        mockUseTaskManager.tasks = [];
        cy.mount(<TaskList />)
        cy.get('input[placeholder="Type to add new task"]').type('New Task')
        cy.contains('Add').click()
        cy.get('@addTask').should('have.been.calledWith', 'New Task')
    })

    it('edits an existing task', () => {
        mockUseTaskManager.isLoading = false;
        mockUseTaskManager.error = null;
        mockUseTaskManager.tasks = [{ id: 1, description: 'Task 1' }];
        cy.mount(<TaskList />)
        cy.contains('Task 1').click()
        cy.get('input[placeholder="Type to add new task"]').clear().type('Updated Task')
        cy.contains('Update').click()
        cy.get('@editTask').should('have.been.calledWith', 1, 'Updated Task')
    })

    it('renders correctly on narrow screens', () => {
        mockUseTaskManager.isLoading = false;
        mockUseTaskManager.error = null;
        mockUseTaskManager.tasks = [];
        mockUseMobileDetection.returns(true);
        cy.mount(<TaskList />)
        cy.get('button').contains('Cancel').should('not.exist')
        cy.get('button').last().find('svg').should('exist')
    })
})