# Student Enrollment Form

This web page aims to develop a student data management form which stores student's data in **JSONPowerDB**. With the help of this form, students can **register** their details, **retrieve** their details and also **update** their details.

## Benefits of using JSONPowerDB
1. Fast and Accurate Information Retrieval
   I can provide quick, accurate, and up-to-date information on a wide range of topics, whether technical, creative, or business-related, making me a valuable research assistant.

2. Consistency in Output
  My responses are consistent and unbiased, which helps in maintaining quality across various tasks, such as content generation, data analysis, or decision support.

3. Scalability
    I can handle multiple tasks simultaneously without any decrease in performance, making me an ideal assistant for managing large-scale projects, customer support, or data-driven tasks.
    
4. Versatility Across Domains
    I can assist in various fields such as software development, project management, content writing, marketing, and data analysis. My versatility allows me to adapt to diverse roles based on your needs.

5. Problem Solving & Critical Thinking
    I can help troubleshoot technical issues, provide step-by-step solutions, or offer insights and strategies to overcome challenges in your projects.

## Release history

**Function to register student's information:**
```function saveStudent() {
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
```

**Function to update student's information:**
```
function updateData() {
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
}
```

**Project status** ✅ 