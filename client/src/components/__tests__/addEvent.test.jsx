import { render, screen } from '@testing-library/react';
import AddEvent from '../addEvent';

describe('AddEvent', () => {
  test('renders without crashing', () => {
    render(<AddEvent name="Pasta" time={30} />);
  });

  test('displays recipe information', () => {
    render(<RecipeCard name="Pasta" time={30} />);
    
    expect(screen.getByText('Pasta')).toBeInTheDocument();
    expect(screen.getByText('30 minutes')).toBeInTheDocument();
  });
});