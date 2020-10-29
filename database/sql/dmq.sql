-- TODO: Queries for filtering Experts on their various fields

-- Select ALL Active Experts
--
SELECT *
FROM   experts e
WHERE  e.deleted = false 
       AND e.active = true
ORDER BY e.expert_id ASC
LIMIT 100; 


-- Select ContactDetails by ExpertId (Get an expert's Contact Details)
--
-- To get all details in one query (from users, experts, and contact details tables), 
-- You'll need to join on those tables. 

SELECT * 
FROM   contact_details cd 
WHERE  cd.expert_id = :expertId; 


-- Select Skills by ExpertId (Get an expert's Skills)
--
SELECT es.expert_skill_id  AS expert_skill_id, 
       e.expert_id         AS expert_id, 
       s.skill_id          AS skill_id, 
       s.NAME              AS skill_name, 
       s.description       AS skill_description, 
       es.experience_years AS experience_years 
FROM   skills s 
       JOIN expert_skills es 
         ON s.skill_id = es.skill_id 
       JOIN experts e 
         ON es.expert_id = e.expert_id 
WHERE  e.expert_id = :expertId; 


-- Select Courses by ExpertId (Get an expert's Courses)
--
SELECT ec.expert_course_id AS expert_course_id, 
       e.expert_id         AS expert_id, 
       c.course_id         AS course_id, 
       c.course_number     AS course_number, 
       c.NAME              AS course_name, 
       c.description       AS course_description, 
       ec.term             AS term, 
       ec.grade            AS grade 
FROM   courses c 
       JOIN expert_courses ec 
         ON c.course_id = ec.course_id 
       JOIN experts e 
         ON ec.expert_id = e.expert_id 
WHERE  e.expert_id = :expertId; 


-- Select Companies by ExpertId (Get an expert's Companies)
--
SELECT ec.expert_company_id AS expert_company_id, 
       e.expert_id          AS expert_id, 
       c.company_id         AS company_id, 
       c.NAME               AS company_name, 
       c.industry           AS company_industry, 
       c.description        AS company_description, 
       ec.CURRENT           AS company_current, 
       ec.position          AS company_position, 
       ec.employed_years    AS employed_years 
FROM   companies c 
       JOIN expert_companies ec 
         ON c.company_id = ec.company_id 
       JOIN experts e 
         ON ec.expert_id = e.expert_id 
WHERE  e.expert_id = :expertId; 