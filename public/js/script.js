let socket = io.connect('http://localhost:5000');

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

socket.on('student_found', function (data) {
    document.getElementById('find_form').style.display = 'none';
    document.getElementById('update_form').style.display = 'inline-block';

    RefillForm(data.rows[0]);
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