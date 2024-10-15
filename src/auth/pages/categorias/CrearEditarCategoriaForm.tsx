import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import 'react-toastify/dist/ReactToastify.css';

interface IFormInput {
    id: number;
    nombre: string;
}

const CrearEditarCategoriaForm: React.FC = () => {
    const { categoriaId } = useParams<{ categoriaId?: string }>();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<IFormInput>();
    const [isEditMode, setIsEditMode] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    useEffect(() => {
        if (categoriaId) {
            setIsEditMode(true);
            const fetchCategoria = async () => {
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                };

                if (!token) {
                    toast.error('Token no encontrado, por favor inicia sesión nuevamente.');
                    return;
                }

                try {
                    const response = await axios.get('http://localhost:12990/api/categorias', config);
                    const categorias = response.data;
                    const categoria = categorias.find((l: IFormInput) => l.id === parseInt(categoriaId));

                    if (categoria) {
                        setValue('nombre', categoria.nombre);
                    } else {
                        toast.error('Categoria no encontrado');
                    }
                } catch (error) {
                    console.error('Error al cargar las categoria:', error);
                    toast.error('Error al cargar los datos del autor');
                } finally {
                    setIsLoading(false);
                }
            };

            fetchCategoria();
        } else {
            setIsLoading(false);
        }
    }, [categoriaId, setValue, token]);

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        };

        if (!token) {
            toast.error('Token no encontrado, por favor inicia sesión nuevamente.');
            return;
        }

        if (data.id !== undefined && data.id.toString() !== categoriaId) {
            toast.error('No puedes modificar el ID de la categoria.');
            return;
        }

        try {
            if (isEditMode && categoriaId) {
                await axios.put(`http://localhost:12990/api/categorias/${categoriaId}`, data, config);
                toast.success('Categoria actualizado exitosamente');
            } else {
                await axios.post('http://localhost:12990/api/categorias', data, config);
                toast.success('Categoria creado exitosamente');
            }
            navigate('/categorias');
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 401) {
                    toast.error('No autorizado. Verifique su sesión.');
                } else {
                    toast.error(`Error: ${error.response.data.message || 'Error al enviar los datos'}`);
                }
            } else {
                toast.error('Error al enviar los datos');
            }
        }
    };

    const handleDelete = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        };

        if (!token) {
            toast.error('Token no encontrado, por favor inicia sesión nuevamente.');
            return;
        }

        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed && categoriaId) {
            try {
                await axios.delete(`http://localhost:12990/api/categorias/${categoriaId}`, config);
                Swal.fire('¡Eliminado!', 'La categoria ha sido eliminado.', 'success');
                navigate('/categorias');
            } catch (error) {
                if (axios.isAxiosError(error) && error.response) {
                    toast.error(`Error: ${error.response.data.message || 'Error al eliminar la categoria'}`);
                } else {
                    toast.error('Error al eliminar la categoria');
                }
            }
        }
    };

    if (isLoading) {
        return <p>Cargando...</p>;
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-12 m-4">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Formulario de Categorias</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">Completa los campos para manejar las categorias</p>

                    {isEditMode && categoriaId && (
                        <div className="mb-4">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                ID de la Categoria
                            </label>
                            <input
                                value={categoriaId}
                                readOnly
                                className="block w-16 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                            />
                        </div>
                    )}
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label htmlFor="nombre" className="block text-sm font-medium leading-6 text-gray-900">
                                Nombre
                            </label>
                            <div className="mt-2">
                                <input
                                    {...register('nombre', { required: true })}
                                    id="nombre"
                                    name="nombre"
                                    type="text"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                                />
                                {errors.nombre && <span>Este campo es requerido</span>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6 m-12">
                <Link to="/categorias">
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                        Cancelar
                    </button>
                </Link>
                {isEditMode && (
                    <button
                        type="button"
                        className="text-sm font-semibold leading-6 text-red-600 mr-4"
                        onClick={handleDelete}
                    >
                        Eliminar categoria
                    </button>
                )}
                <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    {isEditMode ? 'Guardar cambios' : 'Crear categoria'}
                </button>
            </div>
        </form>
    );
};

export default CrearEditarCategoriaForm;
