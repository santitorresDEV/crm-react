import { Outlet,Link,useLocation } from "react-router-dom"



function Layout() {
    const location = useLocation()
    return (
        <div>
            <div className="md:flex md:min-h-screen">
                <aside className="md:w-1/4 bg-blue-900 px-5 py-10">
                    <h2 className="text-4xl font-black text-center text-white">CRM - Clientes</h2>
                    <nav className="mt-10">
                        <Link to="/" className={`${location.pathname === '/' ? 'text-blue-300':'text-white'} block my-5 hover:bg-blue-700 px-4 py-2 rounded`}>Clientes</Link>
                        <Link to="/clientes/nuevo" className={`${location.pathname === '/clientes/nuevo' ? 'text-blue-300':'text-white'} block my-5 hover:bg-blue-700 px-4 py-2 rounded`}>Nuevo Cliente</Link>
                    </nav>
                </aside>
                <main  className="md:w-3/4 p-10 md:h-screen overflow-scroll">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default Layout
