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
                    bat 'docker-compose build'
                }
            }
        }

        stage('Run Tests') {
            steps {
                echo 'Running unit tests (add test commands here if needed)...'
                // Placeholder — no test execution here
            }
        }

        stage('Deploy Services') {
            steps {
                script {
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
