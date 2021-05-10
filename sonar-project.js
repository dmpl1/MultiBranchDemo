const sonarqubeScanner = require("sonarqube-scanner");
sonarqubeScanner(
  {
    serverUrl: "http://localhost:9000",
    token: "${env.sonarDeploymentDemoToken}",
    options: {
      "sonar.sources": "./src",
      "sonar.tests": "./src/App.test.js",
      "sonar.test.inclusions": "./src/*.test.js",
      "sonar.typescript.lcov.reportPaths": "coverage/lcov.info",
      "sonar.testExecutionReportPaths": "reports/test-report.xml",
    },
  },
  () => {},
);