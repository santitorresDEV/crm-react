import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Layout from './components/layout'
import NuevoCliente,{action as clienteAction}  from './pages/NuevoCliente'
import Index, { loader as clientesLoader } from './pages/Index'
import { ErrorPage } from './components/ErrorPage'
import EditarClientes, {loader as editarClienteLoader, action as editarClienteAction} from './pages/EditarClientes'
import {action as eliminarClienteAction} from './components/Cliente'



const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        index: true,
        element: <Index />,
        loader: clientesLoader,
        errorElement: <ErrorPage />,
      },
      {
        path: '/clientes/nuevo',
        element: <NuevoCliente />,
        action: clienteAction,
        errorElement: <ErrorPage />,
      },
      {
        path: '/clientes/:id/editar',
        element: <EditarClientes />,
        loader: editarClienteLoader,
        errorElement: <ErrorPage />,
        action: editarClienteAction
      },
      {
        path: '/clientes/:id/eliminar',
        action: eliminarClienteAction,
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
