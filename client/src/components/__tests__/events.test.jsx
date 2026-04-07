import { render, screen, fireEvent } from '@testing-library/react';
import Events from '../events';


describe('Events', () => {
  test('renders without crashing', () => {
    render(<Events />);
  });

});