import React from "react";
import { useQuery } from "react-query";
import axios from 'axios';

const retrievePosts  =  async() => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
    return response.data
}

export const PostList = () => {
    
    const {data, isLoading, isError} = useQuery("postsData",retrievePosts)
    
    if(isLoading) return <div data-testid="fetching">Fetching Posts...</div>
    if(isError) return <div data-testid="error">Something went wrong</div>


    return (
        <ul>
            {
                data.map((item) => (
                    <li key={item.id} style={{textAlign:"left", fontSize:"18px", marginBottom:'5px'}}> 
                        {item.title}
                    </li>
                ))
            }
        </ul>
    )
}