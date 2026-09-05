pipeline {
    agent any
    options {
        skipDefaultCheckout(false)
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
        // Changed from 'sh' to 'bat' for Windows compatibility
        bat 'make install' 
    }
}
    }
}
