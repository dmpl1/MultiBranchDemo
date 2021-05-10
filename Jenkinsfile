pipeline {
    agent any

    tools {nodejs "node"}
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }

        stage('test') {
            steps {
                bat 'npm run test'
            }
        }
        
        stage('sonar') {
            steps {
                bat 'npm run sonar'
            }
        }
    }
}