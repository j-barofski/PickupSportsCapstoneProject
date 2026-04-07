import { render, screen, fireEvent } from '@testing-library/react';
import AutoCompletion from '../autoCompletion';


describe('AutoCompletion', () => {
  test('renders without crashing', () => {
    render(<AutoCompletion />);
  });

});