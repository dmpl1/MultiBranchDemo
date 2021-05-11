pipeline {
    agent any
    parameters {
        string(name: 'TARGET_ENV', defaultValue: 'DEV', description: 'Environment')
    }
    options { // Providing permission to releaseJob Project to copy artifacts
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
                   build job: 'ReleaseJob', // Adding parameter to releaseJob
                   parameters: [
                       [ $class: 'StringParameterValue', name: 'FROM_BUILD', value: "${BUILD_NUMBER}" ]
                   ],
                   propagate: false // pass pipeline if fail for ReleaseJob too
               }
            }
        }
    }

    post {
        always { // Adding file in artifacts so that can be passed to other projects
            archiveArtifacts artifacts: 'sampleFile.zip', onlyIfSuccessful: true
        }
    }

}