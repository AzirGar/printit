-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: 192.168.106.25    Database: print
-- ------------------------------------------------------
-- Server version	11.2.2-MariaDB-1:11.2.2+maria~ubu2204

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `impresiones`
--

DROP TABLE IF EXISTS `impresiones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `impresiones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` date DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `numImpresiones` int(11) DEFAULT NULL,
  `proyecto` varchar(255) DEFAULT NULL,
  `color` varchar(50) DEFAULT NULL,
  `observaciones` text DEFAULT NULL,
  `nombreArchivo` varchar(255) DEFAULT NULL,
  `estado` varchar(100) DEFAULT NULL,
  `area` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `impresiones`
--

LOCK TABLES `impresiones` WRITE;
/*!40000 ALTER TABLE `impresiones` DISABLE KEYS */;
INSERT INTO `impresiones` VALUES (1,'2023-12-11','Luis Enrique Carmen Garcia',1,'RH','color','RH','CHECKLIST SEGURIDAD E HIGIENE.docx','impreso','Infraestructura'),(2,'2023-12-12','Luis Enrique Carmen Garcia',1,'2','color','33','PNO-03-02-001 RequisiciÃ³n de Personal BECARIO MECANICO.docx','impreso','Infraestructura'),(3,'2023-12-13','Gerardo Rosales Ayala',1,'1','color','1','26_C_030.pdf','impreso',NULL),(4,'2023-12-14','Luz Elena Carmen Garcia',1,'1','color','1','VG-0144-EM Ensamble vÃ¡lvula de exhalaciÃ³n gÃ¤tsi_GE_Rev.02.pdf','impreso',NULL),(5,'2023-12-14','Luz Elena Carmen Garcia',1,'1','blancoNegro','1','Salida de Equipo-GATSIMED.docx','impreso',NULL),(6,'2023-12-14','Luz Elena Carmen Garcia',100,'Proyecto CONACYT','color','Archivo muy importante','PNO-03-02-001 RequisiciÃ³n de Personal BECARIO MECANICO.docx','impreso',NULL),(7,'2023-12-14','Luz Elena Carmen Garcia',200,'200','color','200','Salida de Equipo-GATSIMED.docx','impreso',NULL),(8,'2023-12-14','Luz Elena Carmen Garcia',1111,'1111','color','1111','Salida de Equipo-GATSIMED.docx','standby',NULL),(9,'2023-12-14','Luz Elena Carmen Garcia',3333,'3333','color','3333','Salida de Equipo-GATSIMED.docx','impreso',NULL),(10,'2023-12-14','Luz Elena Carmen Garcia',444,'444','color','444','Salida de Equipo-GATSIMED.docx','impreso',NULL),(11,'2023-12-14','Luz Elena Carmen Garcia',6666,'6666','color','6666','Salida de Equipo-GATSIMED.docx','impreso',NULL),(12,'2023-12-14','Luz Elena Carmen Garcia',312312312,'21312312','color','123213123','Salida de Equipo-GATSIMED.docx','impreso',NULL),(13,'2023-12-14','Luz Elena Carmen Garcia',2312312,'123123','color','21321312','Salida de Equipo-GATSIMED.docx','standby','Calidad'),(14,'2023-12-14','Luz Elena Carmen Garcia',221312312,'12312312312312','color','213123123123','Salida de Equipo-GATSIMED.docx','standby','Calidad'),(15,'2023-12-14','Luz Elena Carmen Garcia',2312312,'12312312','color','12312312','Luz Elena Carmen Garcia_Salida de Equipo-GATSIMED.docx','impreso','Calidad'),(16,'2023-12-15','Luis Enrique Carmen Garcia',12,'12','blancoNegro','12','Luis Enrique Carmen Garcia_26_C_030.pdf','impreso',NULL),(30,'2024-01-01','Luis Enrique Carmen Garcia',12,'1111','color','saddasd','wicho_CONSTANCIA DE SITUACION FISCAL GATSIMED 2024.pdf','stanby',NULL),(31,'2024-01-22','Luis Enrique Carmen Garcia',111,'Ss','color','111','wicho_CONSTANCIA DE SITUACION FISCAL GATSIMED 2024.pdf','stanby',NULL),(32,'2024-01-22','Aurora Quetzalli Escalante Cruz',222,'2222','color','aqweqweq','aurora_CONSTANCIA DE SITUACION FISCAL GATSIMED 2024.pdf','stanby',NULL),(33,'2024-01-22','Aurora Quetzalli Escalante Cruz',1111,'1111','color','11111','aurora_2024-01-05-PAGO COLACACION DE TABLAROCA $5,261.pdf','stanby',NULL),(34,'2024-01-22','Aurora Quetzalli Escalante Cruz',1,'Proyect','color','sadasdasdas','aurora_2024-INMOBILIARIA Y CONSTRUCTORA CEDILLO-2T.pdf','stanby',NULL),(35,'2024-01-22','Aurora Quetzalli Escalante Cruz',111,'111','color','asaSDASDAS','aurora_Jengi-1.pdf','stanby','Calidad'),(36,'2024-01-25','Luis Enrique Carmen Garcia',22,'wqeqw','color','qweqweqw','wicho_cot_3268-00356_24.pdf','stanby','Administracion'),(37,'2024-01-26','Aurora Quetzalli Escalante Cruz',1,'111111111','color','111','aurora_cot_3268-00356_24.pdf','stanby','Almacen'),(38,'2024-01-26','Luz Elena Carmen Garcia',1,'11121111','color','weqwewq','luzele_TerminaciÃ³n Claudia QuiÃ±ones.docx','stanby','Administracion'),(39,'2024-01-29','Luis Enrique Carmen Garcia',11,'wqeqwe','color','eqweqwe','wicho_FACTURA BATERIA.pdf','stanby','Administracion');
/*!40000 ALTER TABLE `impresiones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `nombre` varchar(100) NOT NULL,
  `area` varchar(100) NOT NULL,
  `empresa` varchar(100) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `tipo_usuario` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES ('Luis Enrique Carmen Garcia','Infraestrcutura','GATSI MED',1,'wicho','12345','admin'),('Gerardo Rosales Ayala','Infraestructura','DTM',2,NULL,NULL,NULL),('Victor Hugo Reyes Diaz','Infraestructura','GATSI MED',3,NULL,NULL,NULL),('Jannet Pichardo Campos','Infraestructura','GATSI MED',4,NULL,NULL,NULL),('Luz Elena Carmen Garcia','Calidad','GATSI MED',5,'luzele','12345','printer'),('Aurora Quetzalli Escalante Cruz','Calidad','GATSI MED',6,'aurora','12345','printer'),('Prueba','pRUEBA','T',7,'test','test','printer');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'print'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-05 15:45:35
