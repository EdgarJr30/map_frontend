import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import 'react-toastify/dist/ReactToastify.css';

interface IFormInput {
    id?: number;
    titulo: string;
    descripcion: string;
    fecha_publicacion: string;
    imagen: string;
}

const CrearEditarLibroForm: React.FC = () => {
    const { libroId } = useParams<{ libroId?: string }>();
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<IFormInput>();
    const [isEditMode, setIsEditMode] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    useEffect(() => {
        if (libroId) {
            setIsEditMode(true);
            axios.get('http://localhost:12990/api/libros')
                .then((response) => {
                    const libros = response.data;
                    const libro = libros.find((l: IFormInput) => l.id === parseInt(libroId));

                    if (libro) {
                        const formattedDate = new Date(libro.fecha_publicacion).toISOString().split('T')[0];

                        setValue('titulo', libro.titulo);
                        setValue('descripcion', libro.descripcion);
                        setValue('fecha_publicacion', formattedDate);
                        setValue('imagen', libro.imagen);
                    } else {
                        toast.error('Libro no encontrado');
                    }
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error('Error al cargar los libros:', error);
                    toast.error('Error al cargar los datos del libro');
                    setIsLoading(false);
                });
        } else {
            setIsLoading(false);
        }
    }, [libroId, setValue]);

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        if (data.id !== undefined && data.id.toString() !== libroId) {
            toast.error('No puedes modificar el ID del libro.');
            return;
        }
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
            if (isEditMode && libroId) {
                await axios.put(`http://localhost:12990/api/libros/${libroId}`, data, config);
                toast.success('Libro actualizado exitosamente');
            } else {
                await axios.post('http://localhost:12990/api/libros', data, config);
                toast.success('Libro creado exitosamente');
            }
            navigate('/libros');
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

        if (result.isConfirmed && libroId) {
            try {
                await axios.delete(`http://localhost:12990/api/libros/${libroId}`, config);
                Swal.fire('¡Eliminado!', 'El libro ha sido eliminado.', 'success');
                navigate('/libros');
            } catch (error) {
                if (axios.isAxiosError(error) && error.response) {
                    toast.error(`Error: ${error.response.data.message || 'Error al eliminar el libro'}`);
                } else {
                    toast.error('Error al eliminar el libro');
                }
            }
        }
    };

    if (isLoading) {
        return <p>Cargando...</p>;
    }
    const imageUrl = watch('imagen');

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-12 m-4">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Formulario de Libros</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">Completa los campos para manejar los libros</p>

                    {isEditMode && libroId && (
                        <div className="mb-4">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                ID del Libro
                            </label>
                            <input
                                value={libroId}
                                readOnly
                                className="block w-16 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                            />
                        </div>
                    )}
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label htmlFor="titulo" className="block text-sm font-medium leading-6 text-gray-900">
                                Título
                            </label>
                            <div className="mt-2">
                                <input
                                    {...register('titulo', { required: true })}
                                    id="titulo"
                                    name="titulo"
                                    type="text"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                                />
                                {errors.titulo && <span>Este campo es requerido</span>}
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="descripcion" className="block text-sm font-medium leading-6 text-gray-900">
                                Descripción
                            </label>
                            <div className="mt-2">
                                <input
                                    {...register('descripcion', { required: true })}
                                    id="descripcion"
                                    name="descripcion"
                                    type="text"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                                />
                                {errors.descripcion && <span>Este campo es requerido</span>}
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="imagen" className="block text-sm font-medium leading-6 text-gray-900">
                                Imagen (URL)
                            </label>
                            <div className="mt-2">
                                <input
                                    {...register('imagen', { required: true })}
                                    id="imagen"
                                    name="imagen"
                                    type="text"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                                />
                                {errors.imagen && <span>Este campo es requerido</span>}
                            </div>
                            {imageUrl && (
                                <div className="mt-2">
                                    <img src={imageUrl} alt="Preview" className="w-1/2 h-auto rounded" />
                                </div>
                            )}
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="fecha_publicacion" className="block text-sm font-medium leading-6 text-gray-900">
                                Fecha de Publicación
                            </label>
                            <div className="mt-2">
                                <input
                                    {...register('fecha_publicacion', { required: true })}
                                    id="fecha_publicacion"
                                    name="fecha_publicacion"
                                    type="date"
                                    className="block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                                />
                                {errors.fecha_publicacion && <span>Este campo es requerido</span>}
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6 m-12">
                <Link to="/libros">
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
                        Eliminar libro
                    </button>
                )}
                <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    {isEditMode ? 'Guardar cambios' : 'Crear libro'}
                </button>
            </div>
        </form>
    );
};

export default CrearEditarLibroForm;