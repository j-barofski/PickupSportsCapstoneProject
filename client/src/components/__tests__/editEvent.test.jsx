import { render, screen, fireEvent } from '@testing-library/react';
import EditEvent from '../editEvent';


describe('EditEvent', () => {
  test('renders without crashing', () => {
    render(<EditEvent title="Pickup" location={"NJ"} description="bball" attendees="1" time="2026-04-06"/>);
  });

  test('displays event information', () => {
    render(<EditEvent title="Pickup" location={"NJ"} description="bball" attendees="1" time="2026-04-06"/>);
    
    expect(screen.getByText('Pickup')).toBeInTheDocument();
    expect(screen.getByText('NJ')).toBeInTheDocument();
    expect(screen.getByText('bball')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2026-04-06')).toBeInTheDocument();
  });

  test('increments attendees count when clicked', () => {
    render(<attendees initialCount={1} />);
    
    fireEvent.click(screen.getByText('+'));
    
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  test('decrements attendees count when clicked', () => {
    render(<attendees initialCount={1} />);
    
    fireEvent.click(screen.getByText('-'));
    
    expect(screen.getByText('0')).toBeInTheDocument();
  });

});