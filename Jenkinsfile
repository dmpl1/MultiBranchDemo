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

/* Pipeline script for ReleaseJob Project Added Below for Reference */
// NOTE: Uncheck Groovy sandbox in Releasejob Project configuration, so that pipeline can be run using administrative rights and file transfer can happen, 
// Add plugin CopyArtifact for artifact copy 
// If u face errors on administrative priviledges, then go to manage-Jenkins > In-process-script-approval, add below lines and approve it 
/* new hudson.model.FileParameterValue$FileItemImpl java.io.File
new java.io.File java.lang.String
*/

/*

pipeline {
    agent any
    
    options {
        copyArtifactPermission('*');
    }
    parameters {
        string(name: 'FROM_BUILD', defaultValue: '', description: 'Build Source')
    }
    
    stages {    
    	stage('Deploy') {
    		steps {
    		   echo "deploying from source ${params.FROM_BUILD}" 
    		}
    	}
    	
    	stage('Copy Archive') {
            steps {
                script {
                    step ([$class: 'CopyArtifact',
                        projectName: 'ConnectDemo/master',
                        filter: "*.zip",
                        target: 'SampleFolder']);
                }
            }
        }
    	
    	
    }
    
} 

*/