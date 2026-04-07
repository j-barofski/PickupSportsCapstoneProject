import { render, screen, fireEvent } from '@testing-library/react';
import MapFunc from '../map';


describe('MapFunc', () => {
  test('renders without crashing', () => {
    render(<MapFunc />);
  });

});