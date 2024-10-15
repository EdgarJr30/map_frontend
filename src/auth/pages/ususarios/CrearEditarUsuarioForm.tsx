import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import 'react-toastify/dist/ReactToastify.css';

interface IFormInput {
    id: number;
    username: string;
    email: string;
    password: string;
    roleId: number;
}

const CrearEditarUsuarioForm: React.FC = () => {
    const { usuarioId } = useParams<{ usuarioId?: string }>();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<IFormInput>();
    const [isEditMode, setIsEditMode] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    useEffect(() => {
        if (usuarioId) {
            setIsEditMode(true);
            const fetchUsuario = async () => {
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
                    const response = await axios.get('http://localhost:12990/api/auth', config);
                    const usuarios = response.data;
                    const usuario = usuarios.find((l: IFormInput) => l.id === parseInt(usuarioId));

                    if (usuario) {
                        setValue('username', usuario.username);
                        setValue('email', usuario.email);
                        setValue('password', usuario.password);
                        setValue('roleId', usuario.roleId);
                    } else {
                        toast.error('usuario no encontrado');
                    }
                } catch (error) {
                    console.error('Error al cargar los usuarios:', error);
                    toast.error('Error al cargar los datos del usuario');
                } finally {
                    setIsLoading(false);
                }
            };

            fetchUsuario();
        } else {
            setIsLoading(false);
        }
    }, [usuarioId, setValue, token]);

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

        if (data.id !== undefined && data.id.toString() !== usuarioId) {
            toast.error('No puedes modificar el ID del usuario.');
            return;
        }

        try {
            if (isEditMode && usuarioId) {
                await axios.put(`http://localhost:12990/api/auth/${usuarioId}`, data, config);
                toast.success('usuario actualizado exitosamente');
            } else {
                await axios.post('http://localhost:12990/api/auth/register', data, config);
                toast.success('usuario creado exitosamente');
            }
            navigate('/auth');
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 401) {
                    toast.error('No autorizado. Verifique su sesión.');
                } else {
                    console.log(error)
                    toast.error(`Error: ${error.response.data.message || 'Error al enviar los datos'}`);
                }
            } else {
                console.log(error)
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

        if (result.isConfirmed && usuarioId) {
            try {
                await axios.delete(`http://localhost:12990/api/auth/${usuarioId}`, config);
                Swal.fire('¡Eliminado!', 'El usuario ha sido eliminado.', 'success');
                navigate('/usuarios');
            } catch (error) {
                if (axios.isAxiosError(error) && error.response) {
                    toast.error(`Error: ${error.response.data.message || 'Error al eliminar el usuario'}`);
                } else {
                    toast.error('Error al eliminar el usuario');
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
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Formulario de usuarios</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">Completa los campos para manejar los usuarios</p>

                    {isEditMode && usuarioId && (
                        <div className="mb-4">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                ID del usuario
                            </label>
                            <input
                                value={usuarioId}
                                readOnly
                                className="block w-16 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                            />
                        </div>
                    )}
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                Nombre
                            </label>
                            <div className="mt-2">
                                <input
                                    {...register('username', { required: true })}
                                    id="username"
                                    name="username"
                                    type="text"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                                />
                                {errors.username && <span>Este campo es requerido</span>}
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email
                            </label>
                            <div className="mt-2">
                                <input
                                    {...register('email', { required: true })}
                                    id="email"
                                    name="email"
                                    type="text"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                                />
                                {errors.email && <span>Este campo es requerido</span>}
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Contraseña
                            </label>
                            <div className="mt-2">
                                <input
                                    {...register('password', { required: true })}
                                    id="password"
                                    name="password"
                                    type="password"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                                />
                                {errors.password && <span>Este campo es requerido</span>}
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="roleId" className="block text-sm font-medium leading-6 text-gray-900">
                                Role
                            </label>
                            <div className="mt-2">
                                <input
                                    {...register('roleId', { required: true })}
                                    id="roleId"
                                    name="roleId"
                                    type="number"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                                />
                                {errors.roleId && <span>Este campo es requerido</span>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6 m-12">
                <Link to="/auth">
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
                        Eliminar usuario
                    </button>
                )}
                <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    {isEditMode ? 'Guardar cambios' : 'Crear usuario'}
                </button>
            </div>
        </form>
    );
};

export default CrearEditarUsuarioForm;
