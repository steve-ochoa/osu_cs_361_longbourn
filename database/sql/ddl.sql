DROP TABLE IF EXISTS `experts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `experts` (
  `expert_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `description` varchar(500) DEFAULT NULL,
  `photo_url` varchar(2048) DEFAULT NULL,
  `active` boolean NOT NULL,
  `deleted` boolean NOT NULL,
  PRIMARY KEY (`expert_id`),
  UNIQUE KEY `experts_UN` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='Experts';
/*!40101 SET character_set_client = @saved_cs_client */;


LOCK TABLES `experts` WRITE;
/*!40000 ALTER TABLE `experts` DISABLE KEYS */;
INSERT INTO `experts` VALUES (0,'Bling','Swayze','bling@swayze.edu','The Bouncer', null, true, false), 
                             (0,'Flogan','Mayne','flogan@gucci.com','The Big Show', null, true, false),
                             (0,'Dashi','Exposee','dashi@flow.com', 'The Heir to Sakai Clan', null, true, false),
                             (0, 'Sharquarius','Liggins','sharq69@hotmail.com', 'The Excellence of Execution', null, true, false);
/*!40000 ALTER TABLE `experts` ENABLE KEYS */;
UNLOCK TABLES;



DROP TABLE IF EXISTS `contact_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact_details` (
  `contact_details_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `expert_id` int(10) unsigned NOT NULL,
  `phone` varchar(64) NOT NULL,
  `work_email` varchar(255),
  `school_email` varchar(255),
  `github_user` varchar(40),
  `linkedin_url` varchar(2048),
  `city` varchar(100) NOT NULL,
  `state` varchar(100) NOT NULL,
  `country` varchar(100) NOT NULL,
  PRIMARY KEY (`contact_details_id`),
  UNIQUE KEY `contact_details_UN` (`phone`),
  KEY `contact_details_FK` (`expert_id`),
  CONSTRAINT `contact_details_FK` FOREIGN KEY (`expert_id`) REFERENCES `experts` (`expert_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='Contact Details';
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `contact_details` WRITE;
/*!40000 ALTER TABLE `contact_details` DISABLE KEYS */;
INSERT INTO `contact_details` VALUES (0,3,'+110-234-345-9887','workEmail3@gmail.com','schoolEmail3@gmail.com','GitHubUser3','https://linkedin.com/aliaskjalskdf/9087234s3/myprofile.php','Chicago','IL','United States'),
                                     (0,4,'(650)867-5309','work_email_4@hotmail.com','my_uni_4@uni.edu','MineGithub4','https://linkedin.com/alkjasdlfkjx323452/as33zcmexxxlkj333/profile.html','San Francisco','CA','United States');
/*!40000 ALTER TABLE `contact_details` ENABLE KEYS */;
UNLOCK TABLES;


DROP TABLE IF EXISTS `skills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `skills` (
  `skill_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(100) NOT NULL,
  PRIMARY KEY (`skill_id`),
  UNIQUE KEY `skill_UN` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='Products';
/*!40101 SET character_set_client = @saved_cs_client */;


LOCK TABLES `skills` WRITE;
/*!40000 ALTER TABLE `skills` DISABLE KEYS */;
INSERT INTO `skills` VALUES (0,'React','Frontend JS Framework'),
                              (0,'Node.js','General Purpose JS'),
                              (0,'Python','Dynamically Typed Interpreted Language'),
                              (0,'Java','Compiled OOP JVM Language'),
                              (0,'Scala','Functional JVM Language'),
                              (0,'MASM','MS Assembly Language'),
                              (0,'C++','Compiled OOP Language');
/*!40000 ALTER TABLE `skills` ENABLE KEYS */;
UNLOCK TABLES;


DROP TABLE IF EXISTS `expert_skills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='Expert Skills';
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `expert_skills` WRITE;
/*!40000 ALTER TABLE `expert_skills` DISABLE KEYS */;
INSERT INTO `expert_skills` VALUES (0,3,4,1.5),(0,3,2,5),(0,4,1,1),(0,4,7,10.5);
/*!40000 ALTER TABLE `expert_skills` ENABLE KEYS */;
UNLOCK TABLES;


DROP TABLE IF EXISTS `courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courses` (
  `course_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `course_number` varchar(10) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(100) NOT NULL,
  PRIMARY KEY (`course_id`),
  UNIQUE KEY `course_UN` (`course_number`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='Courses';
/*!40101 SET character_set_client = @saved_cs_client */;


LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES (0,'CS340','Intro to Databases','Basic SQL and DB Schema design.'),
                              (0,'CS361','Software Engineering I', 'Team Project Development with Agile/Scrum methodology.'),
                              (0,'CS290','Web Development', 'Javascript, HTML, and CSS development.'),
                              (0,'CS372','Intro to Networking','Fundamentals of networking concepts.');
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;


DROP TABLE IF EXISTS `expert_courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='Expert Courses';
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `expert_courses` WRITE;
/*!40000 ALTER TABLE `expert_courses` DISABLE KEYS */;
INSERT INTO `expert_courses` VALUES (0,3,1,'Winter 2019','B+'),(0,3,2,'Spring 2019','A-'),(0,4,3,'Winter 2020','A'),(0,4,4,'Spring 2020','B-');
/*!40000 ALTER TABLE `expert_courses` ENABLE KEYS */;
UNLOCK TABLES;




DROP TABLE IF EXISTS `companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `companies` (
  `company_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(100) NOT NULL,
  `industry` varchar(50) NOT NULL,
  PRIMARY KEY (`company_id`),
  UNIQUE KEY `course_UN` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='Companies';
/*!40101 SET character_set_client = @saved_cs_client */;


LOCK TABLES `companies` WRITE;
/*!40000 ALTER TABLE `companies` DISABLE KEYS */;
INSERT INTO `companies` VALUES (0,'Boeing','Commercial plane manufacturer','Aerospace'),
                              (0,'Palantir','Top Secret Software Ops', 'Government Contractor'),
                              (0,'Asana','Project Management Cloud Platform', 'Software'),
                              (0,'Arduino','Homebrew Development Platform','Hardware');
/*!40000 ALTER TABLE `companies` ENABLE KEYS */;
UNLOCK TABLES;

DROP TABLE IF EXISTS `expert_companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `expert_companies` (
  `expert_company_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `expert_id` int(10) unsigned NOT NULL,
  `company_id` int(10) unsigned NOT NULL,
  `current` boolean NOT NULL,
  `position` varchar(50) NOT NULL, 
  `employed_years` decimal(10,2) NOT NULL,
  PRIMARY KEY (`expert_company_id`),
  KEY `expert_course_FK_1` (`expert_id`),
  KEY `expert_course_id_FK_2` (`company_id`),
  CONSTRAINT `expert_company_FK_1` FOREIGN KEY (`expert_id`) REFERENCES `experts` (`expert_id`) ON DELETE CASCADE,
  CONSTRAINT `expert_company_id_FK_2` FOREIGN KEY (`company_id`) REFERENCES `companies` (`company_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='Expert Companies';
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `expert_companies` WRITE;
/*!40000 ALTER TABLE `expert_companies` DISABLE KEYS */;
INSERT INTO `expert_companies` VALUES (0,3,1,true,'Software Engineer I',1.75),(0,3,2,false,'Intern',0.5),(0,4,3,true,'Project Manager',2.25),(0,4,4,false,'Assoc Project Manager',1.5);
/*!40000 ALTER TABLE `expert_companies` ENABLE KEYS */;
UNLOCK TABLES;
