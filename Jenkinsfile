pipeline {
    agent any
    parameters {
        string(name: 'TARGET_ENV', defaultValue: 'DEV', description: 'Environment')
    }
    options {
        copyArtifactPermission('ReleaseJob');
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
                   def propertiesFilePath = "${env.WORKSPACE}/coverage/lcov.info"
                   build job: 'ReleaseJob',
                   parameters: [
                       [ $class: 'StringParameterValue', name: 'FROM_BUILD', value: "${BUILD_NUMBER}" ],
                       [ $class: "FileParameterValue", name: "coverage", file: new FileParameterValue.FileItemImpl(new File(propertiesFilePath)) ]
                   ],
                   propagate: false
               }
            }
        }
    }

    post {
        always {
            archiveArtifacts: 'sampleFile.zip'
        }
    }
}