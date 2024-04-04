import { PostList } from "./postList";
import {render, screen} from '@testing-library/react'
import { useQuery } from "react-query";
import axios from "axios";

jest.mock('react-query')

jest.mock('axios', () => ({
    get: jest.fn(() => Promise.resolve({ data: [] }))
  }));

describe("Post list", () => {
    it("should render 'Fetching Posts...' text while loading", async () => {
        useQuery.mockReturnValue({
          isLoading: true,
          isError: false,
          data: null
        });
        render(<PostList />);
        expect(screen.getByTestId("fetching")).toBeInTheDocument();
      });

    it('should render error when there is error', () => {
        useQuery.mockReturnValue({
            isLoading: false,
            isError: true,
            data: null
          });
        render(<PostList />);
        const text = screen.queryByText('Something went wrong').innerHTML
        expect(text).toBe('Something went wrong')
    })

    it('should render list of item when loading is false and there is no error', async () => {
        useQuery.mockReturnValue({
            isLoading: false,
            isError: false,
            data: [{
                id: 1,
                title: "Testing 1"
            }, {
                id: 2,
                title: 'Testing 2'
            }, {
                id: 3,
                title: 'Testing 3'
            }]

        })

        render(<PostList/>)
        // Use getByText when you expect the element to be present and want the test to fail if it's not found.
        expect(screen.getByText('Testing 1')).toBeInTheDocument()
        // Use queryByText when you want to check for the presence of an element without throwing an error if it's not found.
        expect(screen.queryByText('Testing 2')).toBeInTheDocument()

    })  
})