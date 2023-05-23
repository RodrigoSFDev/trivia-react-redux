import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { act } from 'react-dom/test-utils';
/* import Login from '../pages/Login'; */
import App from '../App'

test('Verifica se a tela de login é renderizada corretamente', () => {
    renderWithRouterAndRedux(<App />);
    screen.getByRole('textbox', { name: /nome: email:/i });
    screen.getByText(/email:/i);
    screen.getByRole('button', { name: /configurações/i });
    screen.getByRole('button', { name: /play/i });
});

test('Verifica se o botão de play é habilitado após inserir email e senha certos', () => {
  renderWithRouterAndRedux(<App />);
  const nameRigth = 'teste teste'
  const emailRigtht = 'teste@teste.com';
  const btnPlay = screen.getByTestId('btn-play');

  act(() => userEvent.type(screen.getByTestId('input-player-name'), nameRigth));
  act(() => userEvent.type(screen.getByText(/email/i), emailRigtht));

  waitFor(() => {
    expect(btnPlay).not.toBeDisabled();
  })
});

test('Verifica se o botão de play continua desabilitado após inserir email e senha errados', () => {
  renderWithRouterAndRedux(<App />);
  const emailWrong = 'teste';
  const nameWrong = ''
  const btnPlay = screen.getByRole('button', { name: /play/i });

  userEvent.type(screen.getByText(/email/i), emailWrong);
  userEvent.type(screen.getByText(/nome/i), nameWrong);

  expect(btnPlay).toBeDisabled();
})

test('Verifica se ao clicar no botão de settings, o usuario é redirecionado para a rota /settings', () => {
  const { history } = renderWithRouterAndRedux(<App />);
  const config = screen.getByRole('button', { name: /configurações/i });

  act(() => userEvent.click(config));

  const { pathname } = history.location;
  expect(pathname).toBe('/settings');

  screen.getByText(/settings/i);
})
