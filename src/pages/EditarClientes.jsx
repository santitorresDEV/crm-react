import { Form,useNavigate,useLoaderData, useActionData } from "react-router-dom";
import { editarCliente, obtenerCliente } from "../data/clientes";
import Formulario from "../components/Formulario";
import Error from "../components/Error";


export async function loader({params}) {
    const {id} = params;
    const cliente = await obtenerCliente(id);
    if(!cliente) throw new Response(null,{status: 404, statusText: 'No hay resultados'});
    return cliente;
}

export async function action({request,params}) {
  const formData = await request.formData()

  const data = Object.fromEntries(formData)

  const email = formData.get('email')

  //Validacion

  const errores = []
  if (Object.values(data).includes('')) {
    errores.push('Todos los campos son obligatorios')
  }

  let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");

  if (!regex.test(email)) {
    errores.push('El email no es valido')
  }
  //Retornar errores
  if (errores.length > 0) {
    return errores;
  }

  //Guardar en la base de datos

  await editarCliente(params.id,data);

  return Response.redirect('/');

}

const EditarClientes = () => {


  const navigate = useNavigate();
  const cliente = useLoaderData();
  const errores = useActionData();

  return (
    <>
        <h1 className='font-black text-4xl text-blue-900'>Editar cliente</h1>
      <p className='mt-3 '>Llena todos los campos para editar a un nuevo cliente</p>

      <div className="flex justify-end">
        <button
          className="bg-blue-800 py-2 px-4 mt-5 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold"
          onClick={() => navigate(-1)}
        >
          Volver
        </button>
      </div>

      <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20">
        {errores?.length && errores.map((error, i) => (
          <Error key={i} className="font-bold text-red-500">{error}</Error>
          )
        )}
        <Form
          method="post"
          noValidate
        >
          <Formulario 
            cliente={cliente}
          />
          <input type="submit" className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-xl"
            value="Editar cliente"
          />
        </Form>
      </div>
    </>
  )
}

export default EditarClientes
