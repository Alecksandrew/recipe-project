import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import RecipeCard from '../src/components/RecipeCard/RecipeCard';
import userEvent from '@testing-library/user-event';

describe('RecipeCard component', () => {

it("It should turn the empty icon into filled icon when it is clicked", async() => {
    const user = userEvent.setup();
    render(<RecipeCard />);

    const containerBookmark = screen.getByTestId("container-bookmark");
    const bookmarkIconEmpty = screen.getByTestId("bookmark-empty");
    
    expect(bookmarkIconEmpty).toBeInTheDocument();

    await user.click(containerBookmark);
    const bookmarkIconFilled = screen.getByTestId("bookmark-filled");

    expect(bookmarkIconFilled).toBeInTheDocument();
    expect(bookmarkIconEmpty).not.toBeInTheDocument();


});

it("It should show up either empty icon or filled icon", () => {
    
   render(<RecipeCard/>);
   
   
   const bookmarkIconFilled = screen.queryByTestId("bookmark-filled");
   const bookmarkIconEmpty = screen.queryByTestId("bookmark-empty");

   expect(bookmarkIconEmpty || bookmarkIconFilled).toBeInTheDocument();
});

});