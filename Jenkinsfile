pipeline {
    agent any
    options {
        // FIXED: skipDefaultCheckout does not accept arguments
        skipDefaultCheckout()
    }
    triggers {
        githubPush()
    }
    stages {
        stage('Checkout') {
            steps {
                checkout([
                    $class: 'GitSCM', 
                    branches: [[name: '*/main']], 
                    userRemoteConfigs: [[url: 'https://github.com/skit-devops-2026/devops-24ESKCS104']]
                ])
            }
        }
        stage('Install') {
            steps {
                // FIXED: 'make' is a Linux command. Use 'sh' unless your Jenkins 
                // agent is running directly on Windows and has a 'make' tool installed.
                sh 'make install' 
            }
        }
    }
}
