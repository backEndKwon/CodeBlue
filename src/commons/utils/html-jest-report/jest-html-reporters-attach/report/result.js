window.jest_html_reporters_callback__({"numFailedTestSuites":1,"numFailedTests":1,"numPassedTestSuites":7,"numPassedTests":22,"numPendingTestSuites":0,"numPendingTests":0,"numRuntimeErrorTestSuites":0,"numTodoTests":0,"numTotalTestSuites":8,"numTotalTests":23,"startTime":1685964606156,"success":false,"testResults":[{"numFailingTests":0,"numPassingTests":6,"numPendingTests":0,"numTodoTests":0,"perfStats":{"end":1685964666310,"runtime":55104,"slow":true,"start":1685964611206},"testFilePath":"C:\\Users\\Summer\\Desktop\\sparta\\codeblue\\CodeBlue_clo\\src\\reports\\service\\reports.service.spec.ts","failureMessage":null,"testResults":[{"ancestorTitles":["ReportsService Unit Testing","createReport"],"duration":135,"failureMessages":[],"fullName":"ReportsService Unit Testing createReport should create a report with correct symptom level","status":"passed","title":"should create a report with correct symptom level"},{"ancestorTitles":["ReportsService Unit Testing","getReportDetails()"],"duration":23,"failureMessages":[],"fullName":"ReportsService Unit Testing getReportDetails() should return the report details","status":"passed","title":"should return the report details"},{"ancestorTitles":["ReportsService Unit Testing","getReportDetails()"],"duration":87,"failureMessages":[],"fullName":"ReportsService Unit Testing getReportDetails() should throw NotFoundException if the report does not exist","status":"passed","title":"should throw NotFoundException if the report does not exist"},{"ancestorTitles":["ReportsService Unit Testing","updateReport()"],"duration":18,"failureMessages":[],"fullName":"ReportsService Unit Testing updateReport() should update the patient info","status":"passed","title":"should update the patient info"},{"ancestorTitles":["ReportsService Unit Testing","updateReport()"],"duration":19,"failureMessages":[],"fullName":"ReportsService Unit Testing updateReport() should throw NotFoundException if the report does not exist","status":"passed","title":"should throw NotFoundException if the report does not exist"},{"ancestorTitles":["ReportsService Unit Testing","updateReport()"],"duration":18,"failureMessages":[],"fullName":"ReportsService Unit Testing updateReport() should throw NotFoundException if the report does not exist","status":"passed","title":"should throw NotFoundException if the report does not exist"}]},{"numFailingTests":1,"numPassingTests":3,"numPendingTests":0,"numTodoTests":0,"perfStats":{"end":1685964666411,"runtime":55404,"slow":true,"start":1685964611007},"testFilePath":"C:\\Users\\Summer\\Desktop\\sparta\\codeblue\\CodeBlue_clo\\src\\requests\\service\\requests.service.spec.ts","failureMessage":"\u001b[1m\u001b[31m  \u001b[1m● \u001b[22m\u001b[1mRequestsService Unit Testing › createRequest() › should create a request successfully\u001b[39m\u001b[22m\n\n    NotFoundException: 병원이 존재하지 않습니다.\n\u001b[2m\u001b[22m\n\u001b[2m    \u001b[0m \u001b[90m 117 |\u001b[39m           )\u001b[33m;\u001b[39m\u001b[0m\u001b[22m\n\u001b[2m    \u001b[0m \u001b[90m 118 |\u001b[39m           \u001b[36mif\u001b[39m (\u001b[33m!\u001b[39mhospital[\u001b[35m0\u001b[39m]) {\u001b[0m\u001b[22m\n\u001b[2m    \u001b[0m\u001b[31m\u001b[1m>\u001b[22m\u001b[2m\u001b[39m\u001b[90m 119 |\u001b[39m             \u001b[36mthrow\u001b[39m \u001b[36mnew\u001b[39m \u001b[33mNotFoundException\u001b[39m(\u001b[32m'병원이 존재하지 않습니다.'\u001b[39m)\u001b[33m;\u001b[39m\u001b[0m\u001b[22m\n\u001b[2m    \u001b[0m \u001b[90m     |\u001b[39m                   \u001b[31m\u001b[1m^\u001b[22m\u001b[2m\u001b[39m\u001b[0m\u001b[22m\n\u001b[2m    \u001b[0m \u001b[90m 120 |\u001b[39m           }\u001b[0m\u001b[22m\n\u001b[2m    \u001b[0m \u001b[90m 121 |\u001b[39m\u001b[0m\u001b[22m\n\u001b[2m    \u001b[0m \u001b[90m 122 |\u001b[39m           \u001b[36mconst\u001b[39m report \u001b[33m=\u001b[39m \u001b[36mawait\u001b[39m \u001b[36mthis\u001b[39m\u001b[33m.\u001b[39mreportsRepository\u001b[33m.\u001b[39mfindReport(report_id)\u001b[33m;\u001b[39m\u001b[0m\u001b[22m\n\u001b[2m\u001b[22m\n\u001b[2m      \u001b[2mat \u001b[22m\u001b[2mrequests/service/requests.service.ts\u001b[2m:119:19\u001b[22m\u001b[2m\u001b[22m\n\u001b[2m      \u001b[2mat RequestsService.createRequest (\u001b[22m\u001b[2mrequests/service/requests.service.ts\u001b[2m:111:27)\u001b[22m\u001b[2m\u001b[22m\n\u001b[2m      \u001b[2mat Object.<anonymous> (\u001b[22m\u001b[2m\u001b[0m\u001b[36mrequests/service/requests.service.spec.ts\u001b[39m\u001b[0m\u001b[2m:137:22)\u001b[22m\u001b[2m\u001b[22m\n","testResults":[{"ancestorTitles":["RequestsService Unit Testing","getAllRequests()"],"duration":71,"failureMessages":[],"fullName":"RequestsService Unit Testing getAllRequests() getAllRequests request must be performed successfully","status":"passed","title":"getAllRequests request must be performed successfully"},{"ancestorTitles":["RequestsService Unit Testing","getSearchRequests()"],"duration":24,"failureMessages":[],"fullName":"RequestsService Unit Testing getSearchRequests() getSearchRequests request must be performed successfully","status":"passed","title":"getSearchRequests request must be performed successfully"},{"ancestorTitles":["RequestsService Unit Testing","createRequest()"],"duration":15,"failureMessages":["NotFoundException: 병원이 존재하지 않습니다.\n    at C:\\Users\\Summer\\Desktop\\sparta\\codeblue\\CodeBlue_clo\\src\\requests\\service\\requests.service.ts:119:19\n    at processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at RequestsService.createRequest (C:\\Users\\Summer\\Desktop\\sparta\\codeblue\\CodeBlue_clo\\src\\requests\\service\\requests.service.ts:111:27)\n    at Object.<anonymous> (C:\\Users\\Summer\\Desktop\\sparta\\codeblue\\CodeBlue_clo\\src\\requests\\service\\requests.service.spec.ts:137:22)"],"fullName":"RequestsService Unit Testing createRequest() should create a request successfully","status":"failed","title":"should create a request successfully"},{"ancestorTitles":["RequestsService Unit Testing","withdrawRequest()"],"duration":23,"failureMessages":[],"fullName":"RequestsService Unit Testing withdrawRequest() should withdraw a request successfully","status":"passed","title":"should withdraw a request successfully"}]},{"numFailingTests":0,"numPassingTests":4,"numPendingTests":0,"numTodoTests":0,"perfStats":{"end":1685964675082,"runtime":64347,"slow":true,"start":1685964610735},"testFilePath":"C:\\Users\\Summer\\Desktop\\sparta\\codeblue\\CodeBlue_clo\\src\\hospitals\\service\\hospitals.service.spec.ts","failureMessage":null,"testResults":[{"ancestorTitles":["ReportsService Unit Testing","getHospitals()"],"duration":92,"failureMessages":[],"fullName":"ReportsService Unit Testing getHospitals() getHospitals request must be performed successfully","status":"passed","title":"getHospitals request must be performed successfully"},{"ancestorTitles":["ReportsService Unit Testing","getHospitals()"],"duration":15,"failureMessages":[],"fullName":"ReportsService Unit Testing getHospitals() getLocalHospitals request must be performed successfully","status":"passed","title":"getLocalHospitals request must be performed successfully"},{"ancestorTitles":["ReportsService Unit Testing","getHospitals()"],"duration":14,"failureMessages":[],"fullName":"ReportsService Unit Testing getHospitals() getNationHospitals request must be performed successfully","status":"passed","title":"getNationHospitals request must be performed successfully"},{"ancestorTitles":["ReportsService Unit Testing","getHospitals()"],"duration":33,"failureMessages":[],"fullName":"ReportsService Unit Testing getHospitals() getRecommendedHospitals request must be performed successfully","status":"passed","title":"getRecommendedHospitals request must be performed successfully"}]},{"numFailingTests":0,"numPassingTests":1,"numPendingTests":0,"numTodoTests":0,"perfStats":{"end":1685964681560,"runtime":14812,"slow":true,"start":1685964666748},"testFilePath":"C:\\Users\\Summer\\Desktop\\sparta\\codeblue\\CodeBlue_clo\\src\\reports\\controller\\reports.controller.spec.ts","failureMessage":null,"testResults":[{"ancestorTitles":["ReportsController Unit Testing","updateReport()"],"duration":150,"failureMessages":[],"fullName":"ReportsController Unit Testing updateReport() should return object","status":"passed","title":"should return object"}]},{"numFailingTests":0,"numPassingTests":2,"numPendingTests":0,"numTodoTests":0,"perfStats":{"end":1685964692054,"runtime":25358,"slow":true,"start":1685964666696},"testFilePath":"C:\\Users\\Summer\\Desktop\\sparta\\codeblue\\CodeBlue_clo\\src\\hospitals\\controller\\hospitals.controller.spec.ts","failureMessage":null,"testResults":[{"ancestorTitles":["HospitalsController Unit Testing","getLocalHospitals()"],"duration":87,"failureMessages":[],"fullName":"HospitalsController Unit Testing getLocalHospitals() should get local Hospitals","status":"passed","title":"should get local Hospitals"},{"ancestorTitles":["HospitalsController Unit Testing","getRecommendedHospitals()"],"duration":32,"failureMessages":[],"fullName":"HospitalsController Unit Testing getRecommendedHospitals() should get recommended Hospitals","status":"passed","title":"should get recommended Hospitals"}]},{"numFailingTests":0,"numPassingTests":1,"numPendingTests":0,"numTodoTests":0,"perfStats":{"end":1685964695796,"runtime":20579,"slow":true,"start":1685964675217},"testFilePath":"C:\\Users\\Summer\\Desktop\\sparta\\codeblue\\CodeBlue_clo\\src\\patients\\controller\\patients.controller.spec.ts","failureMessage":null,"testResults":[{"ancestorTitles":["PatientsController Unit Testing","createPatientInfo()"],"duration":262,"failureMessages":[],"fullName":"PatientsController Unit Testing createPatientInfo() should return object","status":"passed","title":"should return object"}]},{"numFailingTests":0,"numPassingTests":4,"numPendingTests":0,"numTodoTests":0,"perfStats":{"end":1685964700427,"runtime":18649,"slow":true,"start":1685964681778},"testFilePath":"C:\\Users\\Summer\\Desktop\\sparta\\codeblue\\CodeBlue_clo\\src\\requests\\controller\\requests.controller.spec.ts","failureMessage":null,"testResults":[{"ancestorTitles":["RequestsController Unit Testing","getAllRequests()"],"duration":209,"failureMessages":[],"fullName":"RequestsController Unit Testing getAllRequests() should get all obejct","status":"passed","title":"should get all obejct"},{"ancestorTitles":["RequestsController Unit Testing","getSearchRequests()"],"duration":178,"failureMessages":[],"fullName":"RequestsController Unit Testing getSearchRequests() should get searched object","status":"passed","title":"should get searched object"},{"ancestorTitles":["RequestsController Unit Testing","createRequest()"],"duration":34,"failureMessages":[],"fullName":"RequestsController Unit Testing createRequest() should return object","status":"passed","title":"should return object"},{"ancestorTitles":["RequestsController Unit Testing","withdrawRequest()"],"duration":17,"failureMessages":[],"fullName":"RequestsController Unit Testing withdrawRequest() should return object","status":"passed","title":"should return object"}]},{"numFailingTests":0,"numPassingTests":1,"numPendingTests":0,"numTodoTests":0,"perfStats":{"end":1685964704814,"runtime":12645,"slow":true,"start":1685964692169},"testFilePath":"C:\\Users\\Summer\\Desktop\\sparta\\codeblue\\CodeBlue_clo\\src\\patients\\service\\patients.service.spec.ts","failureMessage":null,"testResults":[{"ancestorTitles":["PatientsService Unit Testing","createPatientInfo()"],"duration":148,"failureMessages":[],"fullName":"PatientsService Unit Testing createPatientInfo() should create patient info","status":"passed","title":"should create patient info"}]}],"config":{"bail":0,"changedFilesWithAncestor":false,"ci":false,"collectCoverage":false,"collectCoverageFrom":["**/*.(t|j)s"],"coverageDirectory":"C:\\Users\\Summer\\Desktop\\sparta\\codeblue\\CodeBlue_clo\\coverage","coverageProvider":"babel","coverageReporters":["json","text","lcov","clover"],"detectLeaks":false,"detectOpenHandles":false,"errorOnDeprecated":false,"expand":false,"findRelatedTests":false,"forceExit":false,"json":false,"lastCommit":false,"listTests":false,"logHeapUsage":false,"maxConcurrency":5,"maxWorkers":3,"noStackTrace":false,"nonFlagArgs":[],"notify":false,"notifyMode":"failure-change","onlyChanged":false,"onlyFailures":false,"openHandlesTimeout":1000,"passWithNoTests":false,"projects":[],"reporters":[["default",{}],["C:\\Users\\Summer\\Desktop\\sparta\\codeblue\\CodeBlue_clo\\node_modules\\jest-html-reporters\\index.js",{"publicPath":"./src/commons/utils/html-jest-report","filename":"report.html","includeFailureMsg":true}]],"rootDir":"C:\\Users\\Summer\\Desktop\\sparta\\codeblue\\CodeBlue_clo\\src","runTestsByPath":false,"seed":1199983706,"skipFilter":false,"snapshotFormat":{"escapeString":false,"printBasicPrototype":false},"testFailureExitCode":1,"testPathPattern":"","testSequencer":"C:\\Users\\Summer\\Desktop\\sparta\\codeblue\\CodeBlue_clo\\node_modules\\@jest\\test-sequencer\\build\\index.js","updateSnapshot":"new","useStderr":false,"watch":false,"watchAll":false,"watchman":true,"workerThreads":false},"endTime":1685964705437,"_reporterOptions":{"publicPath":"./src/commons/utils/html-jest-report","filename":"report.html","expand":false,"pageTitle":"","hideIcon":false,"testCommand":"","openReport":false,"failureMessageOnly":0,"enableMergeData":false,"dataMergeLevel":1,"inlineSource":false,"urlForTestFiles":"","darkTheme":false,"includeConsoleLog":false,"includeFailureMsg":true},"logInfoMapping":{},"attachInfos":{}})