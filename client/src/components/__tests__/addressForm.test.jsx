import { render, screen, fireEvent } from '@testing-library/react';
import AddressForm from '../addressForm';

describe('AddressForm', () => {
  test('renders without crashing', () => {
    render(<AddressForm address="1 Main" city="City" state="Sate" postcode="1" country="Country"/>);
  });

  test('displays event information', () => {
    render(<AddressForm address="1 Main" city="City" state="Sate" postcode="1" country="Country"/>);
    
    expect(screen.getByText('1 Main')).toBeInTheDocument();
    expect(screen.getByText('City')).toBeInTheDocument();
    expect(screen.getByText('State')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('Country')).toBeInTheDocument();
  });

  test('maps appears when clicked', () => {
    render(<button initialCount={0} />);
    
    fireEvent.click(button);
    
    expect(screen.getByText('Events Near You')).toBeInTheDocument();
  });

});