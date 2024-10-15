-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: db_map_library
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `autores`
--

DROP TABLE IF EXISTS `autores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `autores` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `nacionalidad` varchar(45) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `creado_por` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `creado_por` (`creado_por`),
  CONSTRAINT `autores_ibfk_1` FOREIGN KEY (`creado_por`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `autores`
--

LOCK TABLES `autores` WRITE;
/*!40000 ALTER TABLE `autores` DISABLE KEYS */;
INSERT INTO `autores` VALUES (1,'Gabriel García Márquez','Ninguna','2024-10-13 20:59:15','2024-10-15 03:53:08',1),(2,'Pedro Felipe','a','2024-10-13 20:59:15','2024-10-13 22:34:58',1),(3,'J.K. Rowling','a','2024-10-13 20:59:15','2024-10-13 22:13:11',2),(4,'Stephen King','a','2024-10-13 20:59:15','2024-10-13 22:13:11',3),(5,'string','string','2024-10-13 22:33:09','2024-10-13 22:33:09',NULL),(6,'string','string','2024-10-13 23:17:39','2024-10-13 23:17:39',NULL);
/*!40000 ALTER TABLE `autores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `creado_por` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `creado_por` (`creado_por`),
  CONSTRAINT `categorias_ibfk_1` FOREIGN KEY (`creado_por`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES (1,'Novela','2024-10-13 20:59:44','2024-10-13 20:59:44',1),(2,'Pedro Felipe','2024-10-13 20:59:44','2024-10-15 04:30:53',1),(3,'Fantasía','2024-10-13 20:59:44','2024-10-13 20:59:44',1),(4,'Terror','2024-10-13 20:59:44','2024-10-13 20:59:44',1),(5,'Nueva','2024-10-15 04:21:35','2024-10-15 04:21:35',NULL),(6,'Ahora si','2024-10-15 04:24:28','2024-10-15 04:50:30',NULL);
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `libros`
--

DROP TABLE IF EXISTS `libros`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `libros` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(200) NOT NULL,
  `descripcion` text,
  `fecha_publicacion` datetime DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `creado_por` int DEFAULT NULL,
  `imagen` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `creado_por` (`creado_por`),
  CONSTRAINT `libros_ibfk_1` FOREIGN KEY (`creado_por`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `libros`
--

LOCK TABLES `libros` WRITE;
/*!40000 ALTER TABLE `libros` DISABLE KEYS */;
INSERT INTO `libros` VALUES (1,'El Resplandor','El Resplandor	','2024-10-10 00:00:00','2024-10-13 21:00:02','2024-10-15 17:51:25',1,'https://m.media-amazon.com/images/I/91n8sen+w1L._AC_UF1000,1000_QL80_.jpg'),(2,'Cruce de caminos','Cruce de caminos','2024-10-13 00:00:00','2024-10-13 21:00:02','2024-10-15 17:55:23',2,'https://marketplace.canva.com/EAFutLMZJKs/1/0/1003w/canva-portada-libro-novela-suspenso-elegante-negro-wxuYB_sJtMw.jpg'),(3,'Bleu','Bleu','2024-10-14 00:00:00','2024-10-13 21:00:02','2024-10-15 17:58:21',1,'https://pub-static.fotor.com/assets/projects/pages/5be9d15a-0dc6-49e0-b41b-b787b56a9fac/dark-blue-sky-book-cover-302c2497f51741ccb4f94de481b0a34c.jpg'),(4,'Reyes caidos','Reyes caidos','2024-10-13 00:00:00','2024-10-13 21:00:02','2024-10-15 17:55:55',4,'https://marketplace.canva.com/EAFjNCKkDPI/1/0/1003w/canva-portada-de-libro-de-fantas%C3%ADa-dram%C3%A1tico-verde-Ct1fLal3ekY.jpg'),(5,'Los hombres del Norte','Los hombres del Norte','2024-10-14 00:00:00','2024-10-13 23:21:05','2024-10-15 17:56:25',3,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8CfvRpGOrJlyQ9DKLwys66KZmCD2KS02Utw&s'),(6,'Heredera de fuego','Heredera de fuego','2024-10-14 00:00:00','2024-10-13 23:21:16','2024-10-15 17:57:05',2,'https://media.revistaad.es/photos/60c22735e4a4926cca84f1e7/master/w_1600%2Cc_limit/247855.jpg');
/*!40000 ALTER TABLE `libros` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `libros_autores`
--

DROP TABLE IF EXISTS `libros_autores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `libros_autores` (
  `libro_id` int NOT NULL,
  `autor_id` int NOT NULL,
  PRIMARY KEY (`libro_id`,`autor_id`),
  KEY `autor_id` (`autor_id`),
  CONSTRAINT `libros_autores_ibfk_1` FOREIGN KEY (`libro_id`) REFERENCES `libros` (`id`),
  CONSTRAINT `libros_autores_ibfk_2` FOREIGN KEY (`autor_id`) REFERENCES `autores` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `libros_autores`
--

LOCK TABLES `libros_autores` WRITE;
/*!40000 ALTER TABLE `libros_autores` DISABLE KEYS */;
INSERT INTO `libros_autores` VALUES (1,1),(2,2),(3,3),(4,4);
/*!40000 ALTER TABLE `libros_autores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `libros_categorias`
--

DROP TABLE IF EXISTS `libros_categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `libros_categorias` (
  `libro_id` int NOT NULL,
  `categoria_id` int NOT NULL,
  PRIMARY KEY (`libro_id`,`categoria_id`),
  KEY `categoria_id` (`categoria_id`),
  CONSTRAINT `libros_categorias_ibfk_1` FOREIGN KEY (`libro_id`) REFERENCES `libros` (`id`),
  CONSTRAINT `libros_categorias_ibfk_2` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `libros_categorias`
--

LOCK TABLES `libros_categorias` WRITE;
/*!40000 ALTER TABLE `libros_categorias` DISABLE KEYS */;
INSERT INTO `libros_categorias` VALUES (1,1),(2,1),(3,3),(4,4);
/*!40000 ALTER TABLE `libros_categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Administrador','2024-10-13 20:58:07','2024-10-13 20:58:07'),(2,'Bibliotecario','2024-10-13 20:58:07','2024-10-13 20:58:07');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `passwordHash` varchar(255) NOT NULL,
  `username` varchar(45) DEFAULT NULL,
  `roleId` int DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `creado_por` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `fk_rol_id` (`roleId`),
  KEY `fk_creado_por` (`creado_por`),
  CONSTRAINT `fk_creado_por` FOREIGN KEY (`creado_por`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `fk_rol_id` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'juan.perez@example.com','hashedpassword1','w',1,'2024-10-14 04:34:08','2024-10-14 04:34:08',NULL),(2,'ana.garcia@example.com','hashedpassword2','w',1,'2024-10-14 04:34:08','2024-10-14 04:34:08',NULL),(3,'carlos.martinez@example.com','hashedpassword3','w',1,'2024-10-14 04:34:08','2024-10-14 04:34:08',NULL),(4,'sofia.lopez@example.com','hashedpassword4','w',1,'2024-10-14 04:34:08','2024-10-14 04:34:08',NULL),(5,'test@test.com','123456','w',1,'2024-10-14 04:34:08','2024-10-14 04:34:08',NULL),(6,'test6@test.com','AQAAAAIAAYagAAAAEGMtr2sfwkef91EFFd/u15rCosXPYrUFDUmJpfRtKid02vM9Vmx8OpEGQRlrhp+bJA==','test6',1,'2024-10-14 04:34:08','2024-10-14 04:34:08',NULL),(7,'test7@test.com','AQAAAAIAAYagAAAAEB9mHVmxzRTS+S1KJnJ6bL6lvALLFIm6cV4JfpYfn7rxXngmZ2Hf3SsakwMTQhJsow==','test6',2,'2024-10-14 04:35:22','2024-10-14 04:35:22',NULL),(8,'test78@test.com','AQAAAAIAAYagAAAAEEMz6weSzsOG7j2MvgqhKkSlWRU65rF4q4vbfdRfbfqwXDv3QDS6AhzlwSkrh0INfQ==','test6',2,'2024-10-15 05:19:31','2024-10-15 05:19:31',NULL),(9,'admin@admin.com','AQAAAAIAAYagAAAAEMPCcktFWQfBldSNR7Og9df2gKjfBvARSYgudKg8nl+vu7xmxbVkKMoFMa90xtc/3A==','admin',1,'2024-10-15 17:48:46','2024-10-15 17:48:46',NULL),(10,'bibliotecario@bibliotecario.com','AQAAAAIAAYagAAAAEFQOk2Lsycuxh9uh5MF5075gLW3EVjXLgHfBGOWj/OWypGzgSE9Iqq32lL44xymPxw==','bibliotecario',2,'2024-10-15 17:49:04','2024-10-15 17:49:04',NULL);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-15 14:00:32
