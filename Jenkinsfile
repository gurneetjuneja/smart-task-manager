pipeline {
    agent any

    environment {
        COMPOSE_PROJECT_NAME = "smart-task-manager"
    }

    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/gurneetjuneja/smart-task-manager.git'
            }
        }

        stage('Build Services') {
            steps {
                sh 'docker-compose build'
            }
        }

        stage('Run Tests') {
            steps {
                echo 'Running unit tests (add test commands here if needed)...'
            }
        }

        stage('Deploy Services') {
            steps {
                sh 'docker-compose up -d'
            }
        }
    }

    post {
        always {
            echo 'Pipeline completed.'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
