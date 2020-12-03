-- MariaDB dump 10.17  Distrib 10.4.11-MariaDB, for Linux (x86_64)
--
-- Host: classmysql.engr.oregonstate.edu    Database: cs361_ochoast
-- ------------------------------------------------------
-- Server version	10.4.15-MariaDB-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


CREATE DATABASE IF NOT EXISTS `cs361_ochoast` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `cs361_ochoast`;

--
-- Table structure for table `companies`
--

DROP TABLE IF EXISTS `companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `companies` (
  `company_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(100) NOT NULL,
  `industry` varchar(50) NOT NULL,
  PRIMARY KEY (`company_id`),
  UNIQUE KEY `course_UN` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8 COMMENT='Companies';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companies`
--

LOCK TABLES `companies` WRITE;
/*!40000 ALTER TABLE `companies` DISABLE KEYS */;
INSERT INTO `companies` VALUES (1,'Boeing','Commercial Airplane Manufacturer','Aerospace'),(2,'Palantir','Top Secret Software Ops','Government Contractor'),(3,'Asana','Project Management Cloud Platform','Software'),(4,'Arduino','Homebrew Development Platform','Hardware'),(5,'NASA','Space exploration','Aerospace'),(6,'NVIDIA','Graphics Hardware','Hardware'),(7,'Google','Internet related services and products','Software'),(8,'SpaceX','Commercial space exploration','Aerospace'),(9,'Deloitte ','Consulting','Government Contractor'),(10,'Electronic Arts','Video games','Software'),(11,'Chemonics International','International development','Government Contractor'),(12,'Virgina Galactic','Commercial spacecraft','Aerospace'),(13,'Intel','CPU manufacturer','Hardware'),(14,'Apple','Mobile phones, laptops, and other hardware','Hardware'),(15,'Lockheed Martin','National Security','Government Contractor'),(16,'Microsoft','Operating systems','Software'),(17,'Lucid','Collaboration Platform','software'),(18,'Facebook','Social Media Platform','Software'),(19,'Twitter','Social Media Platform','Software'),(20,'Reddit','Social Media Platform','Software'),(21,'Agilent Technologies','Analytical Instrumentation Manufacturer','Science'),(22,'Sigma-Aldrich','Chemical and Biotech Company','Chemistry'),(24,'Marantz','Audio Equipment Manufacturer','Electronics'),(25,'Samsung','General Electronics Manufacturer','Electronics'),(26,'Western Digital','Hard Drive Manufacturer','Hardware'),(27,'General Motors','Automobile Manufacturer','Automotive'),(28,'NBC','News Corporation','Media'),(29,'Denon','Audio Equipment Manufacturer','Electronics'),(30,'Pfizer','Drug Manufacturer','Pharmaceutical'),(31,'AstraZeneca','Drug Manufacturer','Pharmaceutical'),(32,'Lufthansa','Commercial Airline','Airline'),(33,'Rita\'s Water Ice','Water Ice and Ice Cream','Food'),(34,'Asus','Consumer-Level Computer Hardware Manufacturer','Hardware'),(37,'Dairy Queen','Ice Cream Novelties','Food'),(38,'Saladworks','Salads and Sandwiches','Food'),(39,'Burger King','Fast Food - Burgers','Food'),(40,'Taco Bell','Fast Mexican Food','Food'),(41,'Sonic','Hot Dogs and Hamburgers','Food'),(42,'Fender','Guitars','Music Hardware'),(43,'','',''),(44,'Deer Park','Bottled Water Manufacturer','Food'),(45,'Linux Foundation','Open Source OS Authority','Software');
/*!40000 ALTER TABLE `companies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact_details`
--

DROP TABLE IF EXISTS `contact_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contact_details` (
  `contact_details_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `expert_id` int(10) unsigned NOT NULL,
  `phone` varchar(64) NOT NULL,
  `work_email` varchar(255) DEFAULT NULL,
  `school_email` varchar(255) DEFAULT NULL,
  `github_user` varchar(40) DEFAULT NULL,
  `linkedin_url` varchar(2048) DEFAULT NULL,
  `city` varchar(100) NOT NULL,
  `state` varchar(100) NOT NULL,
  `country` varchar(100) NOT NULL,
  PRIMARY KEY (`contact_details_id`),
  UNIQUE KEY `contact_details_UN` (`phone`),
  KEY `contact_details_FK` (`expert_id`),
  CONSTRAINT `contact_details_FK` FOREIGN KEY (`expert_id`) REFERENCES `experts` (`expert_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8 COMMENT='Contact Details';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact_details`
--

LOCK TABLES `contact_details` WRITE;
/*!40000 ALTER TABLE `contact_details` DISABLE KEYS */;
INSERT INTO `contact_details` VALUES (1,1,'+110-234-345-9887','workEmail1@gmail.com','schoolEmail1@gmail.com','MineGitHub1','https://linkedin.com/aliaskjalskdf/9087234s3/myprofile.php','Chicago','IL','United States'),(2,2,'(650)867-5309','work_email_2@hotmail.com','my_uni_2@uni.edu','MineGithub2','https://linkedin.com/alkjasdlfkjx323452/as33zcmexxxlkj333/profile2.html','San Francisco','CA','United States'),(3,3,'(415)666-5555','work_email_3@hotmail.com','my_uni_3@uni.edu','MineGithub3','https://linkedin.com/alkjasdlfkjx323452/as33zcmexxxlkj333/profile3.html','Denver','CO','United States'),(4,4,'(510)444-4567','work_email_5@hotmail.com','my_uni_5@uni.edu','MineGithub5','https://linkedin.com/alkjasdlfkjx323452/as33zcmexxxlkj333/newprof.html','Boise','ID','United States'),(5,29,'123-456-7890',NULL,NULL,NULL,NULL,'Philadelphia','Pennsylvania','United States'),(11,36,'123-457-7890','charlotte@microsoft.com','charlotte@upenn.edu','charlotte','linkedin.com/in/charlotte_russo','Philadelphia','Pennsylvania','United States'),(12,37,'121-457-7890','charlotte@microsoft.com','charlotte@upenn.edu','charlotte','linkedin.com/in/charlotte_russo','Philadelphia','Pennsylvania','United States'),(13,38,'111-457-7890','charlotte@microsoft.com','charlotte@upenn.edu','charlotte','linkedin.com/in/charlotte_russo','Philadelphia','Pennsylvania','United States'),(14,39,'111-457-7810','charlotte@microsoft.com','charlotte@upenn.edu','charlotte','linkedin.com/in/charlotte_russo','Philadelphia','Pennsylvania','United States'),(15,40,'555-333-2111','daCen@job.com','cenzineo@los.colm','ceccioj','linkedin.com/in/vincenz3321','Napoli','Toscano','Italia'),(17,42,'856-444-4825','jane@mcintosh.com','jausten@osu.edu','jausten','https://linkedin/com/in/jane_austen','Newcastle','Newcastle upon Tyne','United Kingdom'),(18,43,'215-666-6666','','','charlotte','https://www.linkedin.com/in/charlotte','Philadelphia','Pennsylvania','United States'),(19,44,'267-222-4444','hello@hi.com','csweb77@osu.edu','crusso','https://linkedin/com/in/crusso','Philadelphia','Pennsylvania','United States'),(20,45,'907-444-5899','ted@work.com','ted@school.edu','ted','linkedin.com/in/ted','San Dimas','California','United States'),(21,46,'999-444-5888','dfadfk@dfadsf.com','sdjfkasdf@dfjasdf.edu','sdfasdfadf','linkedin.com/in/dkfjlasdjfklasdf','Sydney','Australian Capital Territory','Australia'),(22,47,'111-222-3333','covid@pandemic.com','covid@osu.edu','covid','linkedin.com/in/covid','Wuhan','Jiangxi','China'),(23,48,'111-474-5556','csweb384@mcintosh.com','crusso@osu.edu','crusso','https://linkedin.com/in/charlotte','Philadelphia','Pennsylvania','United States'),(24,49,'348-383-2383','johann@work.edu','johann@school.edu','johann','linkedin.com/in/johann','Berlin','Berlin','Germany'),(25,50,'546-987-5155','cbronte@work.com','cbronte@school.edu','cbronte','linkedin.com/in/cbronte','London','London, City of','United Kingdom'),(26,51,'159-448-5874','charles@work.com','charles@school.edu','cmchutchence','linkedin.com/in/mchutchence','Philadelphia','Pennsylvania','United States'),(27,52,'448-488-4444','harrison@work.com','harrison@school.edu','harrisong','linkedin.com/in/harrisong','Los Angeles','California','United States'),(28,53,'444-888-7874','charlotte@work.com','charlotte@school.edu','crussooooo','linkedin.com/in/crusooo','Philadephia','Pennsylvania','United States'),(29,54,'466-777-4545','farge@work.com','farge@school.edu','farge','linkedin.com/in/margem','State College','Pennsylvania','United States'),(30,55,'g','h','i','j','k','f','Al Janūbīyah','Bahrain'),(31,56,'gg','hh','ii','jj','kk','ff','Füzuli','Azerbaijan'),(32,57,'fasdfasdf','asdfasdf','asdfasdfasdf','asdfasdfsa','dfasdfsadf','sdfadfasd','Kemps Bay','Bahamas'),(33,58,'666','','','dfadf','sddddd','dsfdddd','Kemps Bay','Bahamas'),(34,59,'6698876969','','','felix','linkedin.com/felix','Rangpur','Rangpur','Bangladesh'),(36,61,'66697881215','sdfaddd$@dfa.com','dfkajdkfjdaf@hello.edu','dancingqueen','linkedin.com/in/abba','Fuzuli','Füzuli','Azerbaijan'),(37,62,'481-458-5411','ironmike@lowes.com','tysonm@rutgers.edu','ironmike','linkedin.com/in/miketyson','New York','New York','United States'),(38,63,'215-545-4448','pete@mcdonalds.com','pete@psu.edu','contip','https://www.linkedin.com/in/petertconti/','Philadelphia','Pennsylvania','United States'),(39,64,'323-867-5309','alex@jeopardyshow.com','alextrebek20202@oregonstate.edu','trebek','https://www.linkedin.com/in/trebek113508x','Los Angeles','California','United States'),(40,67,'2347293749','me@work.com','me@school.edu','yougotthat','https://linkedin.com/in/hellodance','Long Island','Long Island','Bahamas'),(41,68,'238492972929','gedup@work.com','toomuch@school.edu','thecomedown','https://www.linkedin.com/in/yourfriend','Orange Walk','Orange Walk District','Belize'),(42,70,'555-333-2222','daCen@job.com','cenzineo@los.colm','ceccioj','linkedin.com/in/vincenz3321','Napoli','Toscano','Italia'),(44,72,'34234234234234','asdfasdf','dfsdfdffdf','sdfasdfasdf','asdfasdfsadf','sdfasdfasdf','Eckerö','Åland Islands'),(45,73,'asdfasdf','asdfasdf','aasdfasdf','asdfasd','fasdfasdf','sasdfasdf','Durrës','Albania'),(47,75,'6489521154','stjames@work.com','stjames@school.edu','stjames','https://www.linkedin.com/in/stjames','El Oued','El Oued','Algeria'),(48,76,'6489521227','stfames@work.com','stfames@school.edu','stfames','https://www.linkedin.com/in/ftames','China','Of Mind','Asia'),(49,84,'6489546238','jshmoe@work.com','jshmoe@school.edu','jshmoe','https://www.linkedin.com/in/jshmoe','Miami','Florida','United States'),(50,85,'38492729292','pauld@work.com','pauld@school.edu','pauld','https://www.linkedin.com/in/pauld','Jiwaka','Jiwaka','Papua New Guinea'),(52,87,'215-215-1215','mikecheck@micwork.com','mikecheck@micschool.com','mikecheck','https://www.linkedin.com/mikedcheck','Caravan','Yerevan','Armenia'),(54,89,'5465451','sadfasdf','asdfasdf','asdfasdf','asdf','jkkdsdfasdf','Au Vent','Saint Barthélemy'),(59,94,'650-331-3311','guido@microsoft.com','guido@oregonstate.edu','gvanrossum','https://www.linkedin.com/in/guido-van-rossum-4a0756/','Palo Alto','California','United States'),(60,95,'228-478-9874','jaime@lakers.com','bronbron@nocollege.edu','bronbron','','Hermosillo','Jalisco','Mexico'),(62,97,'828-882-8882','','','beckmah','https://www.beckham.com','London','London, City of','United Kingdom'),(63,98,'991-117-9917','timmy@tahini.com','timmy@osu.edu','tahinitim','https://www.linkedin.com/shawarmaszz','Tehran','Qazvīn','Iran, Islamic Republic of'),(64,99,'323-213-4890','jimmy@world.com','jimmyeats@oregonstate.edu','jimmyeatworld','https://www.linkedin.com/jimmysszz','Los Angeles','California','United States'),(65,100,'+ 412-224-289-8997','saitama@heros.com','','saitama','https://www.https://www.viz.com/one-punch-man','Tokyo','Saitama','Japan'),(66,101,'3284792374','dkjfaksdjf','slkdfalsjdf','dfjalsdf','sldkfjasdf','sdfsdf','Kavango East','Namibia'),(67,102,'asdf','sadfsdf','sdf','sdfasd','fsdf','sdfasdf','Aïn Témouchent','Algeria'),(69,104,'34234234234','dfasdfasdfasdf','asdfasdfasdf','sdfasdddd','sdfsdfsdfsdf','sdfasdfasdf','Eckerö','Åland Islands'),(70,105,'234234234','dfasdfasdf','asdfasdfasdf','sdfasdfasdf','sdfsdf','sadfasdf','Finström','Åland Islands'),(72,107,'23843822772','bob@microsoft.com','bob@upenn.edu','bob','https://www.linkedin.com/in/bob','Salzburg','Salzburg','Austria'),(73,108,'348283646','churlotte@neverworked.com','churlotte@noschool.edu','churlotte','https://www.linkedin.com/in/churlotte','Philly','Pennsylvania','United States'),(74,109,'3848284636','johannnnnn@work.com','johannnn@school.edu','johnann','https://www.linkedin.com/in/johannnnn','Copenhagen','Midtjylland','Denmark'),(75,110,'34723482934','maryyyy@work.com','maryyy@school.edu','mary','https://www.linkedin.com/in/mary','Daneland','Sermersooq','Denmark'),(76,111,'3842383474','guy@work.com','guy@school.edu','guy','https://www.linkedin.com/in/guy','South Wales','New South Wales','Australia'),(77,112,'384838326','sven@work.com','sven@school.edu','sven','https://www.linkedin.com/in/sven','Copenhagen','Syddanmark','Denmark'),(79,114,'3847473737','silvard@work.com','silvard@school.edu','silvard','https://www.linkedin.com/in/silvard','Conakry','Conakry','Guinea'),(80,115,'3848483737','danzig@work.com','danzig@school.edu','danzig','https://www.linkedin.com/in/danzig','Atacama','Atacama','Chile'),(81,116,'34234234','dfasdfasdfasdf','asdfasdfasdfasd','fsdfsdfsdf','dfdfdfdf','sdfasdfd','Batna','Algeria'),(82,117,'661-886-8668','linus@linuxfoundation.com','linus@mit.edu','torvalds','https://www.linkedin.com/in/linustorvalds','Portland','Oregon','United States');
/*!40000 ALTER TABLE `contact_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `courses` (
  `course_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `course_number` varchar(10) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(100) NOT NULL,
  PRIMARY KEY (`course_id`),
  UNIQUE KEY `course_UN` (`course_number`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8 COMMENT='Courses';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES (1,'CS340','Intro to Databases','Basic SQL and Database Schema Design'),(2,'CS361','Software Engineering I','Team Project Development with Agile/Scrum methodology.'),(3,'CS290','Web Development','Javascript, HTML, and CSS development.'),(4,'CS372','Intro to Networking','Fundamentals of networking concepts.'),(5,'CS325','Analysis of Algorithms','Fundamentals of correct and efficient problem solving'),(6,'CS344','Operating Systems I','Basic Operating System concepts and utilities'),(7,'CS352','Introduction to Usability Engineering','Fundamentals of usability engineering'),(8,'CS362','Software Engineering II','Intermediate software engineering concepts'),(9,'CS370','Introduction to Security','Cybersecurity fundamentals and concepts'),(10,'CS373','Defense Against the Dark Arts','Intermediate security concepts'),(11,'CS381','Programming Language Fundamentals','Advanced programming language skills'),(12,'CS391','Social and Ethical Issues in Computer Science','The study of tech\'s social and ethical impacts'),(13,'CS427','Cryptography','Study of encryption and security'),(14,'CS444','Operating Systems II','Intermediate Operating System concepts and utilities'),(15,'CS450','Introduction to Computer Graphics','Introduction to computer graphics tools and concepts'),(16,'CS464','Open Source Software','Introduction to open source concepts'),(17,'CS475','Introduction to Parallel Programming','Introduction to parallel programming'),(18,'CS477','Introduction to Digital Forensics','Basic digital forensics concepts'),(19,'CS478','Network Security','Security concepts as it relates to networks'),(20,'CS492','Mobile Software Developments','Concepts of developing software on mobile devices'),(21,'CS493','Cloud Application Development','Application development on the cloud');
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `expert_companies`
--

DROP TABLE IF EXISTS `expert_companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `expert_companies` (
  `expert_company_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `expert_id` int(10) unsigned NOT NULL,
  `company_id` int(10) unsigned NOT NULL,
  `current` tinyint(1) NOT NULL,
  `position` varchar(50) NOT NULL,
  `employed_years` decimal(10,2) NOT NULL,
  PRIMARY KEY (`expert_company_id`),
  KEY `expert_course_FK_1` (`expert_id`),
  KEY `expert_course_id_FK_2` (`company_id`),
  CONSTRAINT `expert_company_FK_1` FOREIGN KEY (`expert_id`) REFERENCES `experts` (`expert_id`) ON DELETE CASCADE,
  CONSTRAINT `expert_company_id_FK_2` FOREIGN KEY (`company_id`) REFERENCES `companies` (`company_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8 COMMENT='Expert Companies';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expert_companies`
--

LOCK TABLES `expert_companies` WRITE;
/*!40000 ALTER TABLE `expert_companies` DISABLE KEYS */;
INSERT INTO `expert_companies` VALUES (1,1,1,1,'Software Engineer I',1.75),(2,2,2,0,'Intern',0.50),(3,3,3,1,'Project Manager',2.25),(4,4,4,0,'Assoc Project Manager',1.50),(5,1,2,1,'Test Position',14.00),(6,1,2,1,'Test Position',14.00),(7,1,2,1,'Test Position',14.00),(8,1,3,1,'Intern',5.00),(9,1,4,0,'Software Engineer',5.00),(10,1,4,0,'Intern',5.00),(11,50,14,0,'gdfg',2.00),(12,50,1,0,'dfsdf',6.00),(14,61,14,0,'Software Engineer',1.00),(15,50,18,0,'Official Privacy Invader',15.00),(16,50,9,0,'Consultant',5.00),(17,50,8,0,'Pilot',4.00),(18,50,3,0,'Software Engineer',3.00),(19,50,28,0,'Software Engineer',3.00),(20,50,24,0,'Electrical Engineer',69.00),(21,50,29,0,'Electrical Engineer',6.00),(22,50,30,1,'Drug Tester',5.00),(23,62,9,0,'Consultant',2.00),(24,62,24,0,'Electrical Engineer',4.00),(25,62,31,1,'Software Engineer I',9.00),(26,63,32,1,'Software Intern',1.00),(27,67,16,1,'Software Engineer I',3.00),(28,67,33,0,'Electrical Engineer II',3.00),(29,68,34,1,'Pie Taster',3.00),(30,68,1,0,'Software Engineer I',2.75),(31,68,2,0,'Software Engineer II',1.00),(32,68,4,0,'UI expert',3.00),(33,84,5,1,'Space Explorer',5.00),(37,63,33,0,'Water Ice Engineer II',5.00),(39,52,22,0,'Tester',2.00),(40,52,38,0,'Salad Tester',3.00),(44,63,40,0,'Taco Engineer',3.00),(47,48,40,1,'Shift Leader ',4.00),(48,94,16,1,'Distinguished Engineer',1.00),(49,94,7,0,'Genius',1.00),(51,98,24,1,'Line Cook',1.00),(52,99,42,1,'Guitarist',20.00),(53,100,6,1,'Janitor',1.00),(54,101,43,0,'',0.00),(55,104,43,0,'',0.00),(56,104,43,0,'',0.00),(57,104,43,0,'',0.00),(58,104,44,0,'Water Engineer',4.00),(59,107,43,0,'',0.00),(60,107,9,0,'Consulting Engineer',3.00),(61,109,43,0,'',0.00),(62,109,43,0,'',0.00),(63,110,43,0,'',0.00),(64,110,43,0,'',0.00),(65,110,43,0,'',0.00),(66,110,43,0,'',0.00),(67,110,43,0,'',0.00),(68,110,43,0,'',0.00),(69,110,43,0,'',0.00),(70,110,43,0,'',0.00),(71,110,29,0,'dfsdf',3.00),(72,112,8,1,'Space Explorer',3.00),(73,112,12,0,'Space Pirate',3.00),(74,117,45,1,'CEO',25.00),(75,117,1,0,'Janitor',0.50);
/*!40000 ALTER TABLE `expert_companies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `expert_courses`
--

DROP TABLE IF EXISTS `expert_courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `expert_courses` (
  `expert_course_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `expert_id` int(10) unsigned NOT NULL,
  `course_id` int(10) unsigned NOT NULL,
  `term` varchar(20) NOT NULL,
  `grade` varchar(10) NOT NULL,
  PRIMARY KEY (`expert_course_id`),
  KEY `expert_course_FK_1` (`expert_id`),
  KEY `expert_course_id_FK_2` (`course_id`),
  CONSTRAINT `expert_course_FK_1` FOREIGN KEY (`expert_id`) REFERENCES `experts` (`expert_id`) ON DELETE CASCADE,
  CONSTRAINT `expert_course_id_FK_2` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8 COMMENT='Expert Courses';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expert_courses`
--

LOCK TABLES `expert_courses` WRITE;
/*!40000 ALTER TABLE `expert_courses` DISABLE KEYS */;
INSERT INTO `expert_courses` VALUES (1,1,1,'Winter 2019','B+'),(2,2,2,'Spring 2019','A-'),(3,3,3,'Winter 2020','A'),(4,4,4,'Spring 2020','B-'),(6,1,2,'Winter 2020','A'),(7,1,2,'Winter 2020','A'),(8,1,2,'Winter 2020','A'),(9,1,2,'Winter 2020','A'),(10,59,5,'Spring 2004','D'),(11,59,11,'Spring 2014','F'),(12,59,7,'Spring 2004','F'),(13,59,6,'Spring 2015','F'),(19,62,4,'Winter 2018','B'),(20,62,17,'Winter 2019','A'),(21,63,1,'Fall 2020','F'),(22,63,5,'Summer 2020','F'),(23,63,6,'Fall 2020','F'),(24,63,8,'Summer 2020','F'),(25,63,2,'Fall 2020','F'),(26,63,3,'Spring 2020','F'),(27,67,4,'Winter 2005','C'),(28,67,9,'Summer 2017','C'),(29,68,3,'Winter 2002','B'),(31,36,1,'Fall 2020','A'),(32,68,2,'Fall 2020','C'),(33,68,2,'Fall 2020','C'),(34,36,2,'Fall 2018','B+'),(35,2,5,'Summer 2018','A'),(36,59,2,'Summer 2018','B'),(37,59,2,'Summer 2018','B'),(38,63,7,'Summer 2018','B'),(39,63,4,'Winter 2005','B'),(40,84,3,'Fall 2019','B'),(51,94,2,'Fall 2010','F'),(52,94,1,'Fall 2011','A'),(53,63,19,'Winter 2013','A'),(56,98,7,'Spring 2017','A'),(57,99,21,'Winter 2012','C'),(58,100,18,'Spring 2019','F'),(62,48,2,'Winter 2013','C'),(63,94,1,'Fall 2013','B'),(64,100,1,'Fall 2013','B'),(65,117,6,'Summer 2010','F'),(66,117,5,'Winter 2010','F'),(67,117,10,'Spring 2015','F');
/*!40000 ALTER TABLE `expert_courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `expert_skills`
--

DROP TABLE IF EXISTS `expert_skills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `expert_skills` (
  `expert_skill_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `expert_id` int(10) unsigned NOT NULL,
  `skill_id` int(10) unsigned NOT NULL,
  `experience_years` decimal(10,2) unsigned NOT NULL,
  PRIMARY KEY (`expert_skill_id`),
  KEY `expert_skill_FK_1` (`expert_id`),
  KEY `expert_skill_id_FK_2` (`skill_id`),
  CONSTRAINT `expert_skill_FK_1` FOREIGN KEY (`expert_id`) REFERENCES `experts` (`expert_id`) ON DELETE CASCADE,
  CONSTRAINT `expert_skill_id_FK_2` FOREIGN KEY (`skill_id`) REFERENCES `skills` (`skill_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8 COMMENT='Expert Skills';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expert_skills`
--

LOCK TABLES `expert_skills` WRITE;
/*!40000 ALTER TABLE `expert_skills` DISABLE KEYS */;
INSERT INTO `expert_skills` VALUES (1,3,4,1.50),(2,3,2,5.00),(3,4,1,1.00),(4,4,7,10.50),(5,1,8,3.80),(6,1,4,3.80),(7,1,2,7.00),(8,1,6,25.00),(9,1,1,39.00),(10,50,10,1.00),(11,50,9,2.00),(12,50,3,1.00),(13,50,1,0.00),(14,50,7,4.00),(15,50,12,6.00),(16,48,7,1.00),(17,48,3,3.00),(18,48,1,1.00),(19,48,12,1.00),(20,48,11,4.00),(21,48,13,4.00),(22,54,5,1.00),(23,54,3,2.00),(24,54,1,3.00),(25,54,12,3.00),(26,55,1,1.00),(27,59,1,2.00),(28,59,9,3.00),(31,62,1,1.00),(32,62,15,3.00),(33,63,1,1.00),(34,63,3,2.00),(35,63,2,1.00),(36,63,14,1.00),(37,63,10,1.00),(38,63,12,1.00),(39,63,9,1.00),(41,67,1,1.00),(42,67,13,2.00),(43,68,21,3.00),(44,68,22,2.00),(51,63,7,3.00),(53,52,3,1.00),(55,84,2,2.00),(56,84,27,1.00),(59,87,2,6.00),(60,54,20,2.00),(70,94,3,6.00),(71,94,20,1.00),(72,95,24,4.00),(75,98,5,5.00),(76,99,21,3.00),(77,100,1,2.00),(78,101,30,0.00),(79,117,31,6.00),(80,117,27,6.00),(81,117,12,2.00);
/*!40000 ALTER TABLE `expert_skills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `experts`
--

DROP TABLE IF EXISTS `experts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `experts` (
  `expert_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `description` varchar(500) DEFAULT NULL,
  `photo_url` varchar(2048) DEFAULT NULL,
  `active` tinyint(1) NOT NULL,
  `deleted` tinyint(1) NOT NULL,
  PRIMARY KEY (`expert_id`),
  UNIQUE KEY `experts_UN` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=118 DEFAULT CHARSET=utf8 COMMENT='Experts';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `experts`
--

LOCK TABLES `experts` WRITE;
/*!40000 ALTER TABLE `experts` DISABLE KEYS */;
INSERT INTO `experts` VALUES (1,'Bling','Swayze','bling@swayze.edu','The Bouncer',NULL,1,0),(2,'Flogan','Mayne','flogan@gucci.com','The Big Show',NULL,1,0),(3,'Dashi','Exposee','dashi@flow.com','The Heir to Sakai Clan',NULL,1,0),(4,'Sharquarius','Thompson','sharq72@hotmail.com','The Wild One','https://kickassphoto.jpg',1,0),(24,'Charlotte','Russo','csweb95@gmail.com','FPGA Tour Winner','imgur.com/test.jpg',1,0),(29,'Charlotte','Russo','csweb96@gmail.com','FPGA Tour Winner','imgur.com/test.jpg',1,0),(36,'Charlotte','Russo','csweb98@gmail.com','FPGA Tour Winner','imgur.com/test.jpg',1,0),(37,'Charlotte','Russo','csweb99@gmail.com','FPGA Tour Winner','imgur.com/test.jpg',1,0),(38,'Charlotte','Russo','csweb101@gmail.com','FPGA Tour Winner','imgur.com/test.jpg',1,0),(39,'Charlotte','Russo','csweb103@gmail.com','FPGA Tour Winner','imgur.com/test.jpg',1,0),(40,'Cenz','Zos','daCEnzzz@gmail.com','Elite Level Feline','imgur.com/cat.jpeg',1,0),(42,'Jane','Austen','ja@austen.net','The Clear Horizon','https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTE1ODA0OTcxNTQ2ODcxMzA5/jane-austen-9192819-1-402.jpg',1,0),(43,'Charlotte','Russo','charlotterusso666@gmail.com','ur gurl','',1,0),(44,'Charlotte','R','therealcharlotte@gmail.com','the cigarette smoker','https://imgur.com/lol.jpg',1,0),(45,'Theodore','Logan','ted@ted.com','San Dimas High School Football Rules','',1,0),(46,'Hello','U','ddskfadf@yo.com','I really like pizza','',1,0),(47,'Corona','Virus','covid@covid.org','The Flu Master','https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Novel_Coronavirus_SARS-CoV-2.jpg/250px-Novel_Coronavirus_SARS-CoV-2.jpg',1,0),(48,'Charlotte','Russo','charlotte.russo666@gmail.com','The Alluring Painter','https://www.biography.com/.image/t_share/MTE1ODA0OTcxNTQ2ODcxMzA5/jane-austen-9192819-1-402.jpg',1,0),(49,'Johann','Sebastian','johann@lol.com','The Composer','https://www.biography.com/.image/t_share/MTIwNjA4NjMzNzMxNjQ2OTg4/johann-sebastian-bach-9194289-1-402.jpg',1,0),(50,'Charlotte','Bronte','cbronte@books.com','The Jane Eyre','https://images.theconversation.com/files/119371/original/image-20160420-25631-2j7xhu.png',1,0),(51,'Charles','McHutchence','charles@gmail.com','All Around Great Guy','https://smartland.com/blog/wp-content/uploads/2019/12/Cat-1.jpg',1,0),(52,'Harrison','Greeley III','harrison@gmail.com','Great Family','https://smartland.com/blog/wp-content/uploads/2019/12/Cat-1.jpg',1,0),(53,'Charlotte','Russo','crusso@gmail.com','The Fashionable Cigarette Smoker','https://smartland.com/blog/wp-content/uploads/2019/12/Cat-1.jpg',1,0),(54,'Farge','Federer','farge@gmail.com','The Eternal Spinster','https://smartland.com/blog/wp-content/uploads/2019/12/Cat-1.jpg',1,0),(55,'a','b','c','d','e',1,0),(56,'aa','bb','cc','dd','ee',1,0),(57,'asdfadfadf','dfasdfasdfd','dddfsfsaf','asdfasdf','asdfasdf',1,0),(58,'aaahh','realmonsters','monsters@monsters.com','dflkasdf','dfaksldfjd',1,0),(59,'Bar','Athym','felix@felix.com','Most Precious Love','',1,0),(61,'abba','abba','dfjadf@dddd.com','knowing me, knowing you','',1,0),(62,'Mike','Tyson','ironmike@gmail.com','Kid Dynamite','https://epmgaa.media.clients.ellingtoncms.com/img/photos/2020/07/30/Mike_Tyson_t750x550.jpg',1,0),(63,'Pete','Conti','pete@email.com','The Greatest Dancer','https://images-na.ssl-images-amazon.com/images/I/51-TaYvt0dL._SL1200_.jpg',1,0),(64,'Alex','Trebek','alex@jeopardy.com','Greatest TV Show Host Ever','https://www.bostonherald.com/wp-content/uploads/2020/07/AP20202605370866.jpg',1,0),(67,'Yougot','That','house_dance_forever@gmail.com','The Loose Leg','https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Stevan_Kragujevic%2C_Slobodan_Milosevic%2C_portret.jpg/220px-Stevan_Kragujevic%2C_Slobodan_Milosevic%2C_portret.jpg',1,0),(68,'GH','B','sotired@gmail.com','Should we call somebody?','https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Stevan_Kragujevic%2C_Slobodan_Milosevic%2C_portret.jpg/220px-Stevan_Kragujevic%2C_Slobodan_Milosevic%2C_portret.jpg',1,0),(70,'Cenz','Zos','daCEnzzzino@gmail.com','Elite Level Feline','imgur.com/cat.jpeg',1,0),(72,'dfasdfasdf','asdfasdfasdf','dsfasdfasdf','asdfasdfasdf','sdfasdfasdf',1,0),(73,'ddddf','ffff','fasdfasdf','asdfasdf','asdfasdf',1,0),(75,'James','St. James','stjames@email.com','','',1,0),(76,'Fames','St. Fames Newb','stfames@email.com','','',1,0),(84,'Joe','Shmoe','jshmoe@email.com','My Unfortunate Real Name','https://comotion.uw.edu/wp-content/uploads/2019/05/generic-profile.png',1,0),(85,'Paul','Direnzo','pauld@paul.com','','',1,0),(87,'Mike','Check','mikecheck@miccheck.com','The Bopper','',1,0),(89,'asdf','fkdkd','skdfsd@df.com','sdkfaf','lsadjflkasdf',1,0),(94,'Guido','van Rossum','guido@mypython.com','The Python Master','https://gvanrossum.github.io/images/guido-headshot-2019.jpg',1,0),(95,'Lebron','James','jaime@bron.com','The Hooper','https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/1966.png',1,0),(97,'David','Beckham','david@beckham.com','The Most Overrated Football Player','',1,0),(98,'Timmy','Tahini','timmy@tahini.com','The Shawarma Shaman','https://i.pinimg.com/originals/18/86/1a/18861a109def1b5c27aead29cfc8d552.jpg',1,0),(99,'Jimmy ','Eatworld','jimmy@eatworld.com','The Middle but also We\'re Cybergoth Now','https://www.jimmyeatworld.com/wp-content/uploads/2019/10/JimmyEatWorld_555_VideoClips_Standard_3.jpg',1,0),(100,'Saitama','Hagemanto','saitama@hikyaku.jp','One Punch Man','https://static.wikia.nocookie.net/onepunchman/images/8/82/Saitama_Manga.png',1,0),(101,'dfkasdf','skdjfadf','slkdjfajfd','sdklfjasdf','sjdfjasdf',1,0),(102,'dfasdf','asdfas','dfasdf','sdfa','sdf',1,0),(104,'asdfffff','dfdfdfdfd','sdfasdfasdf','sadfasdfasdf','sadfasdfasdf',1,0),(105,'dfasdfasdfasdf','asdfasdfasdf','asdfasd','fasdfasdfasdf','sdfasdfasdf',1,0),(107,'bob','smith','bob@email.com','the real bob','',1,0),(108,'Charlotte','IsBad','churlotte@gmail.com','I used to be so healthy...','',1,0),(109,'Johann','Sebastian','johannnnnn@email.com','johann','',1,0),(110,'Mary','Weller','marymay@mary.com','mary','',1,0),(111,'Guybrush','Threepwood','guy@email.com','You fight like a dairy farmer','',1,0),(112,'Sven','Palmers','sven@sven.com','Sven','',1,0),(114,'Janus','Pederson','silvard@camelot.com','Silvard','',1,0),(115,'Glen','Danzig','danzig@email.com','Don\'t go in the bathroom with me','',1,0),(116,'sdfasdf','asdfsadf','sdfasdf','asdfasdf','asdfasdf',1,0),(117,'Linus','Torvalds','linus@torvalds.com','The Linux Master','https://img.favpng.com/16/14/3/linus-torvalds-linux-kernel-gnu-linux-history-of-linux-computer-software-png-favpng-h5maH5m8HLGL3me5g5QdRfkyF.jpg',1,0);
/*!40000 ALTER TABLE `experts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `skills`
--

DROP TABLE IF EXISTS `skills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `skills` (
  `skill_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(100) NOT NULL,
  PRIMARY KEY (`skill_id`),
  UNIQUE KEY `skill_UN` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8 COMMENT='Products';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skills`
--

LOCK TABLES `skills` WRITE;
/*!40000 ALTER TABLE `skills` DISABLE KEYS */;
INSERT INTO `skills` VALUES (1,'React','Frontend JS Framework'),(2,'Node.js','General Purpose JS'),(3,'Python','Dynamically Typed Interpreted Language'),(4,'Java','Compiled OOP JVM Language'),(5,'Scala','Functional JVM Language'),(6,'MASM','MS Assembly Language'),(7,'C++','Compiled OOP Language'),(8,'Trolfing','Powerful ability to drink alcohol from a long ramp-like implement.'),(9,'JavaScript','Interpreted OOP Language'),(10,'TypeScript','Statically-Typed JavaScript Superset'),(11,'PHP','Server-Side Scripting Language'),(12,'MATLAB','High-Level Computational Programming Language'),(13,'Angular','Frontend JS Framework'),(14,'C','Compiled Low-Level Programming Language'),(15,'Ruby','Interpreted High-Level Programming Language'),(16,'Rust','Multi-paradigm programming language'),(17,'OpenGL','Cross-language/Cross-platform API for 2D/3D graphics'),(18,'SQL','Database Programming / Manipulation Language'),(19,'JQuery','JavaScript DOM Manipulation Library'),(20,'Docker','Virtualization Software'),(21,'HTML','Web-based Markup Language'),(22,'CSS','Web-based Style Sheet Language'),(23,'MongoDB','Open-Source NoSQL Database'),(24,'Express.js','Backend Web Framework'),(25,'Interview Preparation','Helping you preparing for SE technical interviews'),(26,'Microsoft SQL Server','Proprietary Relational Database Management System'),(27,'Git','Version Control Software'),(30,'',''),(31,'Linux','Operating System');
/*!40000 ALTER TABLE `skills` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-12-03 13:00:14
