/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, NavLink, useLocation } from "react-router-dom"
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useAppContext } from "../../context/AppContext"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

import {
  CreditCard,
  Keyboard,
  LifeBuoy,
  Settings,
  User,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navigation = [
  { nombre: "Biblioteca", url: "/home" },
  { nombre: "Login", url: "/login" },
  { nombre: "Mantenimientos", url: "/mantenimientos" }
]

const Navbar = () => {
  const { logout, search, setSearchData } = useAppContext();
  const [token, setToken] = useState<any>(null);
  const [roleId, setRoleId] = useState<number | null>(null);
  const location = useLocation()

  useEffect(() => {
    setToken(localStorage.getItem("token"))
    setRoleId(Number(localStorage.getItem("roleId")));
  }, []);

  const handleLogout = () => {
    logout();
  };

  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex items-center px-2 lg:px-0">
            <div className="flex-shrink-0">
              <img
                alt="Your Company"
                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                className="h-8 w-auto"
              />
            </div>
            <div className="hidden lg:ml-6 lg:block">
              <div className="flex space-x-4">
                {navigation.map((nav: any) => (
                  <div key={nav.nombre}>
                    {nav.nombre === "Biblioteca" ?
                      <NavLink
                        key={nav.nombre}
                        className={({ isActive }) =>
                          `rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 ${isActive ? "bg-gray-900 text-white" : ""}`
                        }
                        to={nav.url}
                      >
                        {nav.nombre}
                      </NavLink>
                      :
                      null
                    }

                    {nav.nombre === "Login" && !localStorage.getItem("token") ?
                      <NavLink
                        key={nav.nombre}
                        className={({ isActive }) =>
                          `rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 ${isActive ? "bg-gray-900 text-white" : ""}`
                        }
                        to={nav.url}
                      >
                        {nav.nombre}
                      </NavLink>
                      :
                      null
                    }

                    {/* {nav.nombre === "Mantenimiento" && localStorage.getItem("token") ?
                      <NavLink
                        key={nav.nombre}
                        className={({ isActive }) =>
                          `rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 ${isActive ? "bg-gray-900 text-white" : ""}`
                        }
                        to={nav.url}
                      >
                        {nav.nombre}
                      </NavLink>
                      :
                      null
                    } */}

                    {/* {nav.nombre === "Mantenimiento" && localStorage.getItem("token") ?
                      <DropdownMenu
                        key={nav.nombre}
                      >
                        <DropdownMenuTrigger asChild>
                          <Button  >{nav.nombre}</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                          <DropdownMenuLabel>Manejo mantenimientos</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuGroup>
                            <DropdownMenuItem>
                              <User className="mr-2 h-4 w-4" />
                              <span>Libros</span>
                              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <CreditCard className="mr-2 h-4 w-4" />
                              <span>Autores</span>
                              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Settings className="mr-2 h-4 w-4" />
                              <span>Categorias</span>
                              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Keyboard className="mr-2 h-4 w-4" />
                              <span>Usuarios</span>
                              <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                          <DropdownMenuSeparator />

                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <LifeBuoy className="mr-2 h-4 w-4" />
                            <span>Soporte</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                        </DropdownMenuContent>
                      </DropdownMenu>
                      :
                      null
                    } */}

                    {/* Menu de Mantenimiento */}
                    {nav.nombre === "Mantenimientos" && token && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button>{nav.nombre}</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                          <DropdownMenuLabel>Manejo mantenimientos</DropdownMenuLabel>
                          <DropdownMenuSeparator />

                          <DropdownMenuGroup>
                            {roleId === 2 && (
                              <>
                                <DropdownMenuItem asChild>
                                  <Link to="/libros">
                                    <User className="mr-2 h-4 w-4" />
                                    <span>Libros</span>
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                  <Link to="/autores">
                                    <CreditCard className="mr-2 h-4 w-4" />
                                    <span>Autores</span>
                                  </Link>
                                </DropdownMenuItem>
                              </>
                            )}

                            {roleId === 1 && (
                              <>
                                <DropdownMenuItem asChild>
                                  <Link to="/mantenimientos/categorias">
                                    <Settings className="mr-2 h-4 w-4" />
                                    <span>Categorias</span>
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                  <Link to="/mantenimientos/usuarios">
                                    <Keyboard className="mr-2 h-4 w-4" />
                                    <span>Usuarios</span>
                                  </Link>
                                </DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuGroup>

                          <DropdownMenuSeparator />

                          <DropdownMenuItem>
                            <LifeBuoy className="mr-2 h-4 w-4" />
                            <span>Soporte</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>

                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-1 justify-center px-2 lg:ml-6 lg:justify-end">
            <div className="w-full max-w-lg lg:max-w-xs">
              <label htmlFor="search" className="sr-only">
                Buscar
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <MagnifyingGlassIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="search"
                  name="search"
                  type="search"
                  placeholder="Buscar"
                  onChange={e => [search(e.target.value), setSearchData]}
                  className="block w-full rounded-md border-0 bg-gray-700 py-1.5 pl-10 pr-3 text-gray-300 placeholder:text-gray-400 focus:bg-white focus:text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          <div className="flex lg:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
          <div className="hidden lg:ml-4 lg:block">
            <div className="flex items-center">
              <button
                type="button"
                className="relative flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span className="absolute -inset-1.5" />
                <span className="sr-only">View notifications</span>
                <BellIcon aria-hidden="true" className="h-6 w-6" />
              </button>

              <Menu
                as="div"
                className={cn(
                  "relative ml-4 flex-shrink-0",
                  !token ? "hidden" : ""
                )}

              >
                <div>
                  <MenuButton className="relative flex rounded-full bg-gray-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <img
                      alt=""
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      className="h-8 w-8 rounded-full"
                    />
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <MenuItem>
                    <Link to="/home"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100" onClick={handleLogout}>
                      Cerrar Sesion
                    </Link>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
          </div>
        </div>
      </div>

      <DisclosurePanel className="lg:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((nav: any) => (
            <div key={nav.nombre}>
              {nav.nombre === "Biblioteca" ?
                <DisclosureButton
                  key={nav.nombre}
                  as="a"
                  href={nav.url}
                  className={cn(
                    "block rounded-md  px-3 py-2 text-base font-medium text-white",
                    location.pathname === nav.url ? "bg-gray-900 text-white" : ""
                  )}
                >
                  {nav.nombre}
                </DisclosureButton>
                :
                null
              }

              {nav.nombre === "Login" && !localStorage.getItem("token") ?
                <DisclosureButton
                  key={nav.nombre}
                  as="a"
                  href={nav.url}
                  className={cn(
                    "block rounded-md  px-3 py-2 text-base font-medium text-white",
                    location.pathname === nav.url ? "bg-gray-900 text-white" : ""
                  )}
                >
                  {nav.nombre}
                </DisclosureButton>
                :
                null
              }

              {nav.nombre === "Mantenimientos" && localStorage.getItem("token") ?
                <DisclosureButton
                  key={nav.nombre}
                  as="a"
                  href={nav.url}
                  className={cn(
                    "block rounded-md  px-3 py-2 text-base font-medium text-white",
                    location.pathname === nav.url ? "bg-gray-900 text-white" : ""
                  )}
                >
                  {nav.nombre}
                </DisclosureButton>
                :
                null
              }
            </div>

          ))}

        </div>
        <div
          className={cn(
            "border-t border-gray-700 pb-3 pt-4",
            !localStorage.getItem("token") ? "hidden" : ""
          )}
        >
          <div className="flex items-center px-5">
            <div className="flex-shrink-0">
              <img
                alt=""
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                className="h-10 w-10 rounded-full"
              />
            </div>
            <div className="ml-3">
              <div className="text-base font-medium text-white">Tom Cook</div>
              <div className="text-sm font-medium text-gray-400">tom@example.com</div>
            </div>
            <button
              type="button"
              className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-3 space-y-1 px-2">
            <DisclosureButton
              as="a"
              href="#"
              className={cn(
                "block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white",
                !localStorage.getItem("token") ? "hidden" : ""
              )}
              onClick={handleLogout}
            >
              Cerrar Sesion
            </DisclosureButton>
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}

export default Navbar