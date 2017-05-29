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
  `status` enum('pending','hr-approved','fin-approved','processed','hr-reject-amnt/freq-exceed','hr-reject-doc-nomatch') DEFAULT 'pending',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_reimbursement_history`
--

LOCK TABLES `employee_reimbursement_history` WRITE;
/*!40000 ALTER TABLE `employee_reimbursement_history` DISABLE KEYS */;
INSERT INTO `employee_reimbursement_history` VALUES (19,1,36,1231,'2017-05-23 06:00:18','imgUploader_1495519218068_EESL (Internal list) - Updated till 02.03.2017 (1)(1).docx','hr-approved'),(20,1,36,131,'2017-05-23 08:27:19','imgUploader_1495528039071_npm-debug.log','hr-approved'),(21,1,37,131,'2017-05-23 08:27:27','imgUploader_1495528047418_salary round 5.txt','fin-approved'),(22,1,36,2431,'2017-05-23 08:27:41','imgUploader_1495528060989_salary round 5.txt','processed'),(23,1,37,415,'2017-05-23 08:27:49','imgUploader_1495528069492_Upload Files Or Images To Server Using Node JS.zip','fin-approved'),(24,1,36,321,'2017-05-23 09:09:32','imgUploader_1495530572355_3000restart.bat','hr-approved'),(25,1,37,4331,'2017-05-23 09:09:41','imgUploader_1495530581836_Salary_18052017 morning.txt','fin-approved'),(26,1,36,500,'2017-05-25 06:41:07','imgUploader_1495694467437_Report(5).xlsx','hr-approved'),(27,1,39,156786,'2017-05-29 07:07:56','imgUploader_1496041676752_Report(10).xlsx','hr-reject-amnt/freq-exceed');
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
  `gl_account_number` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reimbursement`
--

LOCK TABLES `reimbursement` WRITE;
/*!40000 ALTER TABLE `reimbursement` DISABLE KEYS */;
INSERT INTO `reimbursement` VALUES (20,5,'321321',321321,321321,NULL,NULL),(22,4,'asdas',3242,243,NULL,NULL),(24,5,'sfdsa',23432,24323,NULL,NULL),(25,4,'sgf',24332,24332,NULL,NULL),(27,3,'2342',432,4,NULL,NULL),(28,5,'2342',43232,432432432,NULL,NULL),(29,5,'gfds',2342,4242,NULL,NULL),(30,5,'321321',23432,24332,NULL,NULL),(31,4,'5436',324,2342,NULL,NULL),(33,3,'432432',4332,23432,NULL,NULL),(34,2,'543543',43543,543543,NULL,NULL),(35,2,'ertr',543,2432,NULL,NULL),(36,1,'Mobile Phone',10000,1,'E1',NULL),(37,1,'Datacard',2000,1,'E1',NULL),(38,5,'wewqewqqr',1231,31,'E1',NULL),(39,1,'Laptop',57000,1,'E1',NULL),(40,1,'test',123,1231,'E1','12321'),(41,1,'131',31,123,'E1',''),(42,1,'21431',313,131,'E1','312'),(43,1,'321',13221,3213,'E1','');
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

-- Dump completed on 2017-05-29 16:42:00
