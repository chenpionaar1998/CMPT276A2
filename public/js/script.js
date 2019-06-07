let socket = io.connect('https://young-bayou-35821.herokuapp.com/');

function RefillForm(data) {
    document.getElementById('fname_update').value = data.fname;
    document.getElementById('lname_update').value = data.lname;
    document.getElementById('studentid_update').value = data.studentid;
    document.getElementById('dob_update').value = data.dob;
    switch (data.gender) {
        case 'M':
            document.getElementById('radio1_update').click();
            break;
        case 'F':
            document.getElementById('radio2_update').click();
            break;
        default:
            document.getElementById('radio3_update').click();
            break;
    }
    document.getElementById('weight_update').value = data.weight;
    document.getElementById('height_update').value = data.height;
    document.getElementById('shoe_size_update').value = data.shoe_size;
    document.getElementById('hair_color_update').value = data.hair_color;
    document.getElementById('gpa_update').value = data.gpa;
    document.getElementById('weight_update').style.border = 'none';
    document.getElementById('height_update').style.border = 'none';
    document.getElementById('studentid_update').style.backgroundColor = 'rgb(201,194,194)';
}

function ClearForm(){
    document.getElementById('fname_update').value = "";
    document.getElementById('lname_update').value = "";
    document.getElementById('studentid_update').value = "";
    document.getElementById('dob_update').value = document.getElementById('dob_update').value.default;
    document.getElementById('radio1_update').click();
    document.getElementById('weight_update').value = "";
    document.getElementById('height_update').value = "";
    document.getElementById('shoe_size_update').value = document.getElementById('shoe_size_update').value.default;
    document.getElementById('hair_color_update').value = document.getElementById('hair_color_update').value.default;
    document.getElementById('gpa_update').value = document.getElementById('gpa_update').default;
    document.getElementById('weight_update').style.border = 'none';
    document.getElementById('height_update').style.border = 'none';
    document.getElementById('studentid_update').style.backgroundColor = 'rgb(201,194,194)';
}

function Cancel_update() {
    ClearForm();

    document.getElementById('find_form').style.display = 'inline-block';
    document.getElementById('update_form').style.display = 'none';
}

socket.on('student_found', function (data) {
    document.getElementById('find_form').style.display = 'none';
    document.getElementById('update_form').style.display = 'inline-block';

    RefillForm(data.rows[0]);
});

socket.on('student_not_found', function(id){
    window.alert("Student with ID " + id + " does not exist in the database.");
});

socket.on('insert', function(data){
    if (data === 'success'){
        window.alert("Successfully added a student to the database!");
    }
    else if (data === 'fail'){
        window.alert("Failed to add a student to the database...");
    }
    else if (data === 'dup_key'){
        window.alert("A student with this student ID already exists.");
    }
});

socket.on('student_deletion', function(data){
    if (data === 'success'){
        window.alert('Student is successfully deleted from the database!');
    }
    else if (data === 'fail'){
        window.alert('The deletion is not successful.');
    }
});

socket.on('student_update', function(data){
    if (data === 'success'){
        window.alert('Student is successfully updated in the database!');
    }
    else if (data === 'fail'){
        window.alert('The update is not successful.');
    }
});