/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useAppContext } from "@/context/AppContext";

interface Book {
  id: number;
  titulo: string;
  imagen: string;
  descripcion: string;
  fecha_publicacion: string;
}

const Home: React.FC = () => {
  const [books, setBook] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [active, setActive] = useState<boolean>(false);
  const { searchData } = useAppContext();


  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get("http://localhost:12990/api/libros");
        setBook(response.data);
      } catch (error: any) {
        console.error("Error fetching libros:", error);
        if (error.response && error.response.status === 401) {
          console.log({ error })
        }
      }
    };

    fetchBook();

  }, [navigate]);

  return (
    <>
      <div className="flex flex-wrap">
        <div className="sm:flex-auto p-8">
          <h1 className="text-base font-bold leading-6 text-gray-900">Biblioteca de Libros</h1>
          <p className="mt-2 text-sm text-gray-700">
            Una lista de todos los libros en tu biblioteca, incluyendo su título, descripción y más.
          </p>
        </div>
        <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8 p-6">
          {books.filter((book: Book) => {
            if (searchData === "" || searchData.length < 3) {
              return book;
            }

            if (
              book.titulo.toLowerCase().indexOf(searchData.toLowerCase()) > -1 ||
              book.descripcion.toLowerCase().indexOf(searchData.toLowerCase()) > -1
            ) {
              return book;
            }
          }).map((book) => (
            <li key={book.id} className="relative">
              <div className="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
                <img alt="" src={book.imagen} className="pointer-events-none object-cover group-hover:opacity-75" />
                <button onClick={() => [
                  setActive(true), setSelectedBook(book)
                ]} type="button" className="absolute inset-0 focus:outline-none">
                  <span className="sr-only">View details for {book.titulo}</span>
                </button>
              </div>
              <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">{book.titulo}</p>
              <p className="pointer-events-none block text-sm font-medium text-gray-500 truncate">{book.descripcion}</p>
              <p className="pointer-events-none block text-sm font-medium text-gray-500 truncate">{new Date(selectedBook?.fecha_publicacion).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}</p>
            </li>
          ))}
        </ul>
      </div>

      <AlertDialog open={active} onOpenChange={setActive}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center text-2xl">{selectedBook?.titulo}</AlertDialogTitle>
            <AlertDialogDescription>
                <div className="p-4 flex items-center justify-center flex-col">
                  <span className="truncate text-wrap text-gray-800 text-base">
                    {selectedBook?.descripcion}
                  </span>
                  <div className="pt-8">
                    <img width={300} height={300} src={selectedBook?.imagen} alt={selectedBook?.titulo} />
                  </div>
                  {new Date(selectedBook?.fecha_publicacion).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-blue-500 text-white hover:bg-blue-700 hover:text-white">Aceptar</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Home;
