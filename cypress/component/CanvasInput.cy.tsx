import CanvasInput from "@/components/CanvasInput"

describe('CanvasInput Component', () => {
    it('renders correctly', () => {
        cy.mount(
            <CanvasInput
                value=""
                onChange={cy.stub()}
                onFocus={cy.stub()}
                placeholder="Enter text"
            />
        )
        cy.get('input').should('exist')
        cy.contains('Enter text').should('exist')
    })

    it('updates value on change', () => {
        const onChange = cy.stub()
        cy.mount(
            <CanvasInput
                value=""
                onChange={onChange}
                onFocus={cy.stub()}
                placeholder="Enter text"
            />
        )
        cy.get('input').type('Hello')
        cy.wrap(onChange).should('have.been.calledWith', 'Hello')
    })

    it('calls onFocus when input is focused', () => {
        const onFocus = cy.stub()
        cy.mount(
            <CanvasInput
                value=""
                onChange={cy.stub()}
                onFocus={onFocus}
                placeholder="Enter text"
            />
        )
        cy.get('input').focus()
        cy.wrap(onFocus).should('have.been.called')
    })

    it('styles mentions correctly', () => {
        cy.mount(
            <CanvasInput
                value="Hello @user"
                onChange={cy.stub()}
                onFocus={cy.stub()}
                placeholder="Enter text"
            />
        )
        cy.contains('@user').should('have.css', 'color', 'rgb(7, 168, 115)')
    })

    it('styles hashtags correctly', () => {
        cy.mount(
            <CanvasInput
                value="Hello #tag"
                onChange={cy.stub()}
                onFocus={cy.stub()}
                placeholder="Enter text"
            />
        )
        cy.contains('#tag').should('have.css', 'color', 'rgb(112, 46, 230)')
    })

    it('styles emails correctly', () => {
        cy.mount(
            <CanvasInput
                value="Contact user@example.com"
                onChange={cy.stub()}
                onFocus={cy.stub()}
                placeholder="Enter text"
            />
        )
        cy.contains('user@example.com').should('have.css', 'color', 'rgb(245, 142, 10)')
    })

    it('styles links correctly', () => {
        cy.mount(
            <CanvasInput
                value="Visit https://example.com"
                onChange={cy.stub()}
                onFocus={cy.stub()}
                placeholder="Enter text"
            />
        )
        cy.contains('https://example.com').should('have.css', 'color', 'rgb(0, 127, 255)')
    })
})