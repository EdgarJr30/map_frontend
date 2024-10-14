import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

interface Books {
  id: number;
  nombre: string;
}

const LibraryPage: React.FC = () => {
  const [books, setBooks] = useState<Books[]>([]);
  const navigate = useNavigate();

  // Función para obtener el token desde localStorage
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      // Si no hay token, redirige a login
      navigate("/login");
    } else {
      // Configurar el header de la solicitud con el token
      const fetchBooks = async () => {
        try {
          const response = await axios.get("http://localhost:12990/api/libros", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setBooks(response.data);
        } catch (error) {
          console.error("Error fetching books:", error);
          // Manejar el error si el token es inválido o hay otro error
          if (error.response && error.response.status === 401) {
            // Redirigir a login si el token es inválido
            navigate("/login");
          }
        }
      };

      fetchBooks();

      console.log(fetchBooks)
    }
  }, [token, navigate]);

  return (
    <div className="flex flex-wrap gap-6">
      {books.map((book) => (
        <Card key={book.id} className="w-full max-w-[48rem] flex-row">
          <CardHeader
            shadow={false}
            floated={false}
            className="m-0 w-2/5 shrink-0 rounded-r-none"
          >
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
              alt="card-image"
              className="h-full w-full object-cover"
            />
          </CardHeader>
          <CardBody>
            <Typography variant="h6" color="gray" className="mb-4 uppercase">
              Autor
            </Typography>
            <Typography variant="h4" color="blue-gray" className="mb-2">
              {author.nombre}
            </Typography>
            <Typography color="gray" className="mb-8 font-normal">
              Información adicional sobre el autor o los libros del autor podría ir aquí.
            </Typography>
            <a href="#" className="inline-block">
              <Button variant="text" className="flex items-center gap-2">
                Learn More
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  />
                </svg>
              </Button>
            </a>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default LibraryPage;
