let jpdbBaseURL = "http://api.login2explore.com:5577";
let jpdbIRL = "/api/irl";
let jpdbIML = "/api/iml";
let studentDBName = "STUDENT-DB";
let studentRelationame = "STUDENT-REL";
let token = "90932019|-31949219561956329|90962187";

function validateAndGetData() {
  let roll = $("#rollNo").val();
  if (roll == "") {
    alert("Roll number is required");
    $("#rollNo").focus();
    return "";
  }

  let fullName = $("#fullName").val();
  if (fullName == "") {
    alert("Full name is required");
    $("#fullName").focus();
    return "";
  }

  let studentClass = $("#studentClass").val();
  if (studentClass == "") {
    alert("Class is required");
    $("#studentClass").focus();
    return "";
  }

  let dob = $("#dob").val();
  if (dob == "") {
    alert("Date of birth is required");
    $("#dob").focus();
    return "";
  }

  let address = $("#address").val();
  if (address == "") {
    alert("Address is required");
    $("#address").focus();
    return "";
  }

  let enrollment = $("#enrollment").val();
  if (enrollment == "") {
    alert("Enrollment number is required");
    $("#enrollment").focus();
    return "";
  }

  let jsonStrObj = {
    rollNo: roll,
    fullName: fullName,
    studentClass: studentClass,
    dob: dob,
    address: address,
    enrollment: enrollment,
  };
  console.log(JSON.stringify(jsonStrObj));
  return JSON.stringify(jsonStrObj);
}

function resetForm() {
  $("#rollNo").val("");
  $("#fullName").val("");
  $("#studentClass").val("");
  $("#dob").val("");
  $("#address").val("");
  $("#enrollment").val("");
  $("#rollNo").focus();
}

function disableAll() {
    resetForm();
    $("#rollNo").prop("disabled", false);
    $("#rollNo").focus();
    $("#fullName").prop("disabled", true);
    $("#studentClass").prop("disabled", true);
    $("#dob").prop("disabled", true);
    $("#address").prop("disabled", true);
    $("#enrollment").prop("disabled", true);
    $("#save").prop("disabled", true);
    $("#update").prop("disabled", true);
    $("#reset").prop("disabled", true);
}

function findRoll(elem) {
  let roll = elem.value;
  let obj = {
    rollNo: roll,
  };
  let jsnobj = JSON.stringify(obj);
  let request = createGET_BY_KEYRequest(
    token,
    studentDBName,
    studentRelationame,
    jsnobj
  );
  jQuery.ajaxSetup({ async: false });
  let res = executeCommand(request, "/api/irl");
  jQuery.ajaxSetup({ async: true });
  if (res.status == 400) {
    $("#fullName").prop("disabled", false);
    $("#fullName").focus();
    $("#studentClass").prop("disabled", false);
    $("#dob").prop("disabled", false);
    $("#address").prop("disabled", false);
    $("#enrollment").prop("disabled", false);
    $("#save").prop("disabled", false);
    $("#reset").prop("disabled", false);
  } else {
    $("#fullName").prop("disabled", false);
    $("#rollNo").prop("disabled", true);
    $("#studentClass").prop("disabled", false);
    $("#dob").prop("disabled", false);
    $("#address").prop("disabled", false);
    $("#enrollment").prop("disabled", false);
    $("#reset").prop("disabled", false);
    $("#save").prop("disabled", true);
    $("#update").prop("disabled", false);
    // console.log(res);
    let data = JSON.parse(res.data).record;
    console.log(data);
    $("#fullName").val(data.fullName);
    $("#studentClass").val(data.studentClass);
    $("#dob").val(data.dob);
    $("#address").val(data.address);
    $("#enrollment").val(data.enrollment);
  }
}

function saveStudent() {
  let jsonStr = validateAndGetData();
  if (jsonStr === "") {
    return;
  }

  let putReqStr = createPUTRequest(
    token,
    jsonStr,
    studentDBName,
    studentRelationame
  );
  console.log(putReqStr);

  jQuery.ajaxSetup({ async: false });
  let resultObj = executeCommandAtGivenBaseUrl(
    putReqStr,
    "http://api.login2explore.com:5577",
    "/api/iml"
  );
  alert(JSON.stringify(resultObj));
  jQuery.ajaxSetup({ async: true });
  resetForm();
  $("#rollNo").focus();
}

function updateData(){
    let roll = $("#rollNo").val();
    let name = $("#fullName").val()
    let cls = $("#studentClass").val();
    let dob = $("#dob").val();
    let addr = $("#address").val();
    let enrollment = $("#enrollment").val();
    if(name==''){
        $("#fullName").focus();
        return;
    }if(cls == ''){
        $("#studentClass").focus();
        return;
    }if(dob==''){
        $("#dob").focus();
        return;
    }if(addr==''){
        $("#address").focus();
        return;
    }if(enrollment==''){
        $("#enrollment").focus();
        return;
    }
    let obj = {
        rollNo: roll,
        fullName: name,
        studentClass: cls,
        dob: dob,
        address: addr,
        enrollment: enrollment
    };
    let jsonobj = JSON.stringify(obj);
    let req=createSETRequest(token,jsonobj, studentDBName, studentRelationame,'UPDATE','rollNo');
    jQuery.ajaxSetup({ async: false });
    let res = executeCommand(req, "/api/iml/set");
    jQuery.ajaxSetup({ async: true });
    console.log(res);
    disableAll();
}

$("#rollNo").focus();
disableAll();