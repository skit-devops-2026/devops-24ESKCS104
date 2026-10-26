pipeline {
    agent any
    options {
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
                sh 'make install'
            }
        }
        stage('Test') {
            steps {
                sh 'make test'
            }
        }
        stage('Build') {
            steps {
                sh 'make build'
            }
        }
        stage('Docker Build') {
            steps {
                sh 'make docker-build'
            }
        }
    }
}
