import React from 'react';
import {
  render, fireEvent, wait
} from '@testing-library/react';
import NewUserDialog from '../NewUserDialog';
import * as UserService from '../../services/user';

const name = {
  firstName: 'firstName',
  lastName: 'lastName'
};

describe('NewUserDialog', () => {
  it('renders a new user dialog', () => {
    const close = jest.fn();
    const { getByTestId, getByRole, getByText } = render(<NewUserDialog isOpen close={close} />);
    expect(getByTestId('new-user-dialog')).toBeInTheDocument();
    expect(getByText('please enter details')).toBeInTheDocument();
    expect(getByTestId('firstName')).toBeInTheDocument();
    expect(getByTestId('lastName')).toBeInTheDocument();
    expect(getByRole('button')).toBeInTheDocument();
  });

  it('does not render a new user dialog when not open', () => {
    const close = jest.fn();
    const { queryByTestId } = render(<NewUserDialog isOpen={false} close={close} />);
    expect(queryByTestId('new-user-dialog')).toBeNull();
  });

  it('submit button should be disabled initially', () => {
    const close = jest.fn();
    const { getByRole } = render(<NewUserDialog isOpen close={close} />);
    expect(getByRole('button')).toBeDisabled();
  });

  it('submit button should be enabled when both firstname and lastname are filled', () => {
    const close = jest.fn();
    const {
      getByTestId, getByRole
    } = render(<NewUserDialog isOpen close={close} />);
    fireEvent.change(getByTestId('firstName'), {
      target: {
        value: name.firstName
      }
    });
    expect(getByRole('button')).toBeDisabled();
    fireEvent.change(getByTestId('lastName'), {
      target: {
        value: name.lastName
      }
    });
    expect(getByRole('button')).not.toBeDisabled();
  });

  it('should call close function on close submit button click', async () => {
    const close = jest.fn();
    const mockAddUser = async () => null;
    const addUser = jest.spyOn(UserService, 'addUser').mockImplementation(mockAddUser);
    const {
      getByTestId, getByRole
    } = render(<NewUserDialog isOpen close={close} />);
    fireEvent.change(getByTestId('firstName'), {
      target: {
        value: 'firstName'
      }
    });
    fireEvent.change(getByTestId('lastName'), {
      target: {
        value: 'lastName'
      }
    });
    expect(getByRole('button')).not.toBeDisabled();
    fireEvent.click(getByRole('button'));
    expect(addUser.mock.calls.length).toBe(1);
    expect(addUser.mock.calls[0][0]).toMatchObject(name);
    await wait();
    expect(close).toBeCalledTimes(1);
  });
});
