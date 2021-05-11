pipeline {
    agent any
    parameters {
        string(name: 'TARGET_ENV', defaultValue: 'DEV', description: 'Environment')
    }
    tools {nodejs "node"}
    stages {
        stage('Build') {
            steps {
                bat 'npm install'
            }
        }

        stage('Test') {
            steps {
                bat 'npm run test'
            }
        }
        
        stage('Deploy') {
            steps {
               script {
                   def propertiesFilePath = "${env.WORKSPACE}/reports/test-report.xml"
                   build job: 'ReleaseJob',
                   parameters: [
                       [ $class: 'StringParameterValue', name: 'FROM_BUILD', value: "${BUILD_NUMBER}" ],
                       [ $class: "FileParameterValue", name: "test-report.xml", file: new FileParameterValue.FileItemImpl(new File(propertiesFilePath)) ]
                   ]
               }
            }
        }

        stage('Copy Archive') {
            steps {
                script {
                    step ([$class: 'CopyArtifact',
                        projectName: 'ReleaseJob',
                        filter: "reports/test-report.xml",
                        target: 'DownloadedFile']);
                }
            }
        }
    }
}