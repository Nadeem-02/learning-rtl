import React from "react";
import { render , screen, fireEvent} from "@testing-library/react";
import {LoginForm} from './loginform'

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...(jest.requireActual('react-router-dom')),
    useNavigate: () => mockedUsedNavigate,
}))

describe("Login Form", () => {
    if('should render login form text', () => {
        render(<LoginForm/>)
        expect(screen.getByText("Login Form")).toBeInTheDocument()
    })

    it("should render form correctly", () => {
        render(<LoginForm/>)
        expect(screen.getByLabelText('Username:')).toBeInTheDocument();
        expect(screen.getByLabelText('Password:')).toBeInTheDocument();
        expect(screen.getByLabelText('Role:')).toBeInTheDocument();
        expect(screen.getByText('Login')).toBeInTheDocument();
    })

    it('should update username state when text is entered', () => {
        render(<LoginForm />);
        const usernameInput = screen.getByLabelText('Username:');
        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        expect(usernameInput.value).toBe('testuser');
      });

    it('should update password state when text is entered', () => {
        render(<LoginForm/>)
        const passwordInput = screen.getByTestId("passwordInput")
        fireEvent.change(passwordInput, {target: {value: 'testpassword'}});
        expect(passwordInput.value).toBe('testpassword')
    })

    it("should update a role when option is selected from the dropdown", () => {
        render(<LoginForm/>)
        const roleSelect = screen.getByTitle('role')
        fireEvent.change(roleSelect, {target:{value: 'admin'}})
        expect(roleSelect.value).toBe('admin')
     })

     it("should update remember me flag to true when checked", () => {
        render(<LoginForm/>)
        const rememberMeFlag = screen.getByTestId('rememberMe')

        expect(rememberMeFlag).not.toBeChecked()
        fireEvent.click(rememberMeFlag)
        expect(rememberMeFlag).toBeChecked()
     })

     it('should call handleSubmit function when we submit the form', () => {
        const handleSubmitMock = jest.fn()

        render( <LoginForm/>)

        const usernameInput = screen.getByLabelText('Username:');
        const passwordInput = screen.getByLabelText('Password:');
        const roleSelect = screen.getByLabelText('Role:');
        
        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
        fireEvent.change(roleSelect, { target: { value: 'admin' } });

        const rememberMeCheckbox = screen.getByTestId('rememberMe');
        fireEvent.click(rememberMeCheckbox);

        const form = screen.getByRole('form')
        form.addEventListener('submit', handleSubmitMock)
        fireEvent.submit(form)
        expect(handleSubmitMock).toHaveBeenCalled()
        expect(mockedUsedNavigate).toBeCalledWith('/posts')
        mockedUsedNavigate.mockRestore();

     })
})