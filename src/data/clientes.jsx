export async function obtenerClientes(){
    const respuesta = await fetch(import.meta.env.VITE_API_URL + '/clientes');
    const datos = await respuesta.json();
    return  datos;
}

export async function agregarCliente(cliente){
    try {
        await fetch(import.meta.env.VITE_API_URL + '/clientes',{
            method: 'POST',
            body: JSON.stringify(cliente),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.log(error);
    }
}

export async function obtenerCliente(id){
    const respuesta = await fetch(import.meta.env.VITE_API_URL + `/clientes/${id}`);
    const datos = await respuesta.json();
    return datos;
}

export async function editarCliente(id,cliente){
    try {
        await fetch(import.meta.env.VITE_API_URL + `/clientes/${id}`,{
            method: 'PUT',
            body: JSON.stringify(cliente),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.log(error);
    }
}

export async function eliminarCliente(id){
    try {
        await fetch(import.meta.env.VITE_API_URL + `/clientes/${id}`,{
            method: 'DELETE'
        });
    } catch (error) {
        console.log(error);
    }
}