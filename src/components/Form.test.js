import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Form from './Form';
import axios from 'axios';
import axiosMock from 'axios-mock-adapter';

const mockAxios = new axiosMock(axios);

// Mock les réponses de l'API
beforeEach(() => {
  mockAxios.reset();
});

describe('Form Component', () => {
  test('renders form inputs and submit button', () => {
    render(<Form addUser={jest.fn()} />);
    
    expect(screen.getByPlaceholderText('Prénom')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Nom')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Code Postal')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sauvegarder/i })).toBeDisabled(); // Le bouton est désactivé au départ
  });

  test('enables submit button when all fields are valid', async () => {
    render(<Form addUser={jest.fn()} />);

    fireEvent.change(screen.getByPlaceholderText('Prénom'), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText('Nom'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Code Postal'), { target: { value: '75001' } });

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /sauvegarder/i })).toBeEnabled();  // Le bouton est activé quand tous les champs sont valides
    });
  });

  test('submits form successfully', async () => {
    const addUserMock = jest.fn();
    mockAxios.onPost('/users').reply(201, { firstName: 'John' });

    render(<Form addUser={addUserMock} />);

    fireEvent.change(screen.getByPlaceholderText('Prénom'), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText('Nom'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Code Postal'), { target: { value: '75001' } });

    fireEvent.click(screen.getByRole('button', { name: /sauvegarder/i }));

    await waitFor(() => {
      expect(addUserMock).toHaveBeenCalledWith(expect.objectContaining({ firstName: 'John' }));
    });
  });
});
