import { render, screen, fireEvent } from '../utils/testUtils.tsx';
import { NotificationBanner } from '../components/NotificationBanner';

describe('Notification Banner', () => {
  const mockOnClose = jest.fn();
  const testMessage = 'Test notification message';

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('calls onClose when close button is clicked', () => {
    render(
      <NotificationBanner message={testMessage} onClose={mockOnClose} />
    );

    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('renders with success variant by default', () => {
    render(
      <NotificationBanner message={testMessage} onClose={mockOnClose} />
    );

    expect(screen.getByText(testMessage)).toBeInTheDocument();
    expect(screen.getByText('Success')).toBeInTheDocument();
  });

  it('renders with error variant when specified', () => {
    render(
      <NotificationBanner
        message={testMessage}
        onClose={mockOnClose}
        variant="error"
      />
    );

    expect(screen.getByText('Error')).toBeInTheDocument();
  });
});
