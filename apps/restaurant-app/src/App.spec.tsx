import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
    it('renders the App component', () => {
        render(<App />);
    });

    it('should render title', () => {
        render(<App />);
        screen.getByText('Wakeup Labs Challenge');
    });
});
