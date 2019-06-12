# READ ME for project 2

The page has 2 main functions, modifying the database and viewing the database

## Modifying the database

### Adding a student to the database
Each student entity in the database has the following attributes
1. First name 
2. Last name
3. Studetn ID (This field is the primary key for the entity in the database that uniquely identifies the student)
4. Date Of Birth 
5. Gender
6. Weight (This field affects the size the student is presented in the "view database" tab)
7. Height (This field affects the size the student is presented in the "view database" tab)
8. Shoe size
9. Hair color (This field affects the size the student is presented in the "view database" tab)
10. GPA

### Updating a student from the database
We can find a student by the the student's student ID. Once the student is found, a new display will show up where all the fields BUT the student ID can be updated and changed as desired. In this display we can then cancel or update the attributes for the student

### Deleting a student from the database
We can delete a student from the database with the following attributes (first name, last name, student ID). Even though only the student ID uniquely identifies the student, first name and last name are added for sucurity reason so that users don't accidentally remove another student as the one they thought they were deleting.

## Viewing the database

This page displays the entire database in a table in the order of when each entity is added. Following the table, the students are then drawn out in the area under as person figures. The size of the student is dependent on the weight and height of the students, where it gets scaled through the algorithm (100 * (actualWeight / avgWeight))  and (100 * (actualHeight / avgHeight)). This helps with scaling the students drawing so that the deviation of the sizes of the students are not too large which can result in giant students and tiny students. The hair color is also displayed through the name of the student under each of the drawings.
