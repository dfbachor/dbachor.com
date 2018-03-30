-- MySQL dump 10.13  Distrib 5.6.23, for osx10.8 (x86_64)
--
-- Host: localhost    Database: petersonSkiAndCycle
-- ------------------------------------------------------
-- Server version	5.6.23

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
-- Table structure for table `contractNotes`
--

use petersonSkiAndCycle;

DROP TABLE IF EXISTS `contractNotes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contractNotes` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `contractID` int(11) NOT NULL,
  `userID` int(11) DEFAULT NULL,
  `note` varchar(1056) NOT NULL,
  `dayte` datetime NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contractNotes`
--

LOCK TABLES `contractNotes` WRITE;
/*!40000 ALTER TABLE `contractNotes` DISABLE KEYS */;
INSERT INTO `contractNotes` VALUES (1,2,NULL,'est','2016-09-27 19:21:45'),(2,2,NULL,'rwarrwarwar','2016-09-27 19:22:39'),(3,2,NULL,'fsfgsdfgsgbgn','2016-09-27 19:22:42'),(4,21,NULL,'test','2016-09-28 21:57:20'),(5,14,NULL,'customer was a pain in the ass on the phone','2016-09-30 16:00:25'),(6,14,NULL,'customer was cool','2016-09-30 16:00:30');
/*!40000 ALTER TABLE `contractNotes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contracts`
--

DROP TABLE IF EXISTS `contracts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contracts` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(25) NOT NULL,
  `lastName` varchar(25) NOT NULL,
  `Initial` varchar(2) NOT NULL,
  `cellPhone` varchar(15) NOT NULL,
  `street` varchar(25) NOT NULL,
  `city` varchar(25) NOT NULL,
  `state` varchar(2) NOT NULL,
  `zip` varchar(5) NOT NULL,
  `weight` int(11) NOT NULL,
  `height` varchar(6) NOT NULL,
  `age` int(11) NOT NULL,
  `emailAddress` varchar(50) NOT NULL,
  `skierType` varchar(3) NOT NULL,
  `snowboardStance` varchar(10) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contracts`
--

--
-- Table structure for table `system`
--

DROP TABLE IF EXISTS `system`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `system` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `creationDate` date NOT NULL,
  `companyName` varchar(35) NOT NULL,
  `companyPhone` varchar(15) NOT NULL,
  `showClosedTasks` tinyint(1) NOT NULL,
  `logoImage` varchar(256) NOT NULL,
  `operatorUserName` varchar(25) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `system`
--

LOCK TABLES `system` WRITE;
/*!40000 ALTER TABLE `system` DISABLE KEYS */;
INSERT INTO `system` VALUES (1,'2016-09-27','Peterson Ski and Cycle','123-123-1231',0,'photos/settings_1_default.jpg','uadmin');
/*!40000 ALTER TABLE `system` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `taskNotes`
--

DROP TABLE IF EXISTS `taskNotes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `taskNotes` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `taskID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `note` varchar(1056) NOT NULL,
  `dayte` datetime NOT NULL,
  `operatorUserName` varchar(25) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `taskNotes`
--

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tasks` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `task` varchar(1056) NOT NULL,
  `assignedUserID` int(11) NOT NULL,
  `status` varchar(15) NOT NULL,
  `openDate` date NOT NULL,
  `closeDate` date DEFAULT NULL,
  `operatorUserName` char(25) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--


--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(25) NOT NULL,
  `lastname` varchar(25) NOT NULL,
  `username` varchar(25) NOT NULL,
  `email` varchar(50) NOT NULL,
  `loggedOn` tinyint(1) NOT NULL,
  `ipAddress` varchar(16) NOT NULL,
  `password` varchar(50) NOT NULL,
  `rawpassword` varchar(50) NOT NULL,
  `hash` varchar(256) NOT NULL,
  `role` char(1) NOT NULL,
  `operatorUserName` varchar(25) NOT NULL,
  `siteOwner` tinyint(1) NOT NULL,
  `photoFileName` varchar(256) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'User','Admin','uadmin','user@admin.com',1,'127.0.0.1','user','user','ee11cbb19052e40b07aac0ca060c23ee','a','uadmin',0,'photos/user_1_atthepickle.jpg');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userNotes`
--

DROP TABLE IF EXISTS `userNotes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `userNotes` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `userID` int(11) NOT NULL,
  `editingUserID` int(11) NOT NULL,
  `note` varchar(1056) NOT NULL,
  `dayte` datetime NOT NULL,
  `operatorUserName` varchar(25) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userNotes`
--

LOCK TABLES `userNotes` WRITE;
/*!40000 ALTER TABLE `userNotes` DISABLE KEYS */;
INSERT INTO `userNotes` VALUES (1,1,1,'admin','2016-09-27 20:39:50','uadmin');
/*!40000 ALTER TABLE `userNotes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-09-30 16:16:49
