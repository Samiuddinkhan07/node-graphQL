import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { gql,useQuery } from '@apollo/client'

const query = gql`
    query GetTodosWithUser{
      getTodos {
        title
        completed
        user {
          phone
          id
        }
      }
    } 
  `;
function App() {
  
  const {data,loading} = useQuery(query);

  if(loading) <h1>loading...</h1>

  console.log(data)
  return (
   
    <>
      {JSON.stringify(data)}
    </>
  )
}

export default App
