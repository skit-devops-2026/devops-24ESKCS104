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
                // Note: Since Jenkins is running on Windows, 'sh' might fail if a bash environment isn't set up.
                // If it fails, change 'sh' to 'bat' like this: bat 'make install'
                sh 'make install' 
            }
        }
    }
}
