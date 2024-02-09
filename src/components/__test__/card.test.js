import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import Card from "../card";

test("Card renders successfully", () => {
  render(<Card title="intuit" />);

  const element = screen.getByText(/intuit/i);

  expect(element).toBeInTheDocument();
});

test("moveRight click handler called", async () => {
  const mockHandleClick = jest.fn();
  const card = userEvent.setup();
  render(<Card title="test" rightClick={mockHandleClick} />);
  await card.click(screen.getByRole("button", { name: "→" }));

  expect(mockHandleClick).toHaveBeenCalled();
});
