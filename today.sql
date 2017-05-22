-- MySQL dump 10.13  Distrib 5.7.18, for Win64 (x86_64)
--
-- Host: localhost    Database: itemlistdb
-- ------------------------------------------------------
-- Server version	5.7.18

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `carmake`
--

DROP TABLE IF EXISTS `carmake`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `carmake` (
  `country` enum('Sweden','Malaysia') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carmake`
--

LOCK TABLES `carmake` WRITE;
/*!40000 ALTER TABLE `carmake` DISABLE KEYS */;
/*!40000 ALTER TABLE `carmake` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee_reimbursement_history`
--

DROP TABLE IF EXISTS `employee_reimbursement_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employee_reimbursement_history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `emp_id` int(11) NOT NULL,
  `reimbursement_type` int(11) NOT NULL,
  `reimbursement_amount` int(11) DEFAULT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `filepath` varchar(2000) DEFAULT NULL,
  `status` enum('pending','hr-approved','fin-approved','processed') DEFAULT 'pending',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_reimbursement_history`
--

LOCK TABLES `employee_reimbursement_history` WRITE;
/*!40000 ALTER TABLE `employee_reimbursement_history` DISABLE KEYS */;
INSERT INTO `employee_reimbursement_history` VALUES (1,1,36,9000,'2017-05-22 06:29:39',NULL,'pending'),(2,1,37,1800,'2017-05-22 06:30:31',NULL,'pending'),(3,1,36,NULL,'2017-05-22 08:01:47',NULL,'pending'),(4,1,36,999,'2017-05-22 08:04:22',NULL,'pending'),(5,1,36,1231,'2017-05-22 08:06:57',NULL,'pending'),(6,1,36,231,'2017-05-22 08:07:38',NULL,'pending'),(7,1,36,4312,'2017-05-22 08:08:03',NULL,'pending'),(8,1,36,1321,'2017-05-22 08:19:12',',,,','pending'),(9,1,36,1231,'2017-05-22 08:20:31','[object Object],[object Object],[object Object],','pending'),(10,1,36,1231,'2017-05-22 08:21:15','Images\\imgUploader_1495441275789_3000restart.bat,Images\\imgUploader_1495441275790_5000restart.bat,Images\\imgUploader_1495441275791_npm-debug.log,Images\\imgUploader_1495441275792_test.sh,','pending'),(11,1,36,121,'2017-05-22 08:22:50','Images\\imgUploader_1495441370131_3000restart.bat,Images\\imgUploader_1495441370132_npm-debug.log,Images\\imgUploader_1495441370133_test.sh,Images\\imgUploader_1495441370134_salary round 5.txt','pending'),(12,1,36,121,'2017-05-22 08:24:03','Images\\imgUploader_1495441443621_3000restart.bat,Images\\imgUploader_1495441443622_5000restart.bat,Images\\imgUploader_1495441443623_npm-debug.log,Images\\imgUploader_1495441443623_test.sh','pending'),(13,1,37,1234,'2017-05-22 09:45:12','Images\\imgUploader_1495446312723_3000restart.bat','pending'),(14,1,36,121,'2017-05-22 11:54:05','Images\\imgUploader_1495454045126_3000restart.bat','pending'),(15,1,36,21321,'2017-05-22 12:09:30','Images\\imgUploader_1495454970743_npm-debug.log','pending'),(16,1,36,13212,'2017-05-22 12:54:07','Images\\imgUploader_1495457647854_3000restart.bat','pending'),(17,1,36,1341,'2017-05-22 12:56:15','Images\\imgUploader_1495457775679_npm-debug.lo','pending'),(18,1,36,3211,'2017-05-22 12:56:51','Images\\imgUploader_1495457810962_Upload Files Or Images To Server Using Node JS.zip','pending');
/*!40000 ALTER TABLE `employee_reimbursement_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee_type`
--

DROP TABLE IF EXISTS `employee_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employee_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_type`
--

LOCK TABLES `employee_type` WRITE;
/*!40000 ALTER TABLE `employee_type` DISABLE KEYS */;
INSERT INTO `employee_type` VALUES (1,'Regular'),(2,'FT/Contract'),(3,'Consultant'),(4,'Mas'),(5,'UPL');
/*!40000 ALTER TABLE `employee_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reimbursement`
--

DROP TABLE IF EXISTS `reimbursement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reimbursement` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `emp_type_id` int(11) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  `frequency` int(11) DEFAULT NULL,
  `emp_grade_code` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reimbursement`
--

LOCK TABLES `reimbursement` WRITE;
/*!40000 ALTER TABLE `reimbursement` DISABLE KEYS */;
INSERT INTO `reimbursement` VALUES (17,5,'3212',321321,321321,NULL),(18,5,'321321',321321,321321,NULL),(19,4,'321321',32,321321,NULL),(20,5,'321321',321321,321321,NULL),(22,4,'asdas',3242,243,NULL),(24,5,'sfdsa',23432,24323,NULL),(25,4,'sgf',24332,24332,NULL),(27,3,'2342',432,4,NULL),(28,5,'2342',43232,432432432,NULL),(29,5,'gfds',2342,4242,NULL),(30,5,'321321',23432,24332,NULL),(31,4,'5436',324,2342,NULL),(32,3,'543543',5,43543,NULL),(33,3,'432432',4332,23432,NULL),(34,2,'543543',43543,543543,NULL),(35,2,'ertr',543,2432,NULL),(36,1,'Mobile Phone',10000,1,'E1'),(37,1,'Datacard',2000,1,'E1');
/*!40000 ALTER TABLE `reimbursement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `task`
--

DROP TABLE IF EXISTS `task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `task` (
  `Id` varchar(50) NOT NULL,
  `Title` varchar(500) DEFAULT NULL,
  `Status` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task`
--

LOCK TABLES `task` WRITE;
/*!40000 ALTER TABLE `task` DISABLE KEYS */;
INSERT INTO `task` VALUES ('1','Go to Market tomorrow','done'),('2','Email to manager','pending'),('3','Push code to GitHub','done'),('4','Go For Running','done'),('5','Go to Movie','pending');
/*!40000 ALTER TABLE `task` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbluser`
--

DROP TABLE IF EXISTS `tbluser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbluser` (
  `UserId` int(11) NOT NULL AUTO_INCREMENT,
  `UserName` varchar(45) DEFAULT NULL,
  `Password` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`UserId`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbluser`
--

LOCK TABLES `tbluser` WRITE;
/*!40000 ALTER TABLE `tbluser` DISABLE KEYS */;
INSERT INTO `tbluser` VALUES (8,'User creation success','200');
/*!40000 ALTER TABLE `tbluser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(56) NOT NULL,
  `fullname` varchar(200) NOT NULL,
  `email_id` varchar(200) NOT NULL,
  `emp_no` varchar(50) DEFAULT NULL,
  `doj` varchar(50) DEFAULT NULL,
  `emp_grade_code` varchar(250) DEFAULT NULL,
  `emp_type_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'gr','Gourav Roy','groy@eesl.co.in','10000167','03-04-2017','E1',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-05-22 19:15:07
