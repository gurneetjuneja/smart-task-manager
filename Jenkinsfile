pipeline {
    agent any

    environment {
        COMPOSE_PROJECT_NAME = "smart-task-manager"
    }

    stages {
        stage('Clone Repository') {
            steps {
                // Explicitly checkout the 'main' branch
                git branch: 'main', url: 'https://github.com/gurneetjuneja/smart-task-manager.git'
            }
        }

        stage('Build Services') {
            steps {
                script {
                    // Make sure Docker Compose is installed and Docker daemon is running
                    bat 'docker-compose build'
                }
            }
        }

        stage('Run Tests') {
            steps {
                echo 'Running unit tests (add test commands here if needed)...'
                // If you have tests, add the appropriate commands to run tests here
            }
        }

        stage('Deploy Services') {
            steps {
                script {
                    // Ensure Docker Compose is working and run services in detached mode
                    bat 'docker-compose up -d'
                }
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
