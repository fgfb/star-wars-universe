import {describe, expect, it, vi} from 'vitest';
import {render} from '@testing-library/react';
import App from './App.tsx';

vi.mock('@tanstack/react-query', () => ({
    QueryClientProvider: vi.fn(),
    QueryClient: vi.fn(),
}));

vi.mock('react-router-dom', () => ({
    RouterProvider: vi.fn()
}));

vi.mock('./routes.tsx', () => ({
    router: {},
}));

describe('App', () => {

    it('should render [App]', () => {
        const { container } = render(<App />);
        expect(container).toBeTruthy();
    });
})