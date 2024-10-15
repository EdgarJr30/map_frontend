/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

interface Autor {
    id: number;
    nombre: string;
    nacionalidad: string;
}

const Autores = () => {
    const [autores, setAutores] = useState<Autor[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAutores = async () => {
            try {
                // Obtener el token del localStorage
                const token = localStorage.getItem('token'); // Cambia 'token' por el nombre que usas

                // Configurar los headers de la solicitud
                const headers = {
                    Authorization: `Bearer ${token}`,
                };

                const response = await axios.get("http://localhost:12990/api/autores", { headers });
                setAutores(response.data);
            } catch (error: any) {
                console.error("Error fetching autores:", error);
                if (error.response && error.response.status === 401) {
                    console.log("No autorizado. Redirigiendo a login...");
                    // Redirigir al usuario al login si no está autorizado
                    navigate('/login'); // Cambia la ruta según sea necesario
                }
            }
        };

        fetchAutores();
    }, [navigate]);

    const handleEdit = (id: number) => {
        navigate(`/autores/${id}`);
    };

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center m-2">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900">Autores</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        Una lista de todos los autores en tu biblioteca, incluyendo su nombre, nacionalidad y más.
                    </p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <Link to="/autores/crear"
                        type="button"
                        className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Crear Autor
                    </Link>
                </div>
            </div>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                                <tr>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                        Nombre
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Nacionalidad
                                    </th>
                                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                        <span className="sr-only">Editar</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {autores.map((autor) => (
                                    <tr key={autor.id}>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                            {autor.nombre}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{autor.nacionalidad}</td>
                                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                            <button
                                                onClick={() => handleEdit(autor.id)}
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                Editar<span className="sr-only">{autor.id}</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Autores;
