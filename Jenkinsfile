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
                   build job: 'ReleaseJob', // Adding parameter to releaseJob
                   parameters: [
                       [ $class: 'StringParameterValue', name: 'FROM_BUILD', value: "${BUILD_NUMBER}" ]
                   ],
                   propagate: false
               }
            }
        }
    }
    

}